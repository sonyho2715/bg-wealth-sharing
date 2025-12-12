'use client';

import { Eye, Calendar, TrendingUp, Users } from 'lucide-react';

interface ReferralStatsProps {
  stats: {
    totalVisits: number;
    weekVisits: number;
    monthVisits: number;
    conversions: number;
  };
}

export default function ReferralStats({ stats }: ReferralStatsProps) {
  const statItems = [
    {
      label: 'Total Link Visits',
      value: stats.totalVisits,
      icon: Eye,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
    },
    {
      label: 'This Week',
      value: stats.weekVisits,
      icon: Calendar,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
    },
    {
      label: 'This Month',
      value: stats.monthVisits,
      icon: TrendingUp,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
    },
    {
      label: 'Conversions',
      value: stats.conversions,
      icon: Users,
      color: 'text-gold',
      bgColor: 'bg-gold/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statItems.map((stat) => (
        <div
          key={stat.label}
          className="bg-navy border border-gold/20 rounded-xl p-4"
        >
          <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center mb-3`}>
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
          </div>
          <p className="text-2xl font-bold text-white">{stat.value}</p>
          <p className="text-sm text-white/50">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
