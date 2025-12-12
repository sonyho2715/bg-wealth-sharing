'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Calendar,
  Users,
  CheckCircle,
  ArrowRight,
  Clock,
  Video,
  Shield,
  ChevronRight,
} from 'lucide-react';
import { CONFIG } from '@/lib/config';

const steps = [
  {
    number: 1,
    title: 'Attend Free Training',
    description: 'Join our live Zoom training session to learn about the BG Wealth Sharing opportunity',
    icon: Video,
    status: 'current',
  },
  {
    number: 2,
    title: 'Get Your Account',
    description: 'After training, our team will create your member account and send login credentials',
    icon: Users,
    status: 'upcoming',
  },
  {
    number: 3,
    title: 'Complete Onboarding',
    description: 'Follow our guided onboarding to set up your wallet, Bonchat, and trading platform',
    icon: CheckCircle,
    status: 'upcoming',
  },
];

const benefits = [
  'Learn the Win-Win-Win investment model',
  'Understand how trading signals work',
  'Meet the Lee Meadows Team',
  'Get your questions answered live',
  'No obligation to join',
];

export default function RegisterPage() {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleScheduleTraining = () => {
    setIsRedirecting(true);
    // Small delay to show loading state
    setTimeout(() => {
      window.location.href = 'https://calendly.com/blessingsandfreedom/60min';
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-sm border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <TrendingUp className="w-8 h-8 text-gold" />
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-sm text-white">
                  Lee Meadows <span className="text-gold">Team</span>
                </span>
                <span className="text-xs text-white/50">{CONFIG.brand.name}</span>
              </div>
            </Link>
            <Link
              href="/login"
              className="text-sm text-white/70 hover:text-gold transition-colors"
            >
              Already a member? Login
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full text-gold text-sm mb-6">
              <Calendar className="w-4 h-4" />
              <span>Free Live Training Session</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Start Your Journey to{' '}
              <span className="gold-gradient">Financial Growth</span>
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Join our free 60-minute live training to learn how the BG Wealth Sharing
              model can help you build sustainable income streams.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: How It Works */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="bg-navy border border-gold/20 rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-6">How It Works</h2>

                <div className="space-y-6">
                  {steps.map((step, index) => (
                    <div key={step.number} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            step.status === 'current'
                              ? 'bg-gold text-navy-dark'
                              : 'bg-white/10 text-white/50'
                          }`}
                        >
                          {step.status === 'current' ? (
                            <span className="font-bold">{step.number}</span>
                          ) : (
                            <step.icon className="w-5 h-5" />
                          )}
                        </div>
                        {index < steps.length - 1 && (
                          <div className="w-0.5 h-full bg-gold/20 mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <h3
                          className={`font-semibold mb-1 ${
                            step.status === 'current' ? 'text-gold' : 'text-white/70'
                          }`}
                        >
                          {step.title}
                        </h3>
                        <p className="text-sm text-white/50">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* What You'll Learn */}
                <div className="mt-6 pt-6 border-t border-gold/10">
                  <h3 className="font-semibold text-white mb-4">What You&apos;ll Learn</h3>
                  <ul className="space-y-2">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-white/70">
                        <CheckCircle className="w-4 h-4 text-gold flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Right: Schedule Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 rounded-2xl p-6 sticky top-24">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto bg-gold/20 rounded-full flex items-center justify-center mb-4">
                    <Video className="w-8 h-8 text-gold" />
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-2">
                    Free Live Zoom Training
                  </h2>
                  <p className="text-white/60 text-sm">
                    Choose a time that works for you
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-white/70">
                    <Clock className="w-5 h-5 text-gold" />
                    <span>60 minutes</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/70">
                    <Users className="w-5 h-5 text-gold" />
                    <span>Live with Lee Meadows Team</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/70">
                    <Shield className="w-5 h-5 text-gold" />
                    <span>No payment required</span>
                  </div>
                </div>

                <button
                  onClick={handleScheduleTraining}
                  disabled={isRedirecting}
                  className="w-full py-4 bg-gold hover:bg-gold-light text-navy-dark font-semibold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isRedirecting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-navy-dark/30 border-t-navy-dark rounded-full animate-spin" />
                      Opening Calendly...
                    </>
                  ) : (
                    <>
                      Schedule Free Training
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-white/40 mt-4">
                  You&apos;ll be redirected to Calendly to select your preferred time
                </p>

                {/* Trust indicators */}
                <div className="mt-6 pt-6 border-t border-gold/20">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-gold">500+</p>
                      <p className="text-xs text-white/50">Members Trained</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gold">3x</p>
                      <p className="text-xs text-white/50">Weekly Sessions</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Already a member */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center"
          >
            <p className="text-white/50">
              Already completed training?{' '}
              <Link href="/login" className="text-gold hover:text-gold-light transition-colors">
                Login to your account <ChevronRight className="w-4 h-4 inline" />
              </Link>
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
