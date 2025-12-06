'use client';

import { motion } from 'framer-motion';
import { Award, Building2, Home, Users, CheckCircle } from 'lucide-react';

const credentials = [
  {
    icon: Building2,
    title: 'Business Owner',
    description: 'Successful entrepreneur with multiple business ventures',
  },
  {
    icon: Home,
    title: 'Real Estate Investor',
    description: 'Experienced in property investments and wealth building',
  },
  {
    icon: Award,
    title: 'Kangen Leader',
    description: 'Top-tier leader in the Kangen water business',
  },
  {
    icon: Users,
    title: 'Guiding Leader',
    description: 'Mentoring hundreds to financial success',
  },
];

const achievements = [
  'Helped 500+ members start their investment journey',
  'Built multiple six-figure income streams',
  'Proven track record in wealth building',
  'Dedicated team support and mentorship',
  'Daily trading signals with high accuracy',
];

export default function AboutLeeMeadows() {
  return (
    <section id="about" className="py-20 bg-navy relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-gold rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gold rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-gold rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              {/* Profile image placeholder */}
              <div className="relative w-full max-w-md mx-auto">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-navy-light to-navy-dark border-2 border-gold/30 overflow-hidden flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-32 h-32 mx-auto rounded-full bg-gold/20 border-4 border-gold flex items-center justify-center mb-4">
                      <span className="text-5xl font-bold text-gold">LM</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Lee Meadows</h3>
                    <p className="text-gold mt-1">Team Leader</p>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold/10 rounded-full blur-xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gold/10 rounded-full blur-xl" />
              </div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Meet <span className="gold-gradient">Lee Meadows</span>
            </h2>
            <p className="text-lg text-white/70 mb-8">
              Your guide to financial freedom through the BG Wealth Sharing Project.
              With years of experience in business, real estate, and network marketing,
              Lee Meadows brings proven strategies to help you succeed.
            </p>

            {/* Credentials Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {credentials.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-navy-dark/50 border border-gold/20 rounded-xl p-4"
                >
                  <item.icon className="w-6 h-6 text-gold mb-2" />
                  <h4 className="font-semibold text-white text-sm">{item.title}</h4>
                  <p className="text-xs text-white/60 mt-1">{item.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Achievements */}
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                  <span className="text-white/80">{achievement}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
