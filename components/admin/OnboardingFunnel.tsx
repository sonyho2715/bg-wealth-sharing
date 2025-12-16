'use client';

import { AlertTriangle } from 'lucide-react';

interface OnboardingFunnelStep {
  step: number;
  name: string;
  completed: number;
  percentage: number;
}

interface OnboardingFunnelProps {
  steps: OnboardingFunnelStep[];
  totalMembers: number;
}

export default function OnboardingFunnel({ steps, totalMembers }: OnboardingFunnelProps) {
  // Find the step with biggest drop-off
  let biggestDropOff = 0;
  let dropOffStep = -1;

  for (let i = 1; i < steps.length; i++) {
    const drop = steps[i - 1].percentage - steps[i].percentage;
    if (drop > biggestDropOff) {
      biggestDropOff = drop;
      dropOffStep = i;
    }
  }

  return (
    <div className="bg-navy border border-gold/20 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Onboarding Steps</h2>
        <span className="text-white/60 text-sm">{totalMembers} total members</span>
      </div>

      {/* Steps Progress */}
      <div className="space-y-3">
        {steps.map((step, index) => {
          const isBottleneck = index === dropOffStep && biggestDropOff > 10;

          return (
            <div key={step.step} className="relative">
              <div className="flex items-center gap-4">
                {/* Step Number */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  step.percentage >= 75
                    ? 'bg-green-500/20 text-green-400'
                    : step.percentage >= 50
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  <span className="text-sm font-bold">{step.step}</span>
                </div>

                {/* Progress Bar */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white text-sm flex items-center gap-2">
                      {step.name}
                      {isBottleneck && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-500/20 text-orange-400 text-xs rounded-full">
                          <AlertTriangle className="w-3 h-3" />
                          Bottleneck
                        </span>
                      )}
                    </span>
                    <span className="text-white/60 text-sm">
                      {step.completed} ({step.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 bg-navy-dark rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        step.percentage >= 75
                          ? 'bg-green-500'
                          : step.percentage >= 50
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${step.percentage}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Drop-off indicator */}
              {index > 0 && (
                <div className="absolute -top-1 left-4 w-[1px] h-2 bg-gold/20" />
              )}
            </div>
          );
        })}
      </div>

      {/* Insight */}
      {dropOffStep > 0 && biggestDropOff > 10 && (
        <div className="mt-6 p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-orange-400 font-medium text-sm">Improvement Opportunity</p>
              <p className="text-white/70 text-sm mt-1">
                Step {dropOffStep + 1} ({steps[dropOffStep].name}) shows a {biggestDropOff}% drop-off.
                Consider simplifying this step or providing additional guidance.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
