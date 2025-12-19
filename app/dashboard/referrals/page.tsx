'use client';

import { useState } from 'react';
import { Copy, Check, MessageCircle, Mail, Users, Gift, TrendingUp, Phone, Video, Heart, Lightbulb, Clock, Target, Sparkles, UserPlus } from 'lucide-react';

const messageTemplates = [
  // Quick & Simple
  {
    id: 'quick-intro',
    title: 'Quick Intro',
    category: 'Text',
    icon: MessageCircle,
    message: `Hey! I started a simple side hustle. Just copy and paste for about 10 minutes a day and make extra income. Interested?`,
  },
  {
    id: 'casual',
    title: 'Casual Message',
    category: 'Text/DM',
    icon: MessageCircle,
    message: `Hey! Quick question - would you be open to making some extra money on the side? I found something super simple. Just 10 minutes a day, copy and paste. Let me know if you want details!`,
  },
  {
    id: 'curiosity',
    title: 'Curiosity Hook',
    category: 'Text/DM',
    icon: Lightbulb,
    message: `What if I told you that you could make extra income with just 10 minutes a day? No experience needed. Just copy and paste. Sound too good to be true? Let me explain.`,
  },

  // Social Media
  {
    id: 'social-post',
    title: 'Social Media Post',
    category: 'Facebook/Instagram',
    icon: Users,
    message: `Looking for a simple way to make extra money?

I spend about 10 minutes a day doing simple copy and paste tasks and earn extra income on the side.

No special skills needed. No selling. No inventory.

DM me "INFO" if you want to know more!`,
  },
  {
    id: 'story-post',
    title: 'Story-Based Post',
    category: 'Facebook/Instagram',
    icon: Sparkles,
    message: `I used to think side hustles had to be complicated or time-consuming.

Then I found something that takes just 10 minutes a day. Simple copy and paste work that actually pays.

If you're looking for extra income without the hassle, drop a comment or DM me!`,
  },
  {
    id: 'lifestyle',
    title: 'Lifestyle Post',
    category: 'Facebook/Instagram',
    icon: Heart,
    message: `What would an extra income stream mean for you?

For me, it's peace of mind. And the best part? It only takes 10 minutes a day.

Simple copy and paste. No complicated stuff.

Message me if you want to learn how!`,
  },

  // Professional/Email
  {
    id: 'professional',
    title: 'Professional Email',
    category: 'Email',
    icon: Mail,
    message: `Hi,

I wanted to reach out about a simple side income opportunity I've been doing.

It's straightforward copy and paste work that takes about 10 minutes a day. Nothing complicated, no special skills required.

I've been seeing good results and thought you might be interested in learning more.

Let me know if you'd like details!`,
  },
  {
    id: 'detailed-email',
    title: 'Detailed Introduction',
    category: 'Email',
    icon: Mail,
    message: `Hi,

I hope you're doing well! I wanted to share something that's been working great for me.

I started doing this simple side hustle a few months ago. Here's what I love about it:

- Only takes about 10 minutes a day
- Simple copy and paste tasks
- No experience or special skills needed
- Work from your phone or computer
- Earn extra income on the side

If you're looking for a way to make some extra money without a huge time commitment, I think this could be perfect for you.

Would you like me to explain how it works?`,
  },

  // Follow-ups
  {
    id: 'followup',
    title: 'Follow-Up Message',
    category: 'Text/DM',
    icon: Clock,
    message: `Hey! Just checking in. Did you have a chance to think about that side income opportunity I mentioned? It's really just 10 minutes a day of copy and paste. Happy to answer any questions!`,
  },
  {
    id: 'second-followup',
    title: 'Second Follow-Up',
    category: 'Text/DM',
    icon: Clock,
    message: `Hi again! I know you're busy, but I wanted to follow up one more time. The copy and paste side hustle has been going really well for me. Just 10 minutes a day. Would you be open to a quick call so I can explain?`,
  },

  // Specific Audiences
  {
    id: 'busy-professional',
    title: 'For Busy Professionals',
    category: 'Text/Email',
    icon: Target,
    message: `I know you're super busy with work, so I'll keep this short.

I found a way to make extra income with just 10 minutes a day. Simple copy and paste. You can do it on your lunch break or before bed.

Want me to share more?`,
  },
  {
    id: 'sidehustle',
    title: 'Side Hustle Seeker',
    category: 'Text/DM',
    icon: TrendingUp,
    message: `Still looking for a good side hustle?

I've been doing one that's actually legit. Just copy and paste for about 10 minutes a day. No selling, no recruiting pressure, no inventory.

Let me know if you want the details!`,
  },
  {
    id: 'busy-parent',
    title: 'For Busy Parents',
    category: 'Text/DM',
    icon: Heart,
    message: `As a busy parent, I know time is precious. That's why I love this.

10 minutes a day. Copy and paste. Extra income.

I do it while the kids are doing homework or after they go to bed. Simple as that.

Interested?`,
  },
  {
    id: 'student',
    title: 'For Students',
    category: 'Text/DM',
    icon: Lightbulb,
    message: `Hey! Looking for a way to make some extra cash without it taking over your life?

I've been doing this simple copy and paste thing. Takes like 10 minutes a day and you can do it from your phone.

Perfect for students. Want to know more?`,
  },

  // Video/Call Invites
  {
    id: 'video-invite',
    title: 'Video Call Invite',
    category: 'Text/DM',
    icon: Video,
    message: `Hey! Would you have 10 minutes for a quick call? I want to show you this simple side income I've been doing. It's easier to explain than type out. Just copy and paste work, nothing complicated.`,
  },
  {
    id: 'team-call',
    title: 'Team Call Invite',
    category: 'Text/DM',
    icon: Phone,
    message: `We have a quick info call this week where they explain how the copy and paste system works. Only takes about 15 minutes. Want me to send you the details?`,
  },

  // Objection Handlers
  {
    id: 'skeptic',
    title: 'For the Skeptic',
    category: 'Text/Email',
    icon: Lightbulb,
    message: `I get it, there are a lot of scams out there. I was skeptical too.

But this is literally just copy and paste work. 10 minutes a day. Nothing weird, no pyramid stuff.

I can show you exactly what I do if you want to see for yourself.`,
  },
  {
    id: 'no-time',
    title: 'No Time Response',
    category: 'Text/DM',
    icon: Clock,
    message: `I totally get it, everyone's busy! That's exactly why I love this. It's literally just 10 minutes a day. You can do it while waiting in line, on your lunch break, wherever.

Simple copy and paste. That's it.`,
  },
  {
    id: 'too-good',
    title: 'Sounds Too Good Response',
    category: 'Text/DM',
    icon: Lightbulb,
    message: `I know it sounds almost too simple, right? But that's what I love about it.

It's not going to make you a millionaire overnight. But for 10 minutes of copy and paste a day, the extra income adds up.

Want me to walk you through it?`,
  },

  // Warm Market
  {
    id: 'close-friend',
    title: 'Close Friend/Family',
    category: 'Text/Call',
    icon: Heart,
    message: `Hey! I've been doing this simple side thing and thought of you. It's just copy and paste, takes about 10 minutes a day, and actually pays.

Can we chat this week? I think you'd really like it.`,
  },
  {
    id: 'reconnect',
    title: 'Reconnecting',
    category: 'Text/DM',
    icon: UserPlus,
    message: `Hey! It's been a while. Hope you're doing well!

I've been doing this simple side hustle lately. Just 10 minutes a day of copy and paste work for extra income. Thought of you because I know you're always looking for smart ways to earn.

Want to hear about it?`,
  },
];

