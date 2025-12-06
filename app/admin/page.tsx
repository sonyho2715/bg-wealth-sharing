import { db } from '@/lib/db';
import { Users, UserPlus, UserCheck, Clock } from 'lucide-react';
import Link from 'next/link';

async function getStats() {
  const [totalMembers, activeMembers, recentSignups] = await Promise.all([
    db.user.count({ where: { role: 'MEMBER' } }),
    db.user.count({ where: { role: 'MEMBER', isActive: true } }),
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
  ]);

  return { totalMembers, activeMembers, recentSignups };
}

export default async function AdminDashboard() {
  const { totalMembers, activeMembers, recentSignups } = await getStats();

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
      value: recentSignups.filter(m => {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return new Date(m.createdAt) > weekAgo;
      }).length,
      icon: UserPlus,
      color: 'text-gold',
      bgColor: 'bg-gold/10',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-white/60">Overview of your team members and activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
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
          <div className="space-y-4">
            {recentSignups.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-4 bg-navy-dark rounded-xl border border-gold/10"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                    <span className="text-gold font-semibold">
                      {member.firstName[0]}{member.lastName[0]}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      {member.firstName} {member.lastName}
                    </p>
                    <p className="text-white/50 text-sm">{member.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
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
    </div>
  );
}
