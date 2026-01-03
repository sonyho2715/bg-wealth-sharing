'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Calendar, DollarSign, Sparkles } from 'lucide-react';

const compoundingBenefits = [
  {
    icon: DollarSign,
    title: 'Start Small',
    description: 'You don\'t need a fortune to begin. Even modest amounts can grow significantly over time.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: TrendingUp,
    title: 'Consistent Growth',
    description: 'Daily profits that compound on themselves, creating a snowball effect for your investment.',
    color: 'from-gold to-gold-dark',
  },
  {
    icon: Calendar,
    title: 'Time is Your Friend',
    description: 'The longer you stay, the more powerful compounding becomes. Patience pays off.',
    color: 'from-emerald-500 to-emerald-600',
  },
];

export default function ProjectOverview() {
  return (
    <section id="overview" className="py-20 bg-navy-dark relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-6">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-sm text-gold">This is what excited me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            The Power of <span className="gold-gradient">Compounding</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Einstein called compound interest the eighth wonder of the world.
            Here&apos;s why this opportunity caught my attention.
          </p>
        </motion.div>

        {/* Compounding Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="bg-navy border border-gold/20 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold text-white text-center mb-6">
              See How Small Daily Gains Add Up
            </h3>

            {/* Simple visual example */}
            <div className="grid grid-cols-3 gap-4 text-center mb-6">
              <div className="bg-navy-dark rounded-xl p-4 border border-gold/10">
                <p className="text-sm text-white/60 mb-1">Month 1</p>
                <p className="text-2xl font-bold text-white">$1,000</p>
                <p className="text-xs text-gold mt-1">Starting point</p>
              </div>
              <div className="bg-navy-dark rounded-xl p-4 border border-gold/10">
                <p className="text-sm text-white/60 mb-1">Month 6</p>
                <p className="text-2xl font-bold text-gold">$1,340</p>
                <p className="text-xs text-emerald-400 mt-1">+34% growth</p>
              </div>
              <div className="bg-navy-dark rounded-xl p-4 border border-gold/10">
                <p className="text-sm text-white/60 mb-1">Month 12</p>
                <p className="text-2xl font-bold text-gold">$1,800</p>
                <p className="text-xs text-emerald-400 mt-1">+80% growth</p>
              </div>
            </div>

            <p className="text-center text-white/60 text-sm">
              *Illustrative example. Actual results vary based on market conditions and trading performance.
            </p>
          </div>
        </motion.div>

        {/* Benefits Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {compoundingBenefits.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-navy border border-gold/20 rounded-2xl p-6 hover:border-gold/40 transition-colors h-full">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${item.color} mb-4`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-white/60">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Videos Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-2">
            Want to Learn More?
          </h3>
          <p className="text-white/60 text-center mb-8">
            These videos explain everything in detail. I found them really helpful.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden border border-gold/20 bg-navy">
              <video
                controls
                playsInline
                preload="metadata"
                className="w-full aspect-video object-cover"
              >
                <source
                  src="https://lk0860.com/wp-content/uploads/2025/11/a.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
              <div className="p-4">
                <h4 className="font-semibold text-white">How It All Works</h4>
                <p className="text-sm text-white/60 mt-1">
                  A simple breakdown of the opportunity and why it works.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden border border-gold/20 bg-navy">
              <video
                controls
                playsInline
                preload="metadata"
                className="w-full aspect-video object-cover"
              >
                <source
                  src="https://lk0860.com/wp-content/uploads/2025/11/b.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
              <div className="p-4">
                <h4 className="font-semibold text-white">Getting Started Guide</h4>
                <p className="text-sm text-white/60 mt-1">
                  Step-by-step walkthrough if you decide to join.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
