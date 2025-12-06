'use client';

import { motion } from 'framer-motion';
import { Users, Award, TrendingUp, Target } from 'lucide-react';
import Image from 'next/image';

export default function TeamSection() {
  return (
    <section id="team" className="py-20 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Meet Our <span className="text-gold">Leadership Team</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Experienced professionals dedicated to your financial success
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Team Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden border-2 border-gold/30 shadow-2xl shadow-gold/10">
              <Image
                src="/images/bg/agent-team.png"
                alt="BG Wealth Agent Team"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gold/20 rounded-full blur-2xl" />
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-gold/10 rounded-full blur-3xl" />
          </motion.div>

          {/* Team Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Your Success Is Our Mission
            </h3>
            <p className="text-white/70 leading-relaxed">
              Our team of experienced agents and leaders are committed to guiding you through every step of your wealth-building journey. With proven strategies and dedicated support, we help our members achieve their financial goals.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              <div className="bg-navy-dark border border-gold/20 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gold/10 rounded-lg">
                    <Award className="w-5 h-5 text-gold" />
                  </div>
                  <span className="text-white font-semibold">Expert Guidance</span>
                </div>
                <p className="text-white/60 text-sm">Professional support at every step</p>
              </div>
              <div className="bg-navy-dark border border-gold/20 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gold/10 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-gold" />
                  </div>
                  <span className="text-white font-semibold">Proven Results</span>
                </div>
                <p className="text-white/60 text-sm">Track record of member success</p>
              </div>
              <div className="bg-navy-dark border border-gold/20 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gold/10 rounded-lg">
                    <Users className="w-5 h-5 text-gold" />
                  </div>
                  <span className="text-white font-semibold">Community</span>
                </div>
                <p className="text-white/60 text-sm">Join a supportive team</p>
              </div>
              <div className="bg-navy-dark border border-gold/20 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gold/10 rounded-lg">
                    <Target className="w-5 h-5 text-gold" />
                  </div>
                  <span className="text-white font-semibold">Daily Signals</span>
                </div>
                <p className="text-white/60 text-sm">1 PM & 7 PM EST trading signals</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
