'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Calendar, DollarSign, Sparkles, FileCheck, ExternalLink } from 'lucide-react';
import Image from 'next/image';

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

        {/* Compounding Scenarios Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl overflow-hidden border border-gold/20 shadow-2xl">
              <Image
                src="/images/compounding.jpg"
                alt="1.3% Daily Compounding Scenarios - showing growth from $300 to $5,000 starting amounts over 18 months"
                width={1200}
                height={675}
                className="w-full h-auto"
              />
            </div>
            <p className="text-center text-white/60 text-sm mt-4">
              *Illustrative scenarios based on 1.3% daily compounding. Actual results vary based on market conditions.
            </p>
          </div>
        </motion.div>

        {/* Legal Documentation Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="bg-navy border border-gold/20 rounded-2xl p-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-emerald-500/20">
                <FileCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                Verify the Legal Documentation
              </h3>
            </div>
            <p className="text-white/60 text-sm mb-4">
              I always recommend doing your own research. Here are the official registrations you can check:
            </p>
            <div className="space-y-3">
              <a
                href="https://www.sec.gov/Archives/edgar/data/2076856/000207685625000001/xslFormDX01/primary_doc.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-navy-dark border border-gold/10 hover:border-gold/30 transition-colors group"
              >
                <ExternalLink className="w-4 h-4 text-gold group-hover:text-gold-light" />
                <div>
                  <p className="text-white font-medium text-sm">U.S. SEC Filing</p>
                  <p className="text-white/50 text-xs">Securities and Exchange Commission</p>
                </div>
              </a>
              <a
                href="https://connectonline.asic.gov.au"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-navy-dark border border-gold/10 hover:border-gold/30 transition-colors group"
              >
                <ExternalLink className="w-4 h-4 text-gold group-hover:text-gold-light" />
                <div>
                  <p className="text-white font-medium text-sm">Australian ASIC Registry</p>
                  <p className="text-white/50 text-xs">Australian Securities & Investments Commission</p>
                </div>
              </a>
            </div>
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
