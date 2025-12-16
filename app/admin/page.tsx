import { db } from '@/lib/db';
import { getRecentActivities, getActivityStats } from '@/lib/activity';
import { getConversionFunnel, getOnboardingFunnel, getMemberSegmentStats } from '@/app/actions/analytics';

export const dynamic = 'force-dynamic';
import {
  Users,
  UserPlus,
  UserCheck,
  Clock,
  TrendingUp,
  Activity,
  LogIn,
  Shield,
  Bell,
  Calendar,
  ClipboardList,
  AlertTriangle,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import ConversionFunnel from '@/components/admin/ConversionFunnel';
import OnboardingFunnel from '@/components/admin/OnboardingFunnel';

async function getStats() {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [
    totalMembers,
    activeMembers,
    newThisWeek,
    newThisMonth,
    recentSignups,
    recentLogins,
    activeAnnouncements,
  ] = await Promise.all([
    db.user.count({ where: { role: 'MEMBER' } }),
    db.user.count({ where: { role: 'MEMBER', isActive: true } }),
    db.user.count({
      where: {
        role: 'MEMBER',
        createdAt: { gte: weekAgo }
      }
    }),
    db.user.count({
      where: {
        role: 'MEMBER',
        createdAt: { gte: monthAgo }
      }
    }),
    db.user.findMany({
      where: { role: 'MEMBER' },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
        isActive: true,
        lastLoginAt: true,
      },
    }),
    db.user.count({
      where: {
        role: 'MEMBER',
        lastLoginAt: { gte: weekAgo },
      },
    }),
    db.announcement.count({
      where: { isActive: true },
    }),
  ]);

  // Get daily signups for the past 7 days
  const dailySignups = await Promise.all(
    Array.from({ length: 7 }, (_, i) => {
      const date = new Date(now);
      date.setDate(date.getDate() - (6 - i));
      date.setHours(0, 0, 0, 0);
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);

      return db.user.count({
        where: {
          role: 'MEMBER',
          createdAt: {
            gte: date,
            lt: nextDate,
          },
        },
      }).then(count => ({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        count,
      }));
    })
  );

  return {
    totalMembers,
    activeMembers,
    newThisWeek,
    newThisMonth,
    recentSignups,
    recentLogins,
    activeAnnouncements,
    dailySignups,
  };
}

function formatActionName(action: string): string {
  const actionMap: Record<string, string> = {
    'LOGIN': 'Logged in',
    'LOGOUT': 'Logged out',
    'LOGIN_FAILED': 'Login failed',
    'PASSWORD_CHANGED': 'Changed password',
    'PASSWORD_RESET_REQUESTED': 'Requested password reset',
    'PASSWORD_RESET_COMPLETED': 'Reset password',
    'MEMBER_CREATED': 'Added new member',
    'MEMBER_UPDATED': 'Updated member',
    'MEMBER_DELETED': 'Deleted member',
    'MEMBER_ACTIVATED': 'Activated member',
    'MEMBER_DEACTIVATED': 'Deactivated member',
    'PROFILE_UPDATED': 'Updated profile',
    'ANNOUNCEMENT_CREATED': 'Created announcement',
    'ANNOUNCEMENT_UPDATED': 'Updated announcement',
    'ANNOUNCEMENT_DELETED': 'Deleted announcement',
    'ONBOARDING_STEP_COMPLETED': 'Completed onboarding step',
    'ONBOARDING_COMPLETED': 'Completed onboarding',
  };
  return actionMap[action] || action.replace(/_/g, ' ').toLowerCase();
}

