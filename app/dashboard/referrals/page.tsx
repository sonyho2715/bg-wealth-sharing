'use client';

import { useState } from 'react';
import { Copy, Check, MessageCircle, Mail, Users, Gift, Clock, Target, Sparkles, UserPlus, Phone, Video, Heart, Lightbulb, TrendingUp, Zap, DollarSign, Coffee, Smartphone, GraduationCap, Briefcase, Home, AlertCircle, HelpCircle, RefreshCw, Flame, Crown, Shield, Rocket, Brain, Star, Award, Key } from 'lucide-react';

type Category =
  | 'all'
  | 'quick'
  | 'social'
  | 'email'
  | 'followup'
  | 'audiences'
  | 'calls'
  | 'objections'
  | 'warm'
  | 'power'
  | 'reframe'
  | 'closing';

const categories: { id: Category; label: string; icon: React.ElementType }[] = [
  { id: 'all', label: 'All Scripts', icon: Zap },
  { id: 'power', label: 'Power Scripts', icon: Flame },
  { id: 'reframe', label: 'Reframes', icon: Brain },
  { id: 'closing', label: 'Closing Scripts', icon: Crown },
  { id: 'quick', label: 'Quick & Simple', icon: MessageCircle },
  { id: 'social', label: 'Social Media', icon: Users },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'followup', label: 'Follow-Ups', icon: RefreshCw },
  { id: 'audiences', label: 'Specific Audiences', icon: Target },
  { id: 'calls', label: 'Call Invites', icon: Phone },
  { id: 'objections', label: 'Objection Handlers', icon: AlertCircle },
  { id: 'warm', label: 'Warm Market', icon: Heart },
];

