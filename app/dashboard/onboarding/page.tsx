'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Clock,
  UserPlus,
  LogIn,
  Wallet,
  MessageCircle,
  ClipboardList,
  TrendingUp,
  Target,
  Download,
} from 'lucide-react';
import { ONBOARDING_STEPS, getYouTubeEmbedUrl, OnboardingStep } from '@/data/onboarding-steps';

const iconMap: Record<string, React.ElementType> = {
  'user-plus': UserPlus,
  'log-in': LogIn,
  'wallet': Wallet,
  'message-circle': MessageCircle,
  'clipboard': ClipboardList,
  'trending-up': TrendingUp,
  'target': Target,
  'download': Download,
};

export default function OnboardingPage() {
  const [expandedStep, setExpandedStep] = useState<number | null>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    // Load completed steps from localStorage
    const saved = localStorage.getItem('bg-wealth-completed-steps');
    if (saved) {
      setCompletedSteps(JSON.parse(saved));
    }
  }, []);

  const toggleStep = (stepId: number) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  const markAsComplete = (stepId: number) => {
    const newCompleted = completedSteps.includes(stepId)
      ? completedSteps.filter(id => id !== stepId)
      : [...completedSteps, stepId];

    setCompletedSteps(newCompleted);
    localStorage.setItem('bg-wealth-completed-steps', JSON.stringify(newCompleted));

    // Auto-expand next step
    if (!completedSteps.includes(stepId) && stepId < ONBOARDING_STEPS.length) {
      setExpandedStep(stepId + 1);
    }
  };

  const progress = Math.round((completedSteps.length / ONBOARDING_STEPS.length) * 100);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">
          New Member Onboarding
        </h1>
        <p className="text-white/60">
          Follow these steps to set up your trading account. Each step has detailed instructions.
        </p>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-navy border border-gold/20 rounded-xl p-4 mb-8"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/60 text-sm">Progress</span>
          <span className="text-gold font-semibold">{progress}% Complete</span>
        </div>
        <div className="w-full h-2 bg-navy-dark rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full"
          />
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-white/40">
          <span>{completedSteps.length} of {ONBOARDING_STEPS.length} steps completed</span>
          <span>~{ONBOARDING_STEPS.reduce((acc, step) => acc + parseInt(step.time), 0)} min total</span>
        </div>
      </motion.div>

      {/* Steps Timeline */}
      <div className="space-y-4">
        {ONBOARDING_STEPS.map((step, index) => {
          const isExpanded = expandedStep === step.id;
          const isCompleted = completedSteps.includes(step.id);
          const embedUrl = step.videoUrl ? getYouTubeEmbedUrl(step.videoUrl) : null;
          const StepIcon = iconMap[step.icon] || Circle;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`bg-navy border rounded-xl overflow-hidden transition-colors ${
                isCompleted
                  ? 'border-green-500/30'
                  : isExpanded
                  ? 'border-gold/40'
                  : 'border-gold/20'
              }`}
            >
              {/* Step Header */}
              <button
                onClick={() => toggleStep(step.id)}
                className="w-full flex items-center gap-4 p-4 text-left hover:bg-white/5 transition-colors"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isCompleted
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-gold/10 text-gold'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <StepIcon className="w-6 h-6" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-gold/20 text-gold px-2 py-0.5 rounded-full font-medium">
                      Step {step.id}
                    </span>
                    <span className="text-xs text-white/40 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {step.time}
                    </span>
                  </div>
                  <h3 className="font-semibold text-white mt-1">{step.title}</h3>
                  <p className="text-sm text-white/60">{step.description}</p>
                </div>
                <div className="text-gold">
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </button>

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-0">
                      <div className="border-t border-gold/10 pt-4">

                        {/* Sub-Steps */}
                        <div className="space-y-4 mb-4">
                          {step.subSteps.map((subStep, subIndex) => (
                            <div key={subIndex} className="bg-navy-dark/50 rounded-lg p-4">
                              <h4 className="font-semibold text-white flex items-center gap-2 mb-3">
                                <span className="w-6 h-6 bg-gold/20 text-gold rounded-full flex items-center justify-center text-xs font-bold">
                                  {subIndex + 1}
                                </span>
                                {subStep.title}
                              </h4>
                              <ul className="space-y-2">
                                {subStep.items.map((item, itemIndex) => (
                                  <li key={itemIndex} className="flex items-start gap-3 text-white/70 text-sm">
                                    <span className="w-5 h-5 bg-gold/10 text-gold rounded flex items-center justify-center flex-shrink-0 text-xs mt-0.5">
                                      {itemIndex + 1}
                                    </span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>

                        {/* Video */}
                        {embedUrl && (
                          <div className="aspect-video rounded-lg overflow-hidden bg-navy-dark mb-4">
                            <iframe
                              src={embedUrl}
                              title={step.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full h-full"
                            />
                          </div>
                        )}

                        {/* External Link */}
                        {step.externalLink && (
                          <a
                            href={step.externalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-lg text-gold hover:bg-gold/20 transition-colors mb-4"
                          >
                            <ExternalLink className="w-4 h-4" />
                            {step.externalLinkText || 'Open Link'}
                          </a>
                        )}

                        {/* Complete Button */}
                        <button
                          onClick={() => markAsComplete(step.id)}
                          className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all ${
                            isCompleted
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                              : 'bg-gold text-navy-dark hover:bg-gold-light'
                          }`}
                        >
                          {isCompleted ? (
                            <>
                              <CheckCircle2 className="w-5 h-5" />
                              Completed - Click to Undo
                            </>
                          ) : (
                            <>
                              <Circle className="w-5 h-5" />
                              Mark as Complete
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Completion Message */}
      {completedSteps.length === ONBOARDING_STEPS.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-8 bg-gradient-to-r from-green-500/10 to-green-500/5 border border-green-500/30 rounded-2xl p-6 text-center"
        >
          <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            Congratulations! 🎉
          </h2>
          <p className="text-white/70 max-w-md mx-auto">
            You have completed all onboarding steps. You are now ready to start trading
            with the Lee Meadows team! Remember: 1:20 PM and 7:20 PM EST for signals.
          </p>
        </motion.div>
      )}
    </div>
  );
}
