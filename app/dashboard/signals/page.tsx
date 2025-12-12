'use client';

import { motion } from 'framer-motion';
import { Radio, Clock, Bell, AlertCircle, TrendingUp, Zap, Users, Video, MessageSquare, Megaphone } from 'lucide-react';
import Image from 'next/image';

const meetingSchedule = [
  {
    title: 'BG Newcomers',
    icon: Users,
    color: 'purple',
    description: 'Training & basic guidance for new members',
    schedule: 'Monday - Friday | 5:00 PM EST',
    note: 'You will be invited to this group',
  },
  {
    title: 'BG Agent Conference',
    icon: TrendingUp,
    color: 'blue',
    description: 'Business & strategy updates',
    schedule: 'Tuesday, Thursday, Saturday | 5:00 PM EST',
    note: 'For members Level 1 and above',
  },
  {
    title: 'BG Family Meeting',
    icon: MessageSquare,
    color: 'green',
    description: 'Chat only (text messages, not Zoom)',
    schedule: 'Monday & Friday | 8:00 PM EST',
    note: 'BG Family groups: 111 / 222 / 333 / 444 / 555',
  },
  {
    title: 'Live Zoom with the Professor',
    icon: Video,
    color: 'red',
    description: 'Live teaching & market overview',
    schedule: 'Every Sunday | 8:00 PM EST',
    note: 'Zoom link shared before meeting',
  },
  {
    title: 'BG 015',
    icon: Radio,
    color: 'gold',
    description: 'Receive daily trading codes',
    schedule: 'Daily',
    note: 'Follow instructions carefully',
  },
  {
    title: 'BG Notification',
    icon: Megaphone,
    color: 'cyan',
    description: 'Official announcements',
    schedule: 'As needed',
    note: 'Latest updates from BG assistant',
  },
];

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

const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400' },
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
  green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400' },
  red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400' },
  gold: { bg: 'bg-gold/10', border: 'border-gold/30', text: 'text-gold' },
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400' },
};

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
          Meetings & Signals
        </h1>
        <p className="text-white/60">
          Stay connected with all BG meetings and daily trading signals
        </p>
      </motion.div>

      {/* Meeting & Activity Schedule */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-navy border border-gold/20 rounded-2xl p-6 mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-gold" />
            <h2 className="text-xl font-semibold text-white">Meeting & Activity Schedule</h2>
          </div>
          <span className="text-xs text-white/40 bg-white/5 px-2 py-1 rounded">All times EST</span>
        </div>

        <div className="grid gap-4">
          {meetingSchedule.map((meeting, index) => {
            const colors = colorClasses[meeting.color];
            const IconComponent = meeting.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`${colors.bg} ${colors.border} border rounded-xl p-4`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${colors.bg}`}>
                    <IconComponent className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white mb-1">{meeting.title}</h3>
                    <p className="text-white/60 text-sm mb-2">{meeting.description}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`${colors.text} text-sm font-medium`}>{meeting.schedule}</span>
                      <span className="text-white/40">•</span>
                      <span className="text-white/50 text-sm">{meeting.note}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className="text-center text-gold text-sm mt-6 font-medium">
          Save & pin this schedule so you never miss a BG meeting
        </p>
      </motion.div>

      {/* Signal Times */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-navy border border-gold/20 rounded-2xl p-6 mb-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <Radio className="w-6 h-6 text-gold" />
          <h2 className="text-xl font-semibold text-white">Daily Trading Signals</h2>
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
                src="https://www.youtube.com/embed/nbittfIr6Yk"
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
            <p className="text-white/70 mb-3">
              Trading signals are sent via Bonchat at the scheduled times. Make sure your Bonchat
              notifications are enabled. Contact your team leader if you miss a signal.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <span className="text-white/60 text-sm">Your Bonchat Server:</span>
              <span className="text-gold font-semibold text-sm">Existing Members: S333666</span>
              <span className="text-white/40 hidden sm:inline">|</span>
              <span className="text-blue-400 font-semibold text-sm">New Members (Dec 9+): BG2022</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
