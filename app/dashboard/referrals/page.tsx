'use client';

import { useState } from 'react';
import { Share2, Copy, Check, MessageCircle, Mail, Users, Gift, TrendingUp } from 'lucide-react';

const shareLink = 'https://bg-wealth-sharing.vercel.app/register';

const messageTemplates = [
  {
    id: 'casual',
    title: 'Casual Introduction',
    category: 'Text/DM',
    icon: MessageCircle,
    message: `Hey! I've been part of this amazing wealth-building community and thought of you. They have a partnership with DSJEX that's been helping people grow their finances through AI-powered trading. Want me to share more info?`,
  },
  {
    id: 'professional',
    title: 'Professional Approach',
    category: 'Email',
    icon: Mail,
    message: `Hi,

I wanted to reach out about an opportunity I've been involved with. It's a wealth-sharing program through Abundant Blessing AI Trade in partnership with DSJEX.

The program focuses on AI-powered forex trading with a proven track record. I've seen great results and thought you might be interested in learning more.

Here's where you can sign up: ${shareLink}

Let me know if you'd like to discuss further!`,
  },
  {
    id: 'social',
    title: 'Social Media Post',
    category: 'Facebook/Instagram',
    icon: Users,
    message: `Looking for a way to grow your wealth? I joined Abundant Blessing AI Trade and it's been a game-changer!

Their partnership with DSJEX uses AI-powered trading that works 24/7. Best part? You don't need trading experience.

DM me if you want to learn more! Or visit: ${shareLink}`,
  },
  {
    id: 'brief',
    title: 'Quick Share',
    category: 'Text',
    icon: MessageCircle,
    message: `Check this out - I've been growing my wealth with AI-powered trading through DSJEX. No experience needed. Here's the link to join: ${shareLink}`,
  },
];

export default function ReferralsPage() {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);

  const copyToClipboard = async (text: string, type: 'link' | 'template', templateId?: string) => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'link') {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      } else {
        setCopiedTemplate(templateId || null);
        setTimeout(() => setCopiedTemplate(null), 2000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Share & Earn</h1>
        <p className="text-white/60">
          Invite friends and family to join our wealth-building community
        </p>
      </div>

      {/* Share Link Card */}
      <div className="bg-gradient-to-br from-gold/20 to-gold/5 rounded-2xl p-6 border border-gold/30">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center">
            <Share2 className="w-6 h-6 text-gold" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white mb-2">Your Share Link</h2>
            <p className="text-white/60 text-sm mb-4">
              Share this link with anyone interested in joining our community
            </p>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-navy-dark/50 rounded-lg px-4 py-3 border border-white/10">
                <p className="text-white/80 font-mono text-sm truncate">{shareLink}</p>
              </div>
              <button
                onClick={() => copyToClipboard(shareLink, 'link')}
                className={`px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  copiedLink
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-gold text-navy-dark hover:bg-gold-light'
                }`}
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-navy border border-gold/20 rounded-xl p-5">
          <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mb-3">
            <Gift className="w-5 h-5 text-gold" />
          </div>
          <h3 className="text-white font-semibold mb-1">Help Others Prosper</h3>
          <p className="text-white/50 text-sm">
            Share the opportunity with friends and family who want financial growth
          </p>
        </div>
        <div className="bg-navy border border-gold/20 rounded-xl p-5">
          <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mb-3">
            <Users className="w-5 h-5 text-gold" />
          </div>
          <h3 className="text-white font-semibold mb-1">Build Community</h3>
          <p className="text-white/50 text-sm">
            Grow our team and create a network of like-minded wealth builders
          </p>
        </div>
        <div className="bg-navy border border-gold/20 rounded-xl p-5">
          <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mb-3">
            <TrendingUp className="w-5 h-5 text-gold" />
          </div>
          <h3 className="text-white font-semibold mb-1">Win Together</h3>
          <p className="text-white/50 text-sm">
            Everyone benefits when we grow together as a team
          </p>
        </div>
      </div>

      {/* Message Templates */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Message Templates</h2>
        <p className="text-white/60 text-sm mb-6">
          Use these pre-written messages to share the opportunity. Click to copy.
        </p>
        <div className="grid gap-4">
          {messageTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-navy border border-gold/20 rounded-xl p-5 hover:border-gold/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                    <template.icon className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{template.title}</h3>
                    <p className="text-gold/60 text-xs">{template.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(template.message, 'template', template.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                    copiedTemplate === template.id
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-gold/10 text-gold hover:bg-gold/20 border border-gold/30'
                  }`}
                >
                  {copiedTemplate === template.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <p className="text-white/70 text-sm whitespace-pre-line leading-relaxed">
                {template.message}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-navy border border-gold/20 rounded-xl p-6">
        <h2 className="text-lg font-bold text-white mb-4">Sharing Tips</h2>
        <ul className="space-y-3 text-white/70 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-gold mt-0.5">1.</span>
            <span>Start with people who have shown interest in financial growth</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gold mt-0.5">2.</span>
            <span>Share your personal experience and results</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gold mt-0.5">3.</span>
            <span>Be genuine and answer questions honestly</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gold mt-0.5">4.</span>
            <span>Follow up with those who express interest</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gold mt-0.5">5.</span>
            <span>Invite them to team calls and meetings</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
