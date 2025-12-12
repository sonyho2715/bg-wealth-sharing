'use client';

import { motion } from 'framer-motion';
import { Video, ArrowRight, Calendar, Users, Clock } from 'lucide-react';
import Link from 'next/link';

interface CTASectionProps {
  referralCode?: string;
}

export default function CTASection({ referralCode }: CTASectionProps) {
  const registerHref = referralCode ? `/register?ref=${referralCode}` : '/register';
  return (
    <section className="py-20 bg-gradient-to-b from-navy-dark to-[#0a0a14] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-navy-light/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-full px-4 py-2 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            <span className="text-red-400 text-sm font-medium">Live Sessions This Week</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Ready to Start Your <span className="gold-gradient">Wealth Journey?</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Join our free live Zoom training to learn exactly how our members are building
            passive income through BG Wealth Sharing.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-gold" />
              <span className="text-white">2,847+ Live Attendees</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gold" />
              <span className="text-white">60 Minute Sessions</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gold" />
              <span className="text-white">3 Sessions Weekly</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={registerHref}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-navy-dark font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-gold/30 transition-all duration-300"
            >
              <Video className="w-5 h-5" />
              Register for Free Training
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-gold/30 text-gold font-semibold text-lg rounded-xl hover:bg-gold/10 transition-all duration-300"
            >
              Already a Member? Login
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-12 pt-8 border-t border-navy-light/30">
            <p className="text-gray-500 text-sm mb-4">Trusted by investors worldwide</p>
            <div className="flex flex-wrap justify-center gap-8">
              <div className="text-center">
                <p className="text-2xl font-bold text-gold">$100M+</p>
                <p className="text-gray-500 text-sm">Total Volume</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gold">500,000+</p>
                <p className="text-gray-500 text-sm">Active Members</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gold">96+</p>
                <p className="text-gray-500 text-sm">Success Stories</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gold">100%</p>
                <p className="text-gray-500 text-sm">Secure Platform</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