export default async function AdminDashboard() {
  const [
    basicStats,
    activityStats,
    recentActivities,
    funnelData,
    onboardingSteps,
    segmentStats,
  ] = await Promise.all([
    getStats(),
    getActivityStats(7),
    getRecentActivities(10),
    getConversionFunnel(),
    getOnboardingFunnel(),
    getMemberSegmentStats(),
  ]);

  const {
    totalMembers,
    activeMembers,
    newThisWeek,
    newThisMonth,
    recentSignups,
    recentLogins,
    activeAnnouncements,
    dailySignups,
  } = basicStats;

  const maxDailySignups = Math.max(...dailySignups.map(d => d.count), 1);

  const stats = [
    {
      label: 'Total Members',
      value: totalMembers,
      icon: Users,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: 'Active Members',
      value: activeMembers,
      icon: UserCheck,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
    },
    {
      label: 'New This Week',
      value: newThisWeek,
      icon: UserPlus,
      color: 'text-gold',
      bgColor: 'bg-gold/10',
    },
    {
      label: 'Logins This Week',
      value: recentLogins,
      icon: LogIn,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
    },
  ];

  // Segment quick links for members page
  const segmentLinks = [
    {
      label: 'At Risk',
      value: segmentStats.activeAtRisk,
      description: 'No login 30+ days',
      href: '/admin/members?activity=at_risk',
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      icon: AlertTriangle,
    },
    {
      label: 'Not Started',
      value: segmentStats.onboardingNotStarted,
      description: 'No onboarding progress',
      href: '/admin/members?onboarding=not_started',
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      icon: ClipboardList,
    },
    {
      label: 'New This Week',
      value: segmentStats.joinedThisWeek,
      description: 'Recent signups',
      href: '/admin/members?joinDate=this_week',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      icon: Zap,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-white/60">Overview of your team members and activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-navy border border-gold/20 rounded-2xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-white/60 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Conversion Funnel + Onboarding Funnel */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <ConversionFunnel data={funnelData} />
        <OnboardingFunnel steps={onboardingSteps} totalMembers={totalMembers} />
      </div>

      {/* Quick Segment Access */}
      <div className="bg-navy border border-gold/20 rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Quick Segments</h2>
          <Link
            href="/admin/members"
            className="text-gold text-sm hover:text-gold-light transition-colors"
          >
            View All Members →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {segmentLinks.map((segment) => (
            <Link
              key={segment.label}
              href={segment.href}
              className="p-4 bg-navy-dark rounded-xl border border-gold/10 hover:border-gold/30 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${segment.bgColor}`}>
                  <segment.icon className={`w-4 h-4 ${segment.color}`} />
                </div>
                <span className={`text-2xl font-bold ${segment.color}`}>{segment.value}</span>
              </div>
              <p className="text-white font-medium">{segment.label}</p>
              <p className="text-white/50 text-sm">{segment.description}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Member Growth Chart */}
        <div className="bg-navy border border-gold/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-5 h-5 text-gold" />
            <h2 className="text-xl font-semibold text-white">Member Growth (7 Days)</h2>
          </div>
          <div className="flex items-end justify-between h-40 gap-2">
            {dailySignups.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-navy-dark rounded-t-lg relative" style={{ height: '120px' }}>
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gold to-gold/60 rounded-t-lg transition-all duration-500"
                    style={{
                      height: `${Math.max((day.count / maxDailySignups) * 100, day.count > 0 ? 10 : 0)}%`,
                      minHeight: day.count > 0 ? '8px' : '0'
                    }}
                  />
                  {day.count > 0 && (
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-gold text-sm font-semibold">
                      {day.count}
                    </span>
                  )}
                </div>
                <span className="text-white/60 text-xs">{day.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-navy border border-gold/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-5 h-5 text-gold" />
            <h2 className="text-xl font-semibold text-white">Quick Stats</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-navy-dark rounded-xl border border-gold/10">
              <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
                <Calendar className="w-4 h-4" />
                <span>New This Month</span>
              </div>
              <p className="text-2xl font-bold text-white">{newThisMonth}</p>
            </div>
            <div className="p-4 bg-navy-dark rounded-xl border border-gold/10">
              <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
                <Bell className="w-4 h-4" />
                <span>Active Announcements</span>
              </div>
              <p className="text-2xl font-bold text-white">{activeAnnouncements}</p>
            </div>
            <div className="p-4 bg-navy-dark rounded-xl border border-gold/10">
              <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
                <TrendingUp className="w-4 h-4" />
                <span>Total Logins (7d)</span>
              </div>
              <p className="text-2xl font-bold text-white">{activityStats['LOGIN'] || 0}</p>
            </div>
            <div className="p-4 bg-navy-dark rounded-xl border border-gold/10">
              <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
                <Shield className="w-4 h-4" />
                <span>Password Changes (7d)</span>
              </div>
              <p className="text-2xl font-bold text-white">{activityStats['PASSWORD_CHANGED'] || 0}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Signups */}
        <div className="bg-navy border border-gold/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gold" />
              <h2 className="text-xl font-semibold text-white">Recent Signups</h2>
            </div>
            <Link
              href="/admin/members"
              className="text-gold text-sm hover:text-gold-light transition-colors"
            >
              View All →
            </Link>
          </div>

          {recentSignups.length > 0 ? (
            <div className="space-y-3">
              {recentSignups.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 bg-navy-dark rounded-xl border border-gold/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center">
                      <span className="text-gold font-semibold text-sm">
                        {member.firstName[0]}{member.lastName[0]}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">
                        {member.firstName} {member.lastName}
                      </p>
                      <p className="text-white/50 text-xs">{member.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                        member.isActive
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {member.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <p className="text-white/40 text-xs mt-1">
                      {new Date(member.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/40">No members yet</p>
              <Link
                href="/admin/add-member"
                className="inline-block mt-4 px-4 py-2 bg-gold text-navy-dark font-medium rounded-lg hover:bg-gold-light transition-colors"
              >
                Add First Member
              </Link>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-navy border border-gold/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-5 h-5 text-gold" />
            <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
          </div>

          {recentActivities.length > 0 ? (
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 bg-navy-dark rounded-xl border border-gold/10"
                >
                  <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Activity className="w-4 h-4 text-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm">
                      {activity.user ? (
                        <span className="font-medium">
                          {activity.user.firstName} {activity.user.lastName}
                        </span>
                      ) : (
                        <span className="text-white/60">Unknown user</span>
                      )}
                      {' '}
                      <span className="text-white/60">{formatActionName(activity.action)}</span>
                    </p>
                    <p className="text-white/40 text-xs mt-1">
                      {new Date(activity.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Activity className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/40">No activity yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
