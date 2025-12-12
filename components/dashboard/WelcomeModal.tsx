'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Sparkles,
  ClipboardList,
  Radio,
  BookOpen,
  ArrowRight,
  CheckCircle,
  Clock,
} from 'lucide-react';
import Link from 'next/link';

interface WelcomeModalProps {
  firstName: string;
}

const features = [
  {
    icon: ClipboardList,
    title: 'Complete Onboarding',
    description: 'Follow our 7-step guide to set up your accounts and get started',
    href: '/dashboard/onboarding',
    time: '15-20 min',
    priority: true,
  },
  {
    icon: Radio,
    title: 'Trading Signals',
    description: 'Learn when and where to receive daily trading signals',
    href: '/dashboard/signals',
    time: '5 min',
    priority: false,
  },
  {
    icon: BookOpen,
    title: 'Resources & FAQs',
    description: 'Access tutorials, guides, and answers to common questions',
    href: '/dashboard/resources',
    time: '10 min',
    priority: false,
  },
];

export default function WelcomeModal({ firstName }: WelcomeModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Check if this is the first visit
    const hasSeenWelcome = localStorage.getItem('bg_welcome_seen');
    if (!hasSeenWelcome) {
      // Small delay before showing modal
      const timer = setTimeout(() => setIsOpen(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('bg_welcome_seen', 'true');
    setIsOpen(false);
  };

  const handleStartOnboarding = () => {
    localStorage.setItem('bg_welcome_seen', 'true');
    setIsOpen(false);
    window.location.href = '/dashboard/onboarding';
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative w-full max-w-lg bg-navy border border-gold/30 rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header with gradient */}
          <div className="bg-gradient-to-br from-gold/20 to-gold/5 p-6 pb-8 text-center border-b border-gold/20">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-16 h-16 mx-auto bg-gold/20 rounded-full flex items-center justify-center mb-4"
            >
              <Sparkles className="w-8 h-8 text-gold" />
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Welcome, {firstName}!
            </h2>
            <p className="text-white/60">
              You&apos;re all set to start your investment journey
            </p>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-4">
              Recommended Next Steps
            </h3>

            <div className="space-y-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Link
                    href={feature.href}
                    onClick={() => {
                      localStorage.setItem('bg_welcome_seen', 'true');
                      setIsOpen(false);
                    }}
                    className={`block p-4 rounded-xl border transition-all ${
                      feature.priority
                        ? 'bg-gold/10 border-gold/30 hover:border-gold/50'
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-2 rounded-lg ${
                          feature.priority ? 'bg-gold/20' : 'bg-white/10'
                        }`}
                      >
                        <feature.icon
                          className={`w-5 h-5 ${
                            feature.priority ? 'text-gold' : 'text-white/70'
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-white">{feature.title}</h4>
                          {feature.priority && (
                            <span className="text-xs bg-gold text-navy-dark px-2 py-0.5 rounded-full font-medium">
                              Start Here
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-white/50 mt-1">{feature.description}</p>
                        <div className="flex items-center gap-1 mt-2 text-xs text-white/40">
                          <Clock className="w-3 h-3" />
                          <span>{feature.time}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-white/30" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleStartOnboarding}
                className="flex-1 py-3 bg-gold hover:bg-gold-light text-navy-dark font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Start Onboarding
              </button>
              <button
                onClick={handleClose}
                className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all"
              >
                Explore Dashboard
              </button>
            </div>

            <p className="text-center text-xs text-white/30 mt-4">
              You can access this guide anytime from Settings
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
