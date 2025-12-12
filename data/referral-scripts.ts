export interface Script {
  id: string;
  title: string;
  content: string;
  platform: 'text' | 'facebook' | 'instagram' | 'email' | 'phone' | 'tiktok' | 'whatsapp';
}

export const REFERRAL_SCRIPTS: Script[] = [
  // TEXT MESSAGE SCRIPTS
  {
    id: 'text-1',
    title: 'Casual Introduction',
    platform: 'text',
    content: `Hey! I've been using this investment platform and wanted to share it with you. They do daily trading signals and I've been really happy with the results. Takes only 10 minutes a day to follow along. Here's my personal link if you want to check it out: [LINK]`,
  },
  {
    id: 'text-2',
    title: 'Results Focused',
    platform: 'text',
    content: `Quick question - have you heard of BG Wealth Sharing? I joined a few months ago and it's been great. They send trading signals twice daily and it literally takes 10 minutes to follow. No trading experience needed. Check it out here: [LINK]`,
  },
  {
    id: 'text-3',
    title: 'Opportunity Share',
    platform: 'text',
    content: `Hey! Remember when I mentioned looking for extra income? I found something that actually works. Copy-paste trading signals, 10 min/day. Free training to learn more: [LINK]`,
  },
  {
    id: 'text-4',
    title: 'Simple & Direct',
    platform: 'text',
    content: `Hey [Name]! Got a sec? I've been doing this side thing that's actually paying off. Just copy/paste trading signals - takes 10 mins a day. Zero experience needed. Want me to send you the link? [LINK]`,
  },
  {
    id: 'text-5',
    title: 'For Busy People',
    platform: 'text',
    content: `I know you're super busy, but this literally takes 10 minutes a day. Copy the signal, paste it, done. I've been doing it for a while now. Free training if you're curious: [LINK]`,
  },

  // WHATSAPP SCRIPTS
  {
    id: 'whatsapp-1',
    title: 'WhatsApp Introduction',
    platform: 'whatsapp',
    content: `Hey! 👋 Quick question - are you open to a side income opportunity that takes just 10 minutes a day?

I've been doing this for a while now and it's been great. It's called BG Wealth Sharing.

Here's how it works:
✅ Get trading signals twice daily
✅ Copy and paste them
✅ That's literally it

No trading experience needed. They teach you everything.

Here's my link: [LINK]

Let me know if you have questions! 🙌`,
  },
  {
    id: 'whatsapp-2',
    title: 'WhatsApp Follow-up',
    platform: 'whatsapp',
    content: `Hey! Following up on what we talked about.

The free training is really good - they explain everything step by step. No pressure, just information.

Here's the link when you're ready: [LINK]

Takes about 60 minutes and you can ask questions live! 📱`,
  },

  // FACEBOOK SCRIPTS
  {
    id: 'facebook-1',
    title: 'Facebook Post - Lifestyle',
    platform: 'facebook',
    content: `Looking for a side income that doesn't take over your life? 🤔

I've been following trading signals that take just 10 minutes a day. No experience needed - literally copy and paste.

If you're curious, I'm hosting a free training session to show you how it works. Comment "INFO" or DM me!

#PassiveIncome #FinancialFreedom #SideHustle`,
  },
  {
    id: 'facebook-2',
    title: 'Facebook Post - Time Freedom',
    platform: 'facebook',
    content: `The best investment I made this year wasn't a stock - it was my time. ⏰

10 minutes a day. Copy/paste signals. That's it.

Want to learn how? Free training available. Drop a "🙋" below!

#InvestmentTips #TimeIsMoney #FinancialEducation`,
  },
  {
    id: 'facebook-3',
    title: 'Facebook Post - Results',
    platform: 'facebook',
    content: `3 months ago I was skeptical. Now I'm a believer. 📈

What changed?
- Found a system that actually works
- Takes 10 minutes a day
- No fancy skills needed
- Just copy what the experts do

DM me "LEARN" if you want the details. Free training, no obligation.`,
  },
  {
    id: 'facebook-4',
    title: 'Facebook Post - Story',
    platform: 'facebook',
    content: `STORY TIME 📖

A friend told me about this "copy-paste trading thing" and I thought it was too good to be true.

Spoiler: It wasn't. 🎉

Here's what I actually do:
1. Check my phone at 1 PM
2. Copy the trading signal
3. Paste it in the app
4. Repeat at 7 PM
5. Total time: 10 minutes

That's literally it. No charts, no analysis, no stress.

Interested? Comment "HOW" and I'll send you details!`,
  },

  // INSTAGRAM SCRIPTS
  {
    id: 'instagram-1',
    title: 'Instagram Caption',
    platform: 'instagram',
    content: `From skeptical to successful in 30 days. 📈

Here's what I spend 10 minutes on every day:
→ Step 1: Check the trading signal
→ Step 2: Copy the code
→ Step 3: Paste it in the app
→ Step 4: Done ✅

No fancy analysis. No stress. Just follow the signals.

Want in? Link in bio or DM me "LEARN" 💬

#InvestmentTips #TradingSignals #FinancialEducation #WealthBuilding #SideHustle`,
  },
  {
    id: 'instagram-2',
    title: 'Instagram Story Text',
    platform: 'instagram',
    content: `POV: You only need 10 minutes a day to build wealth 💰

Swipe up or DM "INFO" to learn how

No experience needed ✨`,
  },
  {
    id: 'instagram-3',
    title: 'Instagram Reel Caption',
    platform: 'instagram',
    content: `The 10-minute side hustle nobody talks about 🤫

• No products to sell
• No recruiting required
• Just copy & paste trading signals
• Twice a day, 5 minutes each

Free training in bio! 🔗

#MoneyTips #SideHustleIdeas #FinancialFreedom #PassiveIncome #InvestingTips`,
  },

  // TIKTOK SCRIPTS
  {
    id: 'tiktok-1',
    title: 'TikTok Caption',
    platform: 'tiktok',
    content: `What if I told you that you could make money by spending just 10 minutes a day copying and pasting? 🤯

No, seriously. That's what I do.

Link in bio for free training!

#sidehustle #passiveincome #moneytok #investingtips #financialfreedom`,
  },
  {
    id: 'tiktok-2',
    title: 'TikTok Hook Script',
    platform: 'tiktok',
    content: `"What's your side hustle?"

Me: I copy and paste for 10 minutes a day.

"That's not a real job."

Me: *shows results* 📈

Want to learn? Bio link! 🔗

#moneytok #sidehustles #passiveincome`,
  },

  // EMAIL SCRIPTS
  {
    id: 'email-1',
    title: 'Email - Personal Introduction',
    platform: 'email',
    content: `Subject: Quick question about your financial goals

Hi [Name],

I wanted to reach out because I recently joined an investment community that I think you'd find interesting.

Here's the short version: They send out trading signals twice a day (1 PM and 7 PM EST). All I do is copy the signal and paste it into the trading app. Takes about 10 minutes total.

What I love about it:
• No trading experience required
• The team handles all the analysis
• Free live training to get started
• Supportive community of over 500,000 members

I know it sounds too simple, but that's exactly what drew me to it. They're hosting free training sessions if you want to learn more before committing anything.

Here's my personal link to register for a session: [LINK]

No pressure at all - just thought of you when I was going through it.

Talk soon,
[YOUR NAME]`,
  },
  {
    id: 'email-2',
    title: 'Email - Follow Up',
    platform: 'email',
    content: `Subject: Following up - that investment opportunity

Hi [Name],

Just following up on my last email about BG Wealth Sharing.

I know you're busy, so here's the 30-second version:
• 10 minutes a day
• Copy/paste trading signals
• No experience needed
• Free training available

If you're even a little curious, the training is free and there's no obligation. You'll get to ask questions live.

Register here: [LINK]

Let me know if you have any questions!

Best,
[YOUR NAME]`,
  },
  {
    id: 'email-3',
    title: 'Email - Busy Professional',
    platform: 'email',
    content: `Subject: 10 minutes to change your finances?

Hi [Name],

I know your time is valuable, so I'll keep this brief.

I found a way to potentially grow my income spending just 10 minutes a day. It involves following trading signals - copy and paste, no analysis needed.

The team behind it offers free live training where they explain everything. No commitment, just information.

Here's my link if you want to check it out: [LINK]

Worth a look if you've ever wanted to explore investing without the complexity.

Cheers,
[YOUR NAME]`,
  },

  // PHONE SCRIPTS
  {
    id: 'phone-1',
    title: 'Phone Script - Complete',
    platform: 'phone',
    content: `OPENING:
"Hey [Name], do you have a few minutes? I wanted to tell you about something I've been doing."

THE HOOK:
"So you know how everyone talks about investing but it seems so complicated? I found something that's actually simple. I spend about 10 minutes a day, literally just copying and pasting."

EXPLAIN THE CONCEPT:
"It's called BG Wealth Sharing. There's this team - the Lee Meadows Team - and they send out trading signals twice a day. All I do is follow along. No analysis, no staring at charts, none of that."

HANDLE SKEPTICISM:
"I know, I was skeptical too at first. But they offer free live training sessions where they explain everything. No commitment, just learn how it works."

THE ASK:
"Would you be open to checking out one of their free sessions? I can send you my personal link - no pressure, just see if it's something that interests you."

CLOSING:
"Great, I'll text you the link. It's about 60 minutes, and you'll get to ask questions live. Let me know what you think!"`,
  },
  {
    id: 'phone-2',
    title: 'Phone Script - Quick Version',
    platform: 'phone',
    content: `"Hey [Name]! Got a quick second?

So I've been doing this thing where I follow trading signals - takes me like 10 minutes a day. Just copy and paste. No experience needed.

They have a free training if you want to learn more. Can I send you the link?"

[If yes]: "Perfect, I'll text it to you right now. It's totally free, no obligation."

[If hesitant]: "No pressure at all. If you change your mind, just let me know. The training really helped me understand how it all works."`,
  },
  {
    id: 'phone-3',
    title: 'Phone Script - Objection Handling',
    platform: 'phone',
    content: `COMMON OBJECTIONS & RESPONSES:

"Is this a scam?"
→ "I totally understand that concern. That's why I like that they offer free training first - you can learn everything before putting any money in. No pressure, just information."

"I don't know anything about trading."
→ "Neither did I! That's the best part - you don't need to. You just copy what they tell you. They do all the analysis."

"I don't have time."
→ "That's what I thought too. But it's literally 10 minutes a day - 5 minutes at 1 PM, 5 minutes at 7 PM. Most people spend more time scrolling social media."

"How much money do I need?"
→ "The minimum to start is $300, but you don't need to decide that now. Check out the free training first and see if it's right for you."

"Let me think about it."
→ "Of course! I'll send you the link and you can register whenever you're ready. The training is free and there's no obligation."`,
  },
];

export const SCRIPT_PLATFORMS = [
  { id: 'text', label: 'Text Message', icon: 'MessageSquare' },
  { id: 'whatsapp', label: 'WhatsApp', icon: 'MessageCircle' },
  { id: 'facebook', label: 'Facebook', icon: 'Facebook' },
  { id: 'instagram', label: 'Instagram', icon: 'Instagram' },
  { id: 'tiktok', label: 'TikTok', icon: 'Video' },
  { id: 'email', label: 'Email', icon: 'Mail' },
  { id: 'phone', label: 'Phone Script', icon: 'Phone' },
] as const;
