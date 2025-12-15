'use client';

import { motion } from 'framer-motion';
import { Handshake, Building2, Users, ChevronRight } from 'lucide-react';

const tripartiteModel = [
  {
    icon: Users,
    title: 'Investors',
    description: 'Individual investors who join the platform and contribute capital.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Building2,
    title: 'BG Group',
    description: 'The management team that oversees operations and ensures platform integrity.',
    color: 'from-gold to-gold-dark',
  },
  {
    icon: Handshake,
    title: 'DSJEX',
    description: 'The trading platform partner that executes profitable trading strategies.',
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
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            The <span className="gold-gradient">Win-Win-Win</span> Model
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Our tripartite model ensures that everyone involved benefits from the success of the platform.
          </p>
        </motion.div>

        {/* Tripartite Model Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {tripartiteModel.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-navy border border-gold/20 rounded-2xl p-6 hover:border-gold/40 transition-colors">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${item.color} mb-4`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-white/60">{item.description}</p>
              </div>

              {/* Connector arrows */}
              {index < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <ChevronRight className="w-6 h-6 text-gold/50" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Explanation Videos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Learn More About the Project
          </h3>
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
                <h4 className="font-semibold text-white">Project Introduction</h4>
                <p className="text-sm text-white/60 mt-1">
                  Learn about the BG Wealth Sharing opportunity and how it works.
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
                <h4 className="font-semibold text-white">How to Get Started</h4>
                <p className="text-sm text-white/60 mt-1">
                  Step-by-step guide to joining Abundant Blessing AI Trade.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