const messageTemplates = [
  // Power Scripts - High Impact Openers
  {
    id: 'power-future-pace',
    title: 'Future Vision',
    category: 'power',
    platform: 'Text/DM',
    icon: Rocket,
    message: `Imagine looking back 6 months from now, knowing you started something simple that's been paying you every week. That's exactly where I am right now.

10 minutes a day. Copy and paste. The only question is whether you'll wish you started today.

Want to see how it works?`,
  },
  {
    id: 'power-contrast',
    title: 'The Real Cost',
    category: 'power',
    platform: 'Text/DM',
    icon: Flame,
    message: `Here's something most people don't think about:

You're already spending way more than 10 minutes a day scrolling, watching TV, or waiting around. The difference? That time costs you nothing... but it also pays you nothing.

What if those same 10 minutes actually put money in your pocket?

That's what I've been doing. Simple copy and paste. Want me to show you?`,
  },
  {
    id: 'power-certainty',
    title: 'When You Start',
    category: 'power',
    platform: 'Text/DM',
    icon: Star,
    message: `When you start doing this, you'll probably wonder why you didn't do it sooner. That's what happened to me.

10 minutes a day. Copy and paste. Extra income that adds up faster than you'd expect.

The people who try it get it immediately. Want to be one of them?`,
  },
  {
    id: 'power-identity',
    title: 'Who This Is For',
    category: 'power',
    platform: 'Text/DM',
    icon: Crown,
    message: `This isn't for everyone. It's for people who:

- Actually follow through on things
- Value their time
- Want results without the fluff

If that sounds like you, I've got something simple. 10 minutes a day, copy and paste, real income.

Should I share the details?`,
  },
  {
    id: 'power-logic',
    title: 'Simple Math',
    category: 'power',
    platform: 'Text/DM',
    icon: Brain,
    message: `Let me break this down simply:

10 minutes a day = 70 minutes a week
That's barely over an hour
For extra income that keeps growing

You probably spend more time than that deciding what to watch on Netflix.

The difference is this actually pays you. Copy and paste work. Want to know more?`,
  },
  {
    id: 'power-outcome',
    title: 'What Actually Happens',
    category: 'power',
    platform: 'Text/DM',
    icon: Target,
    message: `Here's what actually happens when you start this:

Day 1: You learn the simple copy paste process
Week 1: It becomes automatic, takes 10 minutes
Month 1: You're making extra income consistently

No guessing. No complicated systems. Just results.

Want me to walk you through it?`,
  },
  {
    id: 'power-transformation',
    title: 'Before & After',
    category: 'power',
    platform: 'Text/DM',
    icon: Sparkles,
    message: `Before: Scrolling social media, wondering how to make extra money
After: Spending those same 10 minutes on simple copy paste work that actually pays

Same time investment. Completely different outcome.

Which version would you rather be living?`,
  },
  {
    id: 'power-risk-reversal',
    title: 'Nothing to Lose',
    category: 'power',
    platform: 'Text/DM',
    icon: Shield,
    message: `Worst case: You spend 10 minutes learning something that doesn't click for you.

Best case: You find a simple way to make extra income that works around your schedule.

Either way, you'll know. And knowing beats wondering.

Want me to show you how it works?`,
  },
  {
    id: 'power-pattern-interrupt',
    title: 'Different Question',
    category: 'power',
    platform: 'Text/DM',
    icon: Lightbulb,
    message: `Everyone asks "Is this legit?" or "Does it actually work?"

Better question: "What would I do with extra income every week?"

Because once you know HOW simple this is, the only thing left is deciding what to do with the money.

10 minutes a day. Copy and paste. Want to see it?`,
  },
  {
    id: 'power-social-proof',
    title: 'What Others Found',
    category: 'power',
    platform: 'Text/DM',
    icon: Users,
    message: `The people who start this usually say the same thing:

"Why didn't I do this sooner?"

Not because it made them rich overnight. But because it's so simple they can't believe they waited.

10 minutes. Copy and paste. Extra income.

Ready to see what everyone's talking about?`,
  },
  {
    id: 'power-specificity',
    title: 'Exactly What Happens',
    category: 'power',
    platform: 'Text/DM',
    icon: Key,
    message: `Here's exactly what you'd be doing:

1. Open your phone (2 min)
2. Copy the message I give you (1 min)
3. Paste it where I show you (2 min)
4. Repeat a few times (5 min)

That's it. That's the whole "system."

No courses. No complicated funnels. Just copy, paste, earn.

Want the details?`,
  },
  {
    id: 'power-urgency',
    title: 'Time Is Moving',
    category: 'power',
    platform: 'Text/DM',
    icon: Clock,
    message: `A year from now, you'll have spent thousands of hours doing... something.

The question isn't whether you have 10 minutes a day. You do.

The question is whether those 10 minutes will be working FOR you or just passing by.

This is simple copy and paste work that pays. Want in?`,
  },

  // Reframe Scripts - Handling Objections Differently
  {
    id: 'reframe-time',
    title: 'Time Reframe',
    category: 'reframe',
    platform: 'Text/DM',
    icon: Clock,
    message: `"I don't have time" - I used to say that too.

Then I realized I wasn't saying "I don't have time." I was saying "It's not a priority."

And that was true... until I saw how little time this actually takes.

10 minutes while drinking your morning coffee. That's it.

Is making extra income worth one coffee break?`,
  },
  {
    id: 'reframe-money',
    title: 'Money Reframe',
    category: 'reframe',
    platform: 'Text/DM',
    icon: DollarSign,
    message: `"I don't have money to start things"

Interesting. That's exactly WHY this makes sense.

If you had unlimited money, you wouldn't need extra income.

The fact that money is tight is the exact reason to spend 10 minutes a day on something that brings more in.

Make sense?`,
  },
  {
    id: 'reframe-skeptic',
    title: 'Skepticism Reframe',
    category: 'reframe',
    platform: 'Text/DM',
    icon: Brain,
    message: `You're skeptical. Good. You should be.

That skepticism has probably saved you from actual scams.

But here's the thing - being skeptical and being closed are different.

Skeptical means you want proof. I can show you that.
Closed means you won't look. That would cost you.

Which one are you?`,
  },
  {
    id: 'reframe-tried-before',
    title: 'Past Failure Reframe',
    category: 'reframe',
    platform: 'Text/DM',
    icon: RefreshCw,
    message: `"I've tried things before that didn't work"

Perfect. That means you've been looking for something.

The things that didn't work taught you what to avoid.

This is different - simpler. Copy and paste. 10 minutes.

Maybe those "failures" were just leading you to something that actually works?`,
  },
  {
    id: 'reframe-too-simple',
    title: 'Simplicity Reframe',
    category: 'reframe',
    platform: 'Text/DM',
    icon: Lightbulb,
    message: `"It sounds too simple"

Isn't that what you want though?

We've been trained to think valuable things must be complicated.

But the best things in life ARE simple. This is one of them.

Copy. Paste. Get paid. 10 minutes a day.

Simple doesn't mean it doesn't work. Simple means it actually does.`,
  },
  {
    id: 'reframe-age',
    title: 'Age Reframe',
    category: 'reframe',
    platform: 'Text/DM',
    icon: Award,
    message: `"I'm too old for this" or "I'm too young for this"

Here's what's interesting - everyone says one or the other.

The truth? If you can copy and paste on a phone, you can do this.

Age isn't the question. The question is: do you want extra income?

If yes, you're exactly the right age to start.`,
  },
  {
    id: 'reframe-busy',
    title: 'Busy Life Reframe',
    category: 'reframe',
    platform: 'Text/DM',
    icon: Briefcase,
    message: `"My life is too busy right now"

I hear you. But let me ask you something...

When will life NOT be busy?

Busy people are actually the best at this because they know how to use small pockets of time.

10 minutes. That's one bathroom break. One commercial break. One waiting-in-line moment.

The busy excuse is actually the best reason TO do it.`,
  },
  {
    id: 'reframe-family',
    title: 'Family Reframe',
    category: 'reframe',
    platform: 'Text/DM',
    icon: Home,
    message: `"I need to focus on my family"

That's exactly why this makes sense.

What does extra income mean for your family? Less stress? More options? Better future?

And it only takes 10 minutes away from them. You probably spend more time than that on things that give nothing back.

This gives back. For them.`,
  },
  {
    id: 'reframe-not-salesy',
    title: 'Sales Reframe',
    category: 'reframe',
    platform: 'Text/DM',
    icon: MessageCircle,
    message: `"I'm not good at sales"

Good news: this isn't sales.

Copy and paste. That's the whole thing. No pitching. No convincing. No rejection.

If you can send a text message, you can do this.

The "sales" part is already done for you. You just copy it.`,
  },
  {
    id: 'reframe-tech',
    title: 'Tech Reframe',
    category: 'reframe',
    platform: 'Text/DM',
    icon: Smartphone,
    message: `"I'm not tech savvy"

Can you copy text?
Can you paste text?

Congratulations, you have all the tech skills you need.

This isn't coding or complicated software. It's literally the same thing you do when you forward a funny meme to a friend.

10 minutes a day. Extra income. That simple.`,
  },
  {
    id: 'reframe-compare',
    title: 'Comparison Reframe',
    category: 'reframe',
    platform: 'Text/DM',
    icon: Target,
    message: `Think about other ways to make extra money:

Second job: 20+ hours/week, boss, schedule
Uber/delivery: Car costs, wear and tear, unpredictable
Selling stuff: Inventory, shipping, customer service

This: 10 minutes, copy paste, from your couch

Not saying those are bad. But if you're comparing... this is different.`,
  },

  // Closing Scripts - Getting to Yes
  {
    id: 'close-assumptive',
    title: 'Easy Next Step',
    category: 'closing',
    platform: 'Text/DM',
    icon: Crown,
    message: `So here's what happens next:

I'll send you a quick overview - takes 5 minutes to watch.

After that, you'll know if this is for you. Most people know right away.

Should I send it now or later today?`,
  },
  {
    id: 'close-choice',
    title: 'Two Options',
    category: 'closing',
    platform: 'Text/DM',
    icon: Key,
    message: `At this point, you really have two choices:

1. Keep doing what you're doing (which is fine)
2. Try something simple that might add extra income

Neither is wrong. But only one has upside.

Want to see the 5-minute overview?`,
  },
  {
    id: 'close-summary',
    title: 'Quick Recap',
    category: 'closing',
    platform: 'Text/DM',
    icon: Star,
    message: `Let me make sure we're on the same page:

- You want extra income (who doesn't)
- You have 10 minutes a day (everyone does)
- You can copy and paste (you're doing it right now)

The only thing missing is you saying "show me."

So... should I show you?`,
  },
  {
    id: 'close-urgency-soft',
    title: 'Gentle Urgency',
    category: 'closing',
    platform: 'Text/DM',
    icon: Clock,
    message: `I'm not going to pressure you. This will still be here tomorrow.

But here's what I know: the people who say "let me think about it" usually mean "I'll forget about it."

And then nothing changes.

If you're even a little curious, let me send you the info now while it's fresh. Deal?`,
  },
  {
    id: 'close-fear-address',
    title: "What's Really Stopping You",
    category: 'closing',
    platform: 'Text/DM',
    icon: Shield,
    message: `Can I be real with you?

Most people who hesitate aren't worried about the 10 minutes. They're worried about being disappointed again.

I get it. But disappointment comes from complicated things that over-promise.

This is simple. Copy, paste, earn. The bar is so low you can't really fail.

What do you say?`,
  },
  {
    id: 'close-future',
    title: 'Fast Forward',
    category: 'closing',
    platform: 'Text/DM',
    icon: Rocket,
    message: `Picture this: 30 days from now, you've been doing this for a month.

10 minutes a day has become automatic. Extra income is coming in. You barely think about it.

That can be your reality. Or you can wonder "what if" for another 30 days.

Ready to start?`,
  },
  {
    id: 'close-simple-ask',
    title: 'Direct Ask',
    category: 'closing',
    platform: 'Text/DM',
    icon: Target,
    message: `I've told you what it is. I've told you how it works. I've answered your questions.

Now I'm just going to ask directly:

Do you want to do this?

Yes or no, I respect your answer. But I need an answer.`,
  },
  {
    id: 'close-partnership',
    title: 'We Do This Together',
    category: 'closing',
    platform: 'Text/DM',
    icon: Users,
    message: `Here's something I haven't mentioned:

When you start, I help you. Personally.

You're not figuring this out alone. I show you exactly what to copy, where to paste, and how to make it work.

10 minutes a day, but with someone in your corner.

Ready to do this together?`,
  },
  {
    id: 'close-value-stack',
    title: 'What You Get',
    category: 'closing',
    platform: 'Text/DM',
    icon: Gift,
    message: `When you start, here's what you're getting:

✓ The exact copy-paste templates that work
✓ Step-by-step walkthrough (no guessing)
✓ Direct access to me for questions
✓ A system that takes 10 minutes a day

All of that for a few minutes of your time to learn it.

Worth a shot?`,
  },
  {
    id: 'close-reverse',
    title: 'Why NOT You',
    category: 'closing',
    platform: 'Text/DM',
    icon: Flame,
    message: `Real talk: Why NOT you?

Other people are doing this. Regular people. Busy people. Skeptical people who gave it a shot.

Why should they get extra income and not you?

There's no good answer to that question.

So let's get you started. Cool?`,
  },
  {
    id: 'close-last-question',
    title: 'One Final Question',
    category: 'closing',
    platform: 'Text/DM',
    icon: Brain,
    message: `Last question:

If this works - and it does - what would you do with extra income every week?

Pay off something? Save for something? Just breathe a little easier?

Whatever your answer is... that's why you should try this.

Ready?`,
  },

  // Quick & Simple
  {
    id: 'quick-intro',
    title: 'Quick Intro',
    category: 'quick',
    platform: 'Text',
    icon: MessageCircle,
    message: `Hey! I started a simple side hustle. Just copy and paste for about 10 minutes a day and make extra income. Interested?`,
  },
  {
    id: 'casual',
    title: 'Casual Message',
    category: 'quick',
    platform: 'Text/DM',
    icon: MessageCircle,
    message: `Hey! Quick question - would you be open to making some extra money on the side? I found something super simple. Just 10 minutes a day, copy and paste. Let me know if you want details!`,
  },
  {
    id: 'curiosity',
    title: 'Curiosity Hook',
    category: 'quick',
    platform: 'Text/DM',
    icon: Lightbulb,
    message: `What if I told you that you could make extra income with just 10 minutes a day? No experience needed. Just copy and paste. Sound too good to be true? Let me explain.`,
  },
  {
    id: 'super-short',
    title: 'Super Short',
    category: 'quick',
    platform: 'Text',
    icon: Zap,
    message: `Hey! Making extra money on the side. 10 min/day, copy paste. Want in?`,
  },
  {
    id: 'question-opener',
    title: 'Question Opener',
    category: 'quick',
    platform: 'Text/DM',
    icon: HelpCircle,
    message: `Quick question - are you happy with your current income? I found a simple way to make extra cash on the side. Just 10 minutes a day.`,
  },
  {
    id: 'no-pitch',
    title: 'No-Pitch Approach',
    category: 'quick',
    platform: 'Text/DM',
    icon: Coffee,
    message: `Hey! Not trying to sell you anything. Just wanted to share what I've been doing to make some extra money. Super simple, 10 minutes a day. Let me know if you're curious.`,
  },

  // Social Media
  {
    id: 'social-post',
    title: 'General Post',
    category: 'social',
    platform: 'Facebook/Instagram',
    icon: Users,
    message: `Looking for a simple way to make extra money?

I spend about 10 minutes a day doing simple copy and paste tasks and earn extra income on the side.

No special skills needed. No selling. No inventory.

DM me "INFO" if you want to know more!`,
  },
  {
    id: 'story-post',
    title: 'Story-Based Post',
    category: 'social',
    platform: 'Facebook/Instagram',
    icon: Sparkles,
    message: `I used to think side hustles had to be complicated or time-consuming.

Then I found something that takes just 10 minutes a day. Simple copy and paste work that actually pays.

If you're looking for extra income without the hassle, drop a comment or DM me!`,
  },
  {
    id: 'lifestyle',
    title: 'Lifestyle Post',
    category: 'social',
    platform: 'Facebook/Instagram',
    icon: Heart,
    message: `What would an extra income stream mean for you?

For me, it's peace of mind. And the best part? It only takes 10 minutes a day.

Simple copy and paste. No complicated stuff.

Message me if you want to learn how!`,
  },
  {
    id: 'poll-post',
    title: 'Engagement Poll',
    category: 'social',
    platform: 'Facebook/Instagram',
    icon: Users,
    message: `Quick poll: Would you spend 10 minutes a day on something that makes you extra money?

YES = Drop a "🙋" in the comments
NO = Keep scrolling

I've been doing simple copy and paste work and it's been paying off. DM me if you want details!`,
  },
  {
    id: 'testimonial-style',
    title: 'Testimonial Style',
    category: 'social',
    platform: 'Facebook/Instagram',
    icon: Sparkles,
    message: `A few months ago, I was skeptical.

"Copy and paste for 10 minutes? Yeah right."

But I tried it anyway. And it actually works.

Now I'm helping others do the same. If you're open to a simple side income, comment "HOW" below!`,
  },
  {
    id: 'value-post',
    title: 'Value-First Post',
    category: 'social',
    platform: 'Facebook/Instagram',
    icon: Gift,
    message: `3 things I wish I knew before starting my side hustle:

1. It doesn't have to take hours
2. You don't need special skills
3. Simple copy and paste works

Now I spend 10 minutes a day and earn extra income. Want to know more? DM me!`,
  },
  {
    id: 'relatable-post',
    title: 'Relatable Post',
    category: 'social',
    platform: 'Facebook/Instagram',
    icon: Coffee,
    message: `Raise your hand if you've tried side hustles that:
- Took too much time
- Were too complicated
- Didn't actually pay

I found one that's different. 10 minutes a day. Copy and paste. Real income.

Comment "TELL ME" if you want info!`,
  },

  // Email
  {
    id: 'professional',
    title: 'Professional Email',
    category: 'email',
    platform: 'Email',
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
    category: 'email',
    platform: 'Email',
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
  {
    id: 'short-email',
    title: 'Short & Sweet Email',
    category: 'email',
    platform: 'Email',
    icon: Mail,
    message: `Hey,

Quick note - I've been doing a simple side hustle that's actually working out well.

10 minutes a day. Copy and paste. Extra income.

Thought you might be interested. Want me to share more?`,
  },
  {
    id: 'subject-lines',
    title: 'Email Subject Lines',
    category: 'email',
    platform: 'Email',
    icon: Mail,
    message: `Subject line options:

• "Quick question about making extra money"
• "10 minutes a day - interested?"
• "Simple side income (thought of you)"
• "Found something you might like"
• "Quick way to make extra cash"
• "No-brainer side hustle"`,
  },

  // Follow-ups
  {
    id: 'followup',
    title: 'First Follow-Up',
    category: 'followup',
    platform: 'Text/DM',
    icon: Clock,
    message: `Hey! Just checking in. Did you have a chance to think about that side income opportunity I mentioned? It's really just 10 minutes a day of copy and paste. Happy to answer any questions!`,
  },
  {
    id: 'second-followup',
    title: 'Second Follow-Up',
    category: 'followup',
    platform: 'Text/DM',
    icon: Clock,
    message: `Hi again! I know you're busy, but I wanted to follow up one more time. The copy and paste side hustle has been going really well for me. Just 10 minutes a day. Would you be open to a quick call so I can explain?`,
  },
  {
    id: 'gentle-nudge',
    title: 'Gentle Nudge',
    category: 'followup',
    platform: 'Text/DM',
    icon: RefreshCw,
    message: `Hey! No pressure at all, just wanted to circle back. That simple side income thing is still going strong. If you ever want to hear about it, I'm here. Hope you're doing well!`,
  },
  {
    id: 'value-followup',
    title: 'Value-Add Follow-Up',
    category: 'followup',
    platform: 'Text/DM',
    icon: Gift,
    message: `Hey! Just had another great week with my side hustle. Still just 10 minutes a day of copy and paste. I know I mentioned it before - let me know if you ever want to chat about it!`,
  },
  {
    id: 'final-followup',
    title: 'Final Follow-Up',
    category: 'followup',
    platform: 'Text/DM',
    icon: Clock,
    message: `Hey! Last time I'll bug you about this, I promise! The copy and paste side income has been great. If you're ever interested down the road, just reach out. No hard feelings either way!`,
  },

  // Specific Audiences
  {
    id: 'busy-professional',
    title: 'Busy Professionals',
    category: 'audiences',
    platform: 'Text/Email',
    icon: Briefcase,
    message: `I know you're super busy with work, so I'll keep this short.

I found a way to make extra income with just 10 minutes a day. Simple copy and paste. You can do it on your lunch break or before bed.

Want me to share more?`,
  },
  {
    id: 'sidehustle',
    title: 'Side Hustle Seekers',
    category: 'audiences',
    platform: 'Text/DM',
    icon: TrendingUp,
    message: `Still looking for a good side hustle?

I've been doing one that's actually legit. Just copy and paste for about 10 minutes a day. No selling, no recruiting pressure, no inventory.

Let me know if you want the details!`,
  },
  {
    id: 'busy-parent',
    title: 'Busy Parents',
    category: 'audiences',
    platform: 'Text/DM',
    icon: Home,
    message: `As a busy parent, I know time is precious. That's why I love this.

10 minutes a day. Copy and paste. Extra income.

I do it while the kids are doing homework or after they go to bed. Simple as that.

Interested?`,
  },
  {
    id: 'student',
    title: 'Students',
    category: 'audiences',
    platform: 'Text/DM',
    icon: GraduationCap,
    message: `Hey! Looking for a way to make some extra cash without it taking over your life?

I've been doing this simple copy and paste thing. Takes like 10 minutes a day and you can do it from your phone.

Perfect for students. Want to know more?`,
  },
  {
    id: 'retiree',
    title: 'Retirees',
    category: 'audiences',
    platform: 'Text/Email',
    icon: Coffee,
    message: `Hey! Found something you might enjoy.

It's a simple way to make some extra money - just copy and paste tasks, about 10 minutes a day. Easy to do from home, no complicated tech stuff.

Want me to explain how it works?`,
  },
  {
    id: 'work-from-home',
    title: 'Work From Home',
    category: 'audiences',
    platform: 'Text/DM',
    icon: Home,
    message: `Since you already work from home, this might be perfect for you.

I've been making extra income with simple copy and paste work. Takes about 10 minutes a day and you can do it between tasks.

Want to hear more?`,
  },
  {
    id: 'night-owl',
    title: 'Night Owls',
    category: 'audiences',
    platform: 'Text/DM',
    icon: Sparkles,
    message: `Hey night owl! If you're up late anyway, why not make some extra money?

I do simple copy and paste work for about 10 minutes before bed. Easy extra income.

Interested?`,
  },
  {
    id: 'phone-user',
    title: 'Always on Phone',
    category: 'audiences',
    platform: 'Text/DM',
    icon: Smartphone,
    message: `Since you're always on your phone anyway... what if you could make money from it?

I've been doing simple copy and paste tasks - 10 minutes a day - and earning extra income.

Want to know how?`,
  },
  {
    id: 'debt-focused',
    title: 'Paying Off Debt',
    category: 'audiences',
    platform: 'Text/DM',
    icon: DollarSign,
    message: `Hey! I know you mentioned wanting to pay off debt faster.

I found a simple way to make extra money - just 10 minutes a day of copy and paste. Every bit helps, right?

Want me to share the details?`,
  },
  {
    id: 'vacation-saver',
    title: 'Vacation Savers',
    category: 'audiences',
    platform: 'Text/DM',
    icon: Target,
    message: `Still saving for that vacation?

I've been making extra cash with a simple side hustle. 10 minutes a day, copy and paste. It adds up!

Let me know if you want to hear about it.`,
  },

  // Video/Call Invites
  {
    id: 'video-invite',
    title: 'Video Call Invite',
    category: 'calls',
    platform: 'Text/DM',
    icon: Video,
    message: `Hey! Would you have 10 minutes for a quick call? I want to show you this simple side income I've been doing. It's easier to explain than type out. Just copy and paste work, nothing complicated.`,
  },
  {
    id: 'team-call',
    title: 'Team Call Invite',
    category: 'calls',
    platform: 'Text/DM',
    icon: Phone,
    message: `We have a quick info call this week where they explain how the copy and paste system works. Only takes about 15 minutes. Want me to send you the details?`,
  },
  {
    id: 'coffee-chat',
    title: 'Coffee Chat',
    category: 'calls',
    platform: 'Text/DM',
    icon: Coffee,
    message: `Hey! Want to grab coffee this week? I've been doing this simple side hustle I'd love to tell you about. Nothing salesy, just sharing what's been working for me. 10 minutes a day, copy and paste.`,
  },
  {
    id: 'screen-share',
    title: 'Screen Share Offer',
    category: 'calls',
    platform: 'Text/DM',
    icon: Video,
    message: `Would it help if I showed you exactly what I do? I can hop on a quick Zoom and share my screen. The copy and paste process is super simple - you'll see what I mean. Just 10 minutes!`,
  },
  {
    id: 'group-call',
    title: 'Group Call Invite',
    category: 'calls',
    platform: 'Text/DM',
    icon: Users,
    message: `Hey! We're doing a group info session this week about the copy and paste side income. Low pressure, just info. A few of my friends are joining too. Want the link?`,
  },

  // Objection Handlers
  {
    id: 'skeptic',
    title: 'For Skeptics',
    category: 'objections',
    platform: 'Text/Email',
    icon: AlertCircle,
    message: `I get it, there are a lot of scams out there. I was skeptical too.

But this is literally just copy and paste work. 10 minutes a day. Nothing weird, no pyramid stuff.

I can show you exactly what I do if you want to see for yourself.`,
  },
  {
    id: 'no-time',
    title: '"No Time" Response',
    category: 'objections',
    platform: 'Text/DM',
    icon: Clock,
    message: `I totally get it, everyone's busy! That's exactly why I love this. It's literally just 10 minutes a day. You can do it while waiting in line, on your lunch break, wherever.

Simple copy and paste. That's it.`,
  },
  {
    id: 'too-good',
    title: '"Too Good To Be True"',
    category: 'objections',
    platform: 'Text/DM',
    icon: HelpCircle,
    message: `I know it sounds almost too simple, right? But that's what I love about it.

It's not going to make you a millionaire overnight. But for 10 minutes of copy and paste a day, the extra income adds up.

Want me to walk you through it?`,
  },
  {
    id: 'no-money',
    title: '"No Money to Start"',
    category: 'objections',
    platform: 'Text/DM',
    icon: DollarSign,
    message: `I hear you on that. The good news is you can start small. And honestly, 10 minutes a day of copy and paste can help you build up from there.

Want me to explain how it works?`,
  },
  {
    id: 'tried-before',
    title: '"Tried Things Before"',
    category: 'objections',
    platform: 'Text/DM',
    icon: RefreshCw,
    message: `I totally understand - I've tried other things too that didn't work out.

What's different here is the simplicity. Literally just copy and paste for 10 minutes a day. No complicated systems or products to sell.

Give me 5 minutes to explain?`,
  },
  {
    id: 'not-tech-savvy',
    title: '"Not Tech Savvy"',
    category: 'objections',
    platform: 'Text/DM',
    icon: Smartphone,
    message: `No worries at all! If you can copy and paste on your phone or computer, you can do this. That's literally all it is.

10 minutes a day. I'll walk you through everything step by step.`,
  },
  {
    id: 'spouse-approval',
    title: '"Need to Ask Spouse"',
    category: 'objections',
    platform: 'Text/DM',
    icon: Heart,
    message: `Of course! That's smart. Maybe we could all hop on a quick call together? That way you both hear about it at the same time. It's just copy and paste work, 10 minutes a day - pretty straightforward.`,
  },
  {
    id: 'let-me-think',
    title: '"Let Me Think About It"',
    category: 'objections',
    platform: 'Text/DM',
    icon: Clock,
    message: `Absolutely, take your time! No rush at all. I'll be here when you're ready. Just remember - it's simple copy and paste, 10 minutes a day. Feel free to reach out whenever!`,
  },

  // Warm Market
  {
    id: 'close-friend',
    title: 'Close Friends',
    category: 'warm',
    platform: 'Text/Call',
    icon: Heart,
    message: `Hey! I've been doing this simple side thing and thought of you. It's just copy and paste, takes about 10 minutes a day, and actually pays.

Can we chat this week? I think you'd really like it.`,
  },
  {
    id: 'reconnect',
    title: 'Reconnecting',
    category: 'warm',
    platform: 'Text/DM',
    icon: UserPlus,
    message: `Hey! It's been a while. Hope you're doing well!

I've been doing this simple side hustle lately. Just 10 minutes a day of copy and paste work for extra income. Thought of you because I know you're always looking for smart ways to earn.

Want to hear about it?`,
  },
  {
    id: 'family-member',
    title: 'Family Members',
    category: 'warm',
    platform: 'Text/Call',
    icon: Home,
    message: `Hey! Wanted to share something with you. I've been making extra income with this super simple thing - just copy and paste for 10 minutes a day.

Thought of you because I think you'd be great at it. Can I tell you more?`,
  },
  {
    id: 'coworker',
    title: 'Coworkers',
    category: 'warm',
    platform: 'Text/DM',
    icon: Briefcase,
    message: `Hey! You know how we're always talking about making extra money? I found something that actually works.

Simple copy and paste, 10 minutes a day. I've been doing it for a bit now. Want to hear about it?`,
  },
  {
    id: 'neighbor',
    title: 'Neighbors',
    category: 'warm',
    platform: 'Text/In Person',
    icon: Home,
    message: `Hey neighbor! Quick question - are you open to making some extra money on the side? I've been doing this simple copy and paste thing. Takes 10 minutes a day. Let me know if you want details!`,
  },
  {
    id: 'gym-friend',
    title: 'Gym/Activity Friends',
    category: 'warm',
    platform: 'Text/DM',
    icon: Target,
    message: `Hey! Random question - ever think about making extra income on the side? I started doing this copy and paste thing, 10 minutes a day. Pretty simple. Want to know more?`,
  },
  {
    id: 'church-friend',
    title: 'Church/Community',
    category: 'warm',
    platform: 'Text/DM',
    icon: Heart,
    message: `Hey! Hope you're doing well. I wanted to share something that's been a blessing for me - a simple way to make extra income. Just copy and paste, 10 minutes a day. Thought of you!`,
  },
  {
    id: 'old-classmate',
    title: 'Old Classmates',
    category: 'warm',
    platform: 'Text/DM',
    icon: GraduationCap,
    message: `Hey! Long time no talk! Hope everything's going great.

Quick thing - I've been doing this simple side income lately. Copy and paste, 10 minutes a day. Making some extra cash. Thought of you! Want to hear about it?`,
  },
];

export default function ReferralsPage() {
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const copyToClipboard = async (text: string, templateId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedTemplate(templateId);
      setTimeout(() => setCopiedTemplate(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const filteredTemplates = activeCategory === 'all'
    ? messageTemplates
    : messageTemplates.filter(t => t.category === activeCategory);

  const getCategoryCount = (categoryId: Category) => {
    if (categoryId === 'all') return messageTemplates.length;
    return messageTemplates.filter(t => t.category === categoryId).length;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Share & Earn</h1>
        <p className="text-white/60">
          {messageTemplates.length} scripts to copy and share
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

      {/* Category Tabs */}
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-2 min-w-max">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-gold text-navy-dark'
                  : 'bg-navy border border-gold/20 text-white/70 hover:text-white hover:border-gold/40'
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                activeCategory === cat.id
                  ? 'bg-navy-dark/20 text-navy-dark'
                  : 'bg-gold/20 text-gold'
              }`}>
                {getCategoryCount(cat.id)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Scripts Grid */}
      <div className="grid gap-4">
        {filteredTemplates.map((template) => (
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
                  <p className="text-gold/60 text-xs">{template.platform}</p>
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
