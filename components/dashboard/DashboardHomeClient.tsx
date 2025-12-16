'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ClipboardList,
  TrendingUp,
  Clock,
  CheckCircle2,
  ArrowRight,
  Radio,
  BookOpen,
} from 'lucide-react';

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
}

interface DashboardHomeClientProps {
  userEmail: string;
  userName: string;
  completedSteps: number[];
  progress: number;
  totalSteps: number;
  onboardingSteps: OnboardingStep[];
}

export default function DashboardHomeClient({
  userEmail,
  userName,
  completedSteps,
  progress,
  totalSteps,
  onboardingSteps,
}: DashboardHomeClientProps) {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome Back{userName ? `, ${userName}` : ''}!
        </h1>
        <p className="text-white/60">
          {userEmail ? `Logged in as ${userEmail}` : 'Ready to continue your journey?'}
        </p>
      </motion.div>

      {/* Progress Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-navy border border-gold/20 rounded-2xl p-6 mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-white mb-1">Onboarding Progress</h2>
            <p className="text-white/60 text-sm">
              {completedSteps.length} of {totalSteps} steps completed
            </p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-bold gold-gradient">{progress}%</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-navy-dark rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full"
          />
        </div>

        {progress < 100 && (
          <Link
            href="/dashboard/onboarding"
            className="inline-flex items-center gap-2 mt-4 text-gold hover:text-gold-light transition-colors"
          >
            Continue Onboarding
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}

        {progress === 100 && (
          <div className="mt-4 flex items-center gap-2 text-green-400">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-medium">All steps completed!</span>
          </div>
        )}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid md:grid-cols-3 gap-4 mb-8"
      >
        <Link
          href="/dashboard/onboarding"
          className="group bg-navy border border-gold/20 rounded-xl p-6 hover:border-gold/40 transition-all"
        >
          <div className="inline-flex p-3 rounded-xl bg-gold/10 mb-4 group-hover:bg-gold/20 transition-colors">
            <ClipboardList className="w-6 h-6 text-gold" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">Onboarding Guide</h3>
          <p className="text-sm text-white/60">
            Step-by-step guide to set up your account
          </p>
        </Link>

        <Link
          href="/dashboard/signals"
          className="group bg-navy border border-gold/20 rounded-xl p-6 hover:border-gold/40 transition-all"
        >
          <div className="inline-flex p-3 rounded-xl bg-gold/10 mb-4 group-hover:bg-gold/20 transition-colors">
            <Radio className="w-6 h-6 text-gold" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">Trading Signals</h3>
          <p className="text-sm text-white/60">
            Daily signals at 1 PM and 7 PM EST
          </p>
        </Link>

        <Link
          href="/dashboard/resources"
          className="group bg-navy border border-gold/20 rounded-xl p-6 hover:border-gold/40 transition-all"
        >
          <div className="inline-flex p-3 rounded-xl bg-gold/10 mb-4 group-hover:bg-gold/20 transition-colors">
            <BookOpen className="w-6 h-6 text-gold" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">Resources</h3>
          <p className="text-sm text-white/60">
            Tutorials, guides, and helpful videos
          </p>
        </Link>
      </motion.div>

      {/* Next Steps Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-navy border border-gold/20 rounded-2xl p-6"
      >
        <h2 className="text-xl font-semibold text-white mb-4">Your Next Steps</h2>

        <div className="space-y-3">
          {onboardingSteps.map((step, index) => {
            const isCompleted = completedSteps.includes(step.id);
            return (
              <div
                key={step.id}
                className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${
                  isCompleted ? 'bg-green-500/10' : 'bg-navy-dark'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isCompleted
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-gold/10 text-gold'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <span className="font-semibold">{index + 1}</span>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-white">{step.title}</h4>
                  <p className="text-sm text-white/60">{step.description}</p>
                </div>
                {!isCompleted && (
                  <Clock className="w-5 h-5 text-white/40" />
                )}
              </div>
            );
          })}
        </div>

        <Link
          href="/dashboard/onboarding"
          className="inline-flex items-center gap-2 mt-4 text-gold hover:text-gold-light transition-colors"
        >
          View All Steps
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>

      {/* Trading Times Reminder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/30 rounded-2xl p-6"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 bg-gold/20 rounded-xl">
            <TrendingUp className="w-6 h-6 text-gold" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Trading Signal Times</h3>
            <p className="text-white/70">
              Remember to follow the daily trading signals:
            </p>
            <div className="flex gap-4 mt-3">
              <div className="px-4 py-2 bg-navy rounded-lg">
                <span className="text-gold font-semibold">1:00 PM EST</span>
              </div>
              <div className="px-4 py-2 bg-navy rounded-lg">
                <span className="text-gold font-semibold">7:00 PM EST</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