export default function ReferralsPage() {
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);

  const copyToClipboard = async (text: string, templateId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedTemplate(templateId);
      setTimeout(() => setCopiedTemplate(null), 2000);
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
          Copy and paste these scripts to share the opportunity with others
        </p>
      </div>

      {/* Key Message Card */}
      <div className="bg-gradient-to-br from-gold/20 to-gold/5 rounded-2xl p-6 border border-gold/30">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-3">The Simple Message</h2>
          <p className="text-xl text-gold font-medium mb-2">
            "Copy and paste, 10 minutes a day, extra income on the side"
          </p>
          <p className="text-white/60 text-sm">
            Keep it simple. That's all they need to know to get interested.
          </p>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-navy border border-gold/20 rounded-xl p-5">
          <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mb-3">
            <Clock className="w-5 h-5 text-gold" />
          </div>
          <h3 className="text-white font-semibold mb-1">Just 10 Minutes</h3>
          <p className="text-white/50 text-sm">
            Simple copy and paste tasks that fit into anyone's schedule
          </p>
        </div>
        <div className="bg-navy border border-gold/20 rounded-xl p-5">
          <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mb-3">
            <Gift className="w-5 h-5 text-gold" />
          </div>
          <h3 className="text-white font-semibold mb-1">Extra Income</h3>
          <p className="text-white/50 text-sm">
            Help others earn on the side with minimal effort
          </p>
        </div>
        <div className="bg-navy border border-gold/20 rounded-xl p-5">
          <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mb-3">
            <Users className="w-5 h-5 text-gold" />
          </div>
          <h3 className="text-white font-semibold mb-1">Grow Together</h3>
          <p className="text-white/50 text-sm">
            Build your team and help others achieve their goals
          </p>
        </div>
      </div>

      {/* Message Templates */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Message Scripts</h2>
        <p className="text-white/60 text-sm mb-6">
          Click any script to copy it. Customize as needed for your style.
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
                  onClick={() => copyToClipboard(template.message, template.id)}
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
            <span>Keep it simple. "Copy and paste, 10 minutes a day, extra income."</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gold mt-0.5">2.</span>
            <span>Don't over-explain. Let them ask questions.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gold mt-0.5">3.</span>
            <span>Share your own experience and results.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gold mt-0.5">4.</span>
            <span>Follow up with interested people within 24-48 hours.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gold mt-0.5">5.</span>
            <span>Invite them to a call or meeting to learn more.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
