import { db } from './db';
import { headers } from 'next/headers';

// Activity action types
export const ActivityAction = {
  // Auth actions
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  LOGIN_FAILED: 'LOGIN_FAILED',
  USER_CREATED: 'USER_CREATED',
  USER_REGISTERED: 'USER_REGISTERED',
  PASSWORD_CHANGED: 'PASSWORD_CHANGED',
  PASSWORD_RESET_REQUESTED: 'PASSWORD_RESET_REQUESTED',
  PASSWORD_RESET_COMPLETED: 'PASSWORD_RESET_COMPLETED',

  // Member actions
  MEMBER_CREATED: 'MEMBER_CREATED',
  MEMBER_UPDATED: 'MEMBER_UPDATED',
  MEMBER_DELETED: 'MEMBER_DELETED',
  MEMBER_ACTIVATED: 'MEMBER_ACTIVATED',
  MEMBER_DEACTIVATED: 'MEMBER_DEACTIVATED',

  // Profile actions
  PROFILE_UPDATED: 'PROFILE_UPDATED',

  // Announcement actions
  ANNOUNCEMENT_CREATED: 'ANNOUNCEMENT_CREATED',
  ANNOUNCEMENT_UPDATED: 'ANNOUNCEMENT_UPDATED',
  ANNOUNCEMENT_DELETED: 'ANNOUNCEMENT_DELETED',
  ANNOUNCEMENT_ACTIVATED: 'ANNOUNCEMENT_ACTIVATED',
  ANNOUNCEMENT_DEACTIVATED: 'ANNOUNCEMENT_DEACTIVATED',

  // Onboarding actions
  ONBOARDING_STEP_COMPLETED: 'ONBOARDING_STEP_COMPLETED',
  ONBOARDING_COMPLETED: 'ONBOARDING_COMPLETED',
} as const;

export type ActivityActionType = typeof ActivityAction[keyof typeof ActivityAction];

interface LogActivityParams {
  userId?: string | null;
  action: ActivityActionType;
  details?: string | Record<string, unknown>;
}

export async function logActivity({ userId, action, details }: LogActivityParams) {
  try {
    const headersList = await headers();
    const ipAddress = headersList.get('x-forwarded-for')?.split(',')[0] ||
                      headersList.get('x-real-ip') ||
                      'unknown';
    const userAgent = headersList.get('user-agent') || 'unknown';

    await db.activityLog.create({
      data: {
        userId: userId || null,
        action,
        details: typeof details === 'object' ? JSON.stringify(details) : details,
        ipAddress,
        userAgent,
      },
    });
  } catch (error) {
    // Don't throw - logging should never break the app
    console.error('Failed to log activity:', error);
  }
}

// Helper to get recent activities
export async function getRecentActivities(limit = 50) {
  return db.activityLog.findMany({
    take: limit,
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
  });
}

// Helper to get user activities
export async function getUserActivities(userId: string, limit = 20) {
  return db.activityLog.findMany({
    where: { userId },
    take: limit,
    orderBy: { createdAt: 'desc' },
  });
}

// Helper to get activity stats
export async function getActivityStats(days = 7) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const activities = await db.activityLog.groupBy({
    by: ['action'],
    where: {
      createdAt: { gte: startDate },
    },
    _count: {
      action: true,
    },
  });

  return activities.reduce((acc, curr) => {
    acc[curr.action] = curr._count.action;
    return acc;
  }, {} as Record<string, number>);
}
