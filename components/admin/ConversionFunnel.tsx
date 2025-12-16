'use client';

import { Eye, Users, ClipboardList, CheckCircle2, Activity, ArrowRight } from 'lucide-react';

interface FunnelData {
  totalVisits: number;
  uniqueVisits: number;
  registrations: number;
  onboardingStarted: number;
  onboardingComplete: number;
  activeMembers: number;
  visitToRegister: number;
  registerToOnboard: number;
  onboardToComplete: number;
  completeToActive: number;
  overallConversion: number;
}

interface ConversionFunnelProps {
  data: FunnelData;
}

export default function ConversionFunnel({ data }: ConversionFunnelProps) {
  const stages = [
    {
      label: 'Unique Visits',
      value: data.uniqueVisits,
      icon: Eye,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      width: '100%',
    },
    {
      label: 'Registrations',
      value: data.registrations,
      icon: Users,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      width: data.uniqueVisits > 0 ? `${Math.max((data.registrations / data.uniqueVisits) * 100, 20)}%` : '20%',
      conversion: data.visitToRegister,
    },
    {
      label: 'Started Onboarding',
      value: data.onboardingStarted,
      icon: ClipboardList,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      width: data.uniqueVisits > 0 ? `${Math.max((data.onboardingStarted / data.uniqueVisits) * 100, 15)}%` : '15%',
      conversion: data.registerToOnboard,
    },
    {
      label: 'Completed Onboarding',
      value: data.onboardingComplete,
      icon: CheckCircle2,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      width: data.uniqueVisits > 0 ? `${Math.max((data.onboardingComplete / data.uniqueVisits) * 100, 10)}%` : '10%',
      conversion: data.onboardToComplete,
    },
    {
      label: 'Active (7d)',
      value: data.activeMembers,
      icon: Activity,
      color: 'text-gold',
      bgColor: 'bg-gold/10',
      width: data.uniqueVisits > 0 ? `${Math.max((data.activeMembers / data.uniqueVisits) * 100, 8)}%` : '8%',
      conversion: data.completeToActive,
    },
  ];

  return (
    <div className="bg-navy border border-gold/20 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Conversion Funnel</h2>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gold/10 rounded-lg">
          <span className="text-white/60 text-sm">Overall:</span>
          <span className="text-gold font-bold">{data.overallConversion}%</span>
        </div>
      </div>

      {/* Funnel Visualization */}
      <div className="space-y-3">
        {stages.map((stage, index) => (
          <div key={stage.label} className="relative">
            {/* Conversion arrow between stages */}
            {index > 0 && stage.conversion !== undefined && (
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 flex items-center gap-1 text-xs text-white/40">
                <ArrowRight className="w-3 h-3 rotate-90" />
                <span>{stage.conversion}%</span>
              </div>
            )}

            <div
              className={`relative overflow-hidden rounded-lg border border-gold/10 transition-all hover:border-gold/30`}
              style={{ width: stage.width }}
            >
              <div className={`${stage.bgColor} p-4`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <stage.icon className={`w-5 h-5 ${stage.color}`} />
                    <span className="text-white font-medium">{stage.label}</span>
                  </div>
                  <span className={`text-xl font-bold ${stage.color}`}>{stage.value}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-6 border-t border-gold/10 grid grid-cols-2 gap-4">
        <div className="p-3 bg-navy-dark rounded-lg">
          <p className="text-white/60 text-xs mb-1">Total Page Visits</p>
          <p className="text-white font-semibold">{data.totalVisits}</p>
        </div>
        <div className="p-3 bg-navy-dark rounded-lg">
          <p className="text-white/60 text-xs mb-1">Visit → Active Rate</p>
          <p className="text-gold font-semibold">{data.overallConversion}%</p>
        </div>
      </div>
    </div>
  );
}
