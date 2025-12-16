'use server';

import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

// Verify admin access
async function requireAdmin() {
  const session = await getSession();
  if (!session.isLoggedIn || session.role !== 'ADMIN') {
    redirect('/login');
  }
  return session;
}

export interface FunnelData {
  totalVisits: number;
  uniqueVisits: number;
  registrations: number;
  onboardingStarted: number;
  onboardingComplete: number;
  activeMembers: number;
  // Conversion rates
  visitToRegister: number;
  registerToOnboard: number;
  onboardToComplete: number;
  completeToActive: number;
  overallConversion: number;
}

export async function getConversionFunnel(): Promise<FunnelData> {
  await requireAdmin();

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [
    totalVisits,
    uniqueVisits,
    totalMembers,
    onboardingRecords,
    activeMembers,
  ] = await Promise.all([
    // Total referral visits
    db.referralVisit.count(),
    // Unique visitors (by IP)
    db.referralVisit.groupBy({
      by: ['visitorIp'],
      _count: true,
    }),
    // Total registered members
    db.user.count({ where: { role: 'MEMBER' } }),
    // All onboarding progress records
    db.onboardingProgress.findMany(),
    // Active members (logged in within 7 days)
    db.user.count({
      where: {
        role: 'MEMBER',
        isActive: true,
        lastLoginAt: { gte: sevenDaysAgo },
      },
    }),
  ]);

  // Calculate onboarding stages
  let onboardingStarted = 0;
  let onboardingComplete = 0;

  for (const progress of onboardingRecords) {
    const hasAnyStep = progress.step1 || progress.step2 || progress.step3 ||
                       progress.step4 || progress.step5 || progress.step6 || progress.step7;
    const hasAllSteps = progress.step1 && progress.step2 && progress.step3 &&
                        progress.step4 && progress.step5 && progress.step6 && progress.step7;

    if (hasAnyStep) onboardingStarted++;
    if (hasAllSteps) onboardingComplete++;
  }

  const uniqueVisitCount = uniqueVisits.length;

  // Calculate conversion rates (as percentages)
  const visitToRegister = uniqueVisitCount > 0
    ? Math.round((totalMembers / uniqueVisitCount) * 100)
    : 0;

  const registerToOnboard = totalMembers > 0
    ? Math.round((onboardingStarted / totalMembers) * 100)
    : 0;

  const onboardToComplete = onboardingStarted > 0
    ? Math.round((onboardingComplete / onboardingStarted) * 100)
    : 0;

  const completeToActive = onboardingComplete > 0
    ? Math.round((activeMembers / onboardingComplete) * 100)
    : 0;

  const overallConversion = uniqueVisitCount > 0
    ? Math.round((activeMembers / uniqueVisitCount) * 100)
    : 0;

  return {
    totalVisits,
    uniqueVisits: uniqueVisitCount,
    registrations: totalMembers,
    onboardingStarted,
    onboardingComplete,
    activeMembers,
    visitToRegister,
    registerToOnboard,
    onboardToComplete,
    completeToActive,
    overallConversion,
  };
}

export interface OnboardingFunnelStep {
  step: number;
  name: string;
  completed: number;
  percentage: number;
}

export async function getOnboardingFunnel(): Promise<OnboardingFunnelStep[]> {
  await requireAdmin();

  const [totalMembers, progressRecords] = await Promise.all([
    db.user.count({ where: { role: 'MEMBER' } }),
    db.onboardingProgress.findMany(),
  ]);

  const stepNames = [
    'Create Your Account',
    'Login to DSJEX',
    'Set Up Wallet',
    'Join Bonchat',
    'Review Materials',
    'First Trade',
    'Complete Profile',
  ];

  const stepCounts = [0, 0, 0, 0, 0, 0, 0];

  for (const progress of progressRecords) {
    if (progress.step1) stepCounts[0]++;
    if (progress.step2) stepCounts[1]++;
    if (progress.step3) stepCounts[2]++;
    if (progress.step4) stepCounts[3]++;
    if (progress.step5) stepCounts[4]++;
    if (progress.step6) stepCounts[5]++;
    if (progress.step7) stepCounts[6]++;
  }

  return stepNames.map((name, index) => ({
    step: index + 1,
    name,
    completed: stepCounts[index],
    percentage: totalMembers > 0
      ? Math.round((stepCounts[index] / totalMembers) * 100)
      : 0,
  }));
}

export interface MemberSegmentStats {
  // Onboarding segments
  onboardingNotStarted: number;
  onboardingInProgress: number;
  onboardingComplete: number;
  // Activity segments
  activeRecent: number;    // Logged in within 7 days
  activeDormant: number;   // Logged in 8-30 days ago
  activeAtRisk: number;    // No login in 30+ days or never
  // Join date segments
  joinedThisWeek: number;
  joinedThisMonth: number;
  joinedEarlier: number;
}

export async function getMemberSegmentStats(): Promise<MemberSegmentStats> {
  await requireAdmin();

  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  // Get all members with their onboarding progress
  const members = await db.user.findMany({
    where: { role: 'MEMBER' },
    select: {
      id: true,
      createdAt: true,
      lastLoginAt: true,
      onboardingProgress: true,
    },
  });

  let onboardingNotStarted = 0;
  let onboardingInProgress = 0;
  let onboardingComplete = 0;
  let activeRecent = 0;
  let activeDormant = 0;
  let activeAtRisk = 0;
  let joinedThisWeek = 0;
  let joinedThisMonth = 0;
  let joinedEarlier = 0;

  for (const member of members) {
    // Onboarding status
    const progress = member.onboardingProgress;
    if (!progress) {
      onboardingNotStarted++;
    } else {
      const hasAnyStep = progress.step1 || progress.step2 || progress.step3 ||
                         progress.step4 || progress.step5 || progress.step6 || progress.step7;
      const hasAllSteps = progress.step1 && progress.step2 && progress.step3 &&
                          progress.step4 && progress.step5 && progress.step6 && progress.step7;

      if (hasAllSteps) {
        onboardingComplete++;
      } else if (hasAnyStep) {
        onboardingInProgress++;
      } else {
        onboardingNotStarted++;
      }
    }

    // Activity status
    if (member.lastLoginAt) {
      if (member.lastLoginAt >= sevenDaysAgo) {
        activeRecent++;
      } else if (member.lastLoginAt >= thirtyDaysAgo) {
        activeDormant++;
      } else {
        activeAtRisk++;
      }
    } else {
      activeAtRisk++; // Never logged in
    }

    // Join date
    if (member.createdAt >= sevenDaysAgo) {
      joinedThisWeek++;
    } else if (member.createdAt >= thirtyDaysAgo) {
      joinedThisMonth++;
    } else {
      joinedEarlier++;
    }
  }

  return {
    onboardingNotStarted,
    onboardingInProgress,
    onboardingComplete,
    activeRecent,
    activeDormant,
    activeAtRisk,
    joinedThisWeek,
    joinedThisMonth,
    joinedEarlier,
  };
}
