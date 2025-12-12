'use client';

import { motion } from 'framer-motion';
import { Play, ArrowRight, Shield, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';

interface HeroSectionProps {
  referralCode?: string;
}

export default function HeroSection({ referralCode }: HeroSectionProps) {
  const registerHref = referralCode ? `/register?ref=${referralCode}` : '/login';
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy to-navy-dark" />

      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-6">
              <Shield className="w-4 h-4 text-gold" />
              <span className="text-sm text-gold">Trusted by 500,000+ Investors</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Invest Once,{' '}
              <span className="gold-gradient">Benefit for Life</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/70 mb-8 max-w-xl">
              Join the Lee Meadows Team in the BG Wealth Sharing Project.
              Experience the power of the Win-Win-Win model with DSJEX partnership.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href={registerHref}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold text-navy-dark font-semibold rounded-lg hover:bg-gold-light transition-all animate-pulse-gold"
              >
                Get Started Today
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#overview"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gold/50 text-gold font-semibold rounded-lg hover:bg-gold/10 transition-colors"
              >
                <Play className="w-5 h-5" />
                Watch How It Works
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                  <TrendingUp className="w-5 h-5 text-gold" />
                  <span className="text-2xl font-bold text-white">$100M+</span>
                </div>
                <p className="text-sm text-white/60">Total Volume</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                  <Users className="w-5 h-5 text-gold" />
                  <span className="text-2xl font-bold text-white">500,000+</span>
                </div>
                <p className="text-sm text-white/60">Active Members</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                  <Shield className="w-5 h-5 text-gold" />
                  <span className="text-2xl font-bold text-white">100%</span>
                </div>
                <p className="text-sm text-white/60">Secure</p>
              </div>
            </div>
          </motion.div>

          {/* Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border-2 border-gold/30 shadow-2xl shadow-gold/10">
              <video
                autoPlay
                muted
                loop
                playsInline
                controls
                className="w-full aspect-video object-cover"
                poster="/video-poster.jpg"
              >
                <source
                  src="https://bg662.com/wp-content/uploads/2025/BG%20Video%20720hd.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Decorative frame */}
            <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 via-transparent to-gold/20 rounded-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
