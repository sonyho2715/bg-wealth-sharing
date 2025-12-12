'use server';

import { db } from '@/lib/db';
import { headers } from 'next/headers';

export async function getReferrerByCode(code: string) {
  try {
    const user = await db.user.findFirst({
      where: {
        referralCode: code,
        isActive: true,
      },
      select: {
        firstName: true,
        lastName: true,
        referralCode: true,
      },
    });

    if (!user) {
      return { success: false, error: 'Referral code not found' };
    }

    return { success: true, data: user };
  } catch (error) {
    console.error('Error fetching referrer:', error);
    return { success: false, error: 'Failed to fetch referrer' };
  }
}

export async function trackReferralVisit(referralCode: string, source?: string) {
  try {
    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || undefined;
    const forwardedFor = headersList.get('x-forwarded-for');
    const visitorIp = forwardedFor?.split(',')[0] || undefined;

    await db.referralVisit.create({
      data: {
        referralCode,
        visitorIp,
        userAgent,
        source,
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error tracking referral visit:', error);
    return { success: false };
  }
}

export async function getReferralStats(referralCode: string) {
  try {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [totalVisits, weekVisits, monthVisits, conversions] = await Promise.all([
      db.referralVisit.count({
        where: { referralCode },
      }),
      db.referralVisit.count({
        where: {
          referralCode,
          visitedAt: { gte: weekAgo },
        },
      }),
      db.referralVisit.count({
        where: {
          referralCode,
          visitedAt: { gte: monthAgo },
        },
      }),
      db.referralVisit.count({
        where: {
          referralCode,
          converted: true,
        },
      }),
    ]);

    return {
      success: true,
      data: {
        totalVisits,
        weekVisits,
        monthVisits,
        conversions,
      },
    };
  } catch (error) {
    console.error('Error fetching referral stats:', error);
    return { success: false, error: 'Failed to fetch stats' };
  }
}
