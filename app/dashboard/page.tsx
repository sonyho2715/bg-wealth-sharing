import Link from 'next/link';
import {
  ClipboardList,
  TrendingUp,
  Clock,
  CheckCircle2,
  ArrowRight,
  Radio,
  BookOpen,
} from 'lucide-react';
import { ONBOARDING_STEPS } from '@/data/onboarding-steps';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import DashboardHomeClient from '@/components/dashboard/DashboardHomeClient';

export const dynamic = 'force-dynamic';

async function getProgressData() {
  const session = await getSession();
  if (!session.isLoggedIn || !session.userId) {
    redirect('/login');
  }

  const [user, progress] = await Promise.all([
    db.user.findUnique({
      where: { id: session.userId },
      select: { email: true, firstName: true },
    }),
    db.onboardingProgress.findUnique({
      where: { userId: session.userId },
    }),
  ]);

  // Convert progress to array of completed step numbers
  const completedSteps: number[] = [];
  if (progress) {
    if (progress.step1) completedSteps.push(1);
    if (progress.step2) completedSteps.push(2);
    if (progress.step3) completedSteps.push(3);
    if (progress.step4) completedSteps.push(4);
    if (progress.step5) completedSteps.push(5);
    if (progress.step6) completedSteps.push(6);
    if (progress.step7) completedSteps.push(7);
  }

  return {
    userEmail: user?.email || '',
    userName: user?.firstName || '',
    completedSteps,
  };
}

export default async function DashboardHome() {
  const { userEmail, userName, completedSteps } = await getProgressData();

  const progress = Math.round((completedSteps.length / ONBOARDING_STEPS.length) * 100);

  return (
    <DashboardHomeClient
      userEmail={userEmail}
      userName={userName}
      completedSteps={completedSteps}
      progress={progress}
      totalSteps={ONBOARDING_STEPS.length}
      onboardingSteps={ONBOARDING_STEPS.slice(0, 3)}
    />
  );
}
