'use client';

import { motion } from 'framer-motion';
import { Radio, Clock, Bell, AlertCircle, TrendingUp, Zap } from 'lucide-react';

const signalTimes = [
  {
    time: '1:00 PM EST',
    description: 'Afternoon trading signal',
    status: 'active',
  },
  {
    time: '7:00 PM EST',
    description: 'Evening trading signal',
    status: 'active',
  },
];

const tips = [
  {
    icon: Bell,
    title: 'Set Reminders',
    description: 'Set alarms 5 minutes before signal times to prepare.',
  },
  {
    icon: AlertCircle,
    title: 'Follow Exactly',
    description: 'Execute trades exactly as instructed in the signals.',
  },
  {
    icon: TrendingUp,
    title: 'Stay Consistent',
    description: 'Trade every signal to maximize your results.',
  },
  {
    icon: Zap,
    title: 'Act Quickly',
    description: 'Signals are time-sensitive. Execute within minutes.',
  },
];

export default function SignalsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">
          Trading Signals
        </h1>
        <p className="text-white/60">
          Follow the daily signals to maximize your trading success
        </p>
      </motion.div>

      {/* Signal Times */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-navy border border-gold/20 rounded-2xl p-6 mb-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <Radio className="w-6 h-6 text-gold" />
          <h2 className="text-xl font-semibold text-white">Daily Signal Schedule</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {signalTimes.map((signal, index) => (
            <div
              key={index}
              className="bg-navy-dark border border-gold/20 rounded-xl p-6 text-center"
            >
              <Clock className="w-8 h-8 text-gold mx-auto mb-3" />
              <h3 className="text-2xl font-bold gold-gradient mb-2">{signal.time}</h3>
              <p className="text-white/60">{signal.description}</p>
              <span className="inline-block mt-3 px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full">
                Active
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Tutorial Videos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-navy border border-gold/20 rounded-2xl p-6 mb-8"
      >
        <h2 className="text-xl font-semibold text-white mb-6">How to Follow Signals</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-white mb-3">General Signal Guide</h3>
            <div className="aspect-video rounded-lg overflow-hidden bg-navy-dark">
              <iframe
                src="https://www.youtube.com/embed/yF9BGqn-JO4"
                title="General Signal Guide"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>

          <div>
            <h3 className="font-medium text-white mb-3">Bonus Signals Tutorial</h3>
            <div className="aspect-video rounded-lg overflow-hidden bg-navy-dark">
              <iframe
                src="https://www.youtube.com/embed/nbittflr6Yk"
                title="Bonus Signals Tutorial"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid md:grid-cols-2 gap-4"
      >
        {tips.map((tip, index) => (
          <div
            key={index}
            className="bg-navy border border-gold/20 rounded-xl p-5"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-gold/10 rounded-lg">
                <tip.icon className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">{tip.title}</h3>
                <p className="text-sm text-white/60">{tip.description}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Important Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 bg-gold/10 border border-gold/30 rounded-2xl p-6"
      >
        <div className="flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-gold flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-white mb-2">Important Reminder</h3>
            <p className="text-white/70">
              Trading signals are sent via Bonchat at the scheduled times. Make sure your Bonchat
              notifications are enabled and you are connected to server <strong className="text-gold">S333666</strong>.
              Contact your team leader if you miss a signal.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
