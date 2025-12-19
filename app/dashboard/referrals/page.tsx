'use client';

import { useState } from 'react';
import { Share2, Copy, Check, MessageCircle, Mail, Users, Gift, TrendingUp, Phone, Video, Heart, Lightbulb, Clock, Target, Sparkles, UserPlus } from 'lucide-react';

const shareLink = 'https://bg-wealth-sharing.vercel.app/register';

const messageTemplates = [
  // Quick & Simple
  {
    id: 'brief',
    title: 'Quick Share',
    category: 'Text',
    icon: MessageCircle,
    message: `Check this out - I've been growing my wealth with AI-powered trading through DSJEX. No experience needed. Here's the link to join: ${shareLink}`,
  },
  {
    id: 'casual',
    title: 'Casual Introduction',
    category: 'Text/DM',
    icon: MessageCircle,
    message: `Hey! I've been part of this amazing wealth-building community and thought of you. They have a partnership with DSJEX that's been helping people grow their finances through AI-powered trading. Want me to share more info?`,
  },
  {
    id: 'curiosity',
    title: 'Curiosity Hook',
    category: 'Text/DM',
    icon: Lightbulb,
    message: `Quick question - are you open to learning about a way to make your money work harder for you? I found something that's been working really well for me and thought you might be interested.`,
  },

  // Social Media
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
    id: 'story-post',
    title: 'Story-Based Post',
    category: 'Facebook/Instagram',
    icon: Sparkles,
    message: `6 months ago, I was skeptical about passive income opportunities. Then I discovered Abundant Blessing AI Trade.

What makes it different? Real AI-powered forex trading through DSJEX with transparent results. No recruiting required. No products to sell.

If you're tired of "opportunities" that don't deliver, this might be worth a look: ${shareLink}`,
  },
  {
    id: 'lifestyle',
    title: 'Lifestyle Post',
    category: 'Facebook/Instagram',
    icon: Heart,
    message: `Financial freedom isn't just about money. It's about time with family, peace of mind, and choices.

I'm building that future with Abundant Blessing AI Trade. Our team is growing and the results speak for themselves.

Ready to start your journey? ${shareLink}`,
  },

  // Professional/Email
  {
    id: 'professional',
    title: 'Professional Email',
    category: 'Email',
    icon: Mail,
    message: `Hi,

I wanted to reach out about an opportunity I've been involved with. It's a wealth-sharing program through Abundant Blessing AI Trade in partnership with DSJEX.

The program focuses on AI-powered forex trading with a proven track record. I've seen great results and thought you might be interested in learning more.

Here's where you can sign up: ${shareLink}

Let me know if you'd like to discuss further!`,
  },
  {
    id: 'detailed-email',
    title: 'Detailed Introduction',
    category: 'Email',
    icon: Mail,
    message: `Hi,

I hope this message finds you well. I wanted to share something that's been making a real difference in my financial journey.

I recently joined Abundant Blessing AI Trade, a wealth-sharing community that partners with DSJEX for AI-powered forex trading. Here's what stood out to me:

- No trading experience required (the AI handles everything)
- Transparent results and weekly updates
- Supportive community with regular training calls
- Start with any amount you're comfortable with

I know there are a lot of "opportunities" out there, but this one has actually delivered results. I'd love to answer any questions you might have.

Learn more here: ${shareLink}

Best regards`,
  },

  // Follow-ups
  {
    id: 'followup',
    title: 'Follow-Up Message',
    category: 'Text/DM',
    icon: Clock,
    message: `Hey! Just following up on that wealth-building opportunity I mentioned. Have you had a chance to check it out? Our team has a call coming up this week if you'd like to learn more. No pressure, just thought I'd check in!`,
  },
  {
    id: 'second-followup',
    title: 'Second Follow-Up',
    category: 'Text/DM',
    icon: Clock,
    message: `Hi again! I know you're busy, but I wanted to give you one more nudge about Abundant Blessing AI Trade. We just had some great results this week and I immediately thought of you. Would you be open to a quick 10-minute call to explain how it works?`,
  },

  // Specific Audiences
  {
    id: 'retirement',
    title: 'Retirement Focused',
    category: 'Text/Email',
    icon: Target,
    message: `Are you thinking about retirement and worried if you'll have enough? I was too.

I found Abundant Blessing AI Trade, and it's become a key part of my retirement strategy. The AI-powered trading through DSJEX generates consistent returns without me having to watch the markets.

Worth looking into: ${shareLink}`,
  },
  {
    id: 'sidehustle',
    title: 'Side Hustle Angle',
    category: 'Text/DM',
    icon: TrendingUp,
    message: `Looking for a side hustle that doesn't require trading your time for money?

I've been using Abundant Blessing AI Trade - their AI does the work 24/7 while I focus on my regular job and family. It's not a get-rich-quick scheme, but the steady growth has been impressive.

Check it out: ${shareLink}`,
  },
  {
    id: 'busy-parent',
    title: 'For Busy Parents',
    category: 'Text/DM',
    icon: Heart,
    message: `As a parent, I know how hard it is to find time for anything extra. That's why I love Abundant Blessing AI Trade.

No daily tasks, no products to sell, no recruiting required. The AI trading runs automatically. I just check my account and watch it grow.

Perfect for busy families: ${shareLink}`,
  },

  // Video/Call Invites
  {
    id: 'video-invite',
    title: 'Video Call Invite',
    category: 'Text/DM',
    icon: Video,
    message: `Hey! Would you be open to jumping on a quick Zoom call? I want to show you something that's been working really well for me financially. It's easier to explain than type out. Just 15-20 minutes - what do you say?`,
  },
  {
    id: 'team-call',
    title: 'Team Call Invite',
    category: 'Text/DM',
    icon: Phone,
    message: `We have a team call this week where our leaders explain how Abundant Blessing AI Trade works. It's a great way to get your questions answered without any pressure. Want me to send you the link?`,
  },

  // Objection Handlers
  {
    id: 'skeptic',
    title: 'For the Skeptic',
    category: 'Text/Email',
    icon: Lightbulb,
    message: `I get it - I was skeptical too. There are so many scams out there.

What convinced me about Abundant Blessing AI Trade was the transparency. We can see the actual trades happening through DSJEX. Real results, not just promises.

I'm not asking you to believe me. I'm asking you to look at the facts: ${shareLink}`,
  },
  {
    id: 'no-time',
    title: 'No Time Response',
    category: 'Text/DM',
    icon: Clock,
    message: `I totally understand being busy! That's actually why this works for me. Once you set it up, the AI handles everything. I spend maybe 10 minutes a week checking my account. It's truly passive income.

When you have a moment: ${shareLink}`,
  },

  // Warm Market
  {
    id: 'close-friend',
    title: 'Close Friend/Family',
    category: 'Text/Call',
    icon: Heart,
    message: `Hey, I want to share something with you because I care about you. I've been doing really well with this wealth-building program and I genuinely think it could help you too.

Can we grab coffee this week so I can explain it properly? I promise it's not one of those pyramid things. This is different.`,
  },
  {
    id: 'reconnect',
    title: 'Reconnecting',
    category: 'Text/DM',
    icon: UserPlus,
    message: `Hey! It's been a while. Hope you're doing well!

I've been involved with something exciting lately and thought of you. It's a wealth-building community called Abundant Blessing AI Trade. The results have been great and I think you'd really appreciate it.

Would love to catch up and share more: ${shareLink}`,
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
