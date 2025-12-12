'use client';

import { motion } from 'framer-motion';
import {
  Video,
  HelpCircle,
  ExternalLink,
  MessageCircle,
  Users,
  AlertCircle,
} from 'lucide-react';
import Image from 'next/image';
import { getYouTubeEmbedUrl } from '@/data/onboarding-steps';

const tutorialVideos = [
  {
    title: 'Platform Introduction',
    url: 'https://youtu.be/5ZaTrGK70iw',
    description: 'Learn the basics of navigating the DSJEX platform.',
  },
  {
    title: 'Wallet Setup Guide',
    url: 'https://youtu.be/wH89VHy9Fec',
    description: 'How to set up your crypto wallet for deposits.',
  },
  {
    title: 'Bonchat Communication',
    url: 'https://www.youtube.com/watch?v=yuYJIucjvgM',
    description: 'Setting up and using Bonchat for team communication.',
  },
  {
    title: 'Deposit & Withdrawal',
    url: 'https://youtu.be/dA42P1SNqao',
    description: 'Complete guide to managing your funds.',
  },
];

const quickLinks = [
  {
    icon: MessageCircle,
    title: 'Bonchat',
    description: 'Team communication app',
    info: 'Existing: S333666 | New (Dec 9+): BG2022',
    link: '#',
  },
  {
    icon: ExternalLink,
    title: 'DSJEX Platform',
    description: 'Trading platform',
    info: 'dsjex.com',
    link: 'https://dsjex.com',
  },
];

const faqs = [
  {
    question: 'What is the minimum investment?',
    answer: 'The minimum investment is $300 USDT.',
  },
  {
    question: 'When are trading signals sent?',
    answer: 'Trading signals are sent daily at 1:00 PM EST and 7:00 PM EST via Bonchat.',
  },
  {
    question: 'How do I contact support?',
    answer: 'Contact Lee Meadows or your team admin via Bonchat. Existing members use S333666, new members (Dec 9, 2025+) use BG2022 with admins Elena03 or Stephen03.',
  },
  {
    question: 'What wallet types are accepted?',
    answer: 'We accept USDT on both TRC20 (Tron) and ERC20 (Ethereum) networks.',
  },
  {
    question: 'How do I withdraw profits?',
    answer: 'Withdrawals can be made through the DSJEX platform to your connected crypto wallet.',
  },
];

export default function ResourcesPage() {
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
          Resources
        </h1>
        <p className="text-white/60">
          Tutorials, guides, and helpful information
        </p>
      </motion.div>

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid md:grid-cols-2 gap-4 mb-8"
      >
        {quickLinks.map((link, index) => (
          <a
            key={index}
            href={link.link}
            target={link.link !== '#' ? '_blank' : undefined}
            rel={link.link !== '#' ? 'noopener noreferrer' : undefined}
            className="bg-navy border border-gold/20 rounded-xl p-5 hover:border-gold/40 transition-colors group"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gold/10 rounded-xl group-hover:bg-gold/20 transition-colors">
                <link.icon className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">{link.title}</h3>
                <p className="text-sm text-white/60 mb-2">{link.description}</p>
                <span className="text-gold text-sm font-medium">{link.info}</span>
              </div>
            </div>
          </a>
        ))}
      </motion.div>

      {/* Tutorial Videos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-navy border border-gold/20 rounded-2xl p-6 mb-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <Video className="w-6 h-6 text-gold" />
          <h2 className="text-xl font-semibold text-white">Tutorial Videos</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {tutorialVideos.map((video, index) => {
            const embedUrl = getYouTubeEmbedUrl(video.url);
            return (
              <div key={index} className="bg-navy-dark rounded-xl overflow-hidden border border-gold/10">
                <div className="aspect-video">
                  <iframe
                    src={embedUrl}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white mb-1">{video.title}</h3>
                  <p className="text-sm text-white/60">{video.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>


      {/* Team & Guides Gallery */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.28 }}
        className="bg-navy border border-gold/20 rounded-2xl p-6 mb-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-6 h-6 text-gold" />
          <div>
            <h2 className="text-xl font-semibold text-white">Team & Guides</h2>
            <p className="text-white/60 text-sm">Meet the team and helpful visual guides</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-navy-dark rounded-xl overflow-hidden border border-gold/10">
            <Image
              src="/images/bg/agent-team.png"
              alt="BG Agent Team"
              width={600}
              height={400}
              className="w-full h-auto"
            />
            <div className="p-4">
              <h3 className="font-semibold text-white">Our Agent Team</h3>
              <p className="text-sm text-white/60">The leadership supporting your success</p>
            </div>
          </div>
          <div className="bg-navy-dark rounded-xl overflow-hidden border border-gold/10">
            <Image
              src="/images/bg/transaction-fails.png"
              alt="Transaction Troubleshooting"
              width={600}
              height={400}
              className="w-full h-auto"
            />
            <div className="p-4">
              <h3 className="font-semibold text-white">Transaction Troubleshooting</h3>
              <p className="text-sm text-white/60">What to do if a transaction fails</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* FAQs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-navy border border-gold/20 rounded-2xl p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="w-6 h-6 text-gold" />
          <h2 className="text-xl font-semibold text-white">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-navy-dark border border-gold/10 rounded-xl p-4"
            >
              <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
              <p className="text-white/60">{faq.answer}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Bonchat Server Update Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="mt-8 bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6"
      >
        <div className="flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-white mb-2">Bonchat Server Update (Dec 9, 2025)</h3>
            <p className="text-white/70 mb-3">
              Starting December 9, 2025, all <strong className="text-white">NEW MEMBERS</strong> will log into Bonchat using:
            </p>
            <div className="bg-navy rounded-lg p-4 border border-blue-500/20">
              <p className="text-blue-400 font-semibold mb-2">Server ID: BG2022</p>
              <p className="text-white/60 text-sm">Admins: Elena03, Stephen03</p>
            </div>
            <p className="text-green-400 text-sm mt-3 font-medium">
              ✓ Existing members DO NOT need to change
            </p>
          </div>
        </div>
      </motion.div>

      {/* Contact Support */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/30 rounded-2xl p-6 text-center"
      >
        <MessageCircle className="w-10 h-10 text-gold mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Need More Help?</h3>
        <p className="text-white/70 max-w-md mx-auto mb-4">
          Connect with your team leader or admin through Bonchat for personalized assistance.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <div className="px-4 py-2 bg-navy rounded-lg border border-gold/30">
            <span className="text-white/60 text-sm">Existing Members:</span>
            <span className="text-gold font-semibold ml-2">S333666</span>
          </div>
          <div className="px-4 py-2 bg-navy rounded-lg border border-blue-500/30">
            <span className="text-white/60 text-sm">New Members:</span>
            <span className="text-blue-400 font-semibold ml-2">BG2022</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
