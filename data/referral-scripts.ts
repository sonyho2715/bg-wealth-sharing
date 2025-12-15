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
    title: 'The Curiosity Hook',
    platform: 'text',
    content: `Hey! Can I ask you something weird? What would you do with an extra income stream that only takes 10 minutes a day? Asking because I found one and thought of you. Lmk if you want the details: [LINK]`,
  },
  {
    id: 'text-2',
    title: 'The "I Was Wrong" Story',
    platform: 'text',
    content: `Ok I have to admit something. Remember when I said crypto trading was too complicated? I was wrong. Found a system where I just copy/paste signals twice a day. That's it. 10 min total. Here's the link: [LINK]`,
  },
  {
    id: 'text-3',
    title: 'The Specific Number',
    platform: 'text',
    content: `Quick math: 10 minutes x 2 times a day = 20 minutes. That's all it takes. I copy trading signals, paste them, done. Been doing it for weeks now. Want me to show you? [LINK]`,
  },
  {
    id: 'text-4',
    title: 'The Fear of Missing Out',
    platform: 'text',
    content: `Hey [Name]! Not trying to be annoying but I really think you'd be good at this. Remember that trading thing I mentioned? A bunch of us are seeing results and I don't want you to miss out. Free training here: [LINK]`,
  },
  {
    id: 'text-5',
    title: 'The Problem-Solution',
    platform: 'text',
    content: `Tired of "get rich quick" stuff that never works? Same. That's why I like this - no hype, just copy/paste trading signals from people who actually know what they're doing. 10 min/day. Check it out: [LINK]`,
  },
  {
    id: 'text-6',
    title: 'The Social Proof',
    platform: 'text',
    content: `So this investment community I joined has 500,000+ members doing the same thing - following trading signals twice a day. Took me a while to trust it but now I get it. Want the link? [LINK]`,
  },
  {
    id: 'text-7',
    title: 'The Time Comparison',
    platform: 'text',
    content: `You probably scroll Instagram for more than 10 minutes a day right? What if you used that time to follow trading signals instead? That's literally what I do now. Free training: [LINK]`,
  },
  {
    id: 'text-8',
    title: 'The Direct Ask',
    platform: 'text',
    content: `Real talk - are you happy with your current income? If not, I want to show you what I've been doing. It's simple, it's 10 minutes a day, and there's free training. No BS. [LINK]`,
  },

  // WHATSAPP SCRIPTS
  {
    id: 'whatsapp-1',
    title: 'The Story Opener',
    platform: 'whatsapp',
    content: `Hey! 👋 Got a minute? I need to tell you about something crazy.

So you know how I always said investing was "not for me"?

Well... I changed my mind. 😅

Found this community where they send trading signals twice a day. All I do is:
1️⃣ Copy the signal
2️⃣ Paste it in the app
3️⃣ Done

That's literally it. 10 minutes total.

I was skeptical too but it's been working. Want me to send you the training link?

[LINK]`,
  },
  {
    id: 'whatsapp-2',
    title: 'The FOMO Message',
    platform: 'whatsapp',
    content: `Hey! 🔥 Remember that investment thing I mentioned?

Just wanted to let you know a bunch of us from the team are doing really well with it.

I don't want you to look back in 6 months wishing you started today.

Free training here (no credit card needed): [LINK]

Worst case? You learn something new. 🤷‍♀️`,
  },
  {
    id: 'whatsapp-3',
    title: 'The Objection Killer',
    platform: 'whatsapp',
    content: `I know what you're thinking... 🤔

"Is this legit?"
"I don't know anything about trading"
"I don't have time"

That's exactly what I thought too.

Then I realized:
✅ 500,000+ members can't all be wrong
✅ You don't need to know trading - just copy/paste
✅ 10 minutes a day is less than your TikTok time

Free training here: [LINK]

No pressure. Just see if it's for you. 💪`,
  },
  {
    id: 'whatsapp-4',
    title: 'The Value Stack',
    platform: 'whatsapp',
    content: `Quick question... 💭

What would you do with extra income every month?

• Pay off debt faster?
• Save for vacation?
• Just have breathing room?

I found something that takes 10 min/day and it's changed my perspective on what's possible.

It's free to learn how it works: [LINK]

Even if you're skeptical, the training is worth watching. 👀`,
  },
  {
    id: 'whatsapp-5',
    title: 'The Gentle Follow-Up',
    platform: 'whatsapp',
    content: `Hey! 👋 Not trying to bug you.

Just checking if you saw my message about the trading signals thing?

No worries if it's not for you. But if you're even a little curious, the free training explains everything better than I can.

Here's the link again: [LINK]

Let me know either way! 😊`,
  },

  // FACEBOOK SCRIPTS
  {
    id: 'facebook-1',
    title: 'The Pattern Interrupt',
    platform: 'facebook',
    content: `STOP SCROLLING. I need to tell you something. 🛑

I found a way to make my phone actually work FOR me instead of just wasting my time.

10 minutes a day. Copy trading signals. Paste them. Done.

No:
❌ Complicated charts
❌ Financial degree required
❌ Hours of research

Just follow the signals from people who do this full-time.

Comment "HOW" and I'll DM you the free training link.

#FinancialFreedom #PassiveIncome #TradingSignals`,
  },
  {
    id: 'facebook-2',
    title: 'The Transformation Story',
    platform: 'facebook',
    content: `6 months ago: "I'll never understand investing."
Today: I spend 10 minutes copying trading signals. That's it.

What changed? I stopped trying to figure it out myself and started following people who already know what they're doing.

It's called the Win-Win-Win model:
✅ The trading team wins
✅ The platform wins
✅ I win

Free training to learn more. Drop a 🙋 and I'll send the link!`,
  },
  {
    id: 'facebook-3',
    title: 'The Controversial Take',
    platform: 'facebook',
    content: `Unpopular opinion: You don't need to understand trading to benefit from it. 📊

There, I said it.

Here's what I do instead:
→ Expert traders analyze the market
→ They send signals at 1 PM and 7 PM
→ I copy. I paste. I'm done.

Total daily time: 10 minutes.

Some people will hate this post. Others will ask for the link.

Which one are you? DM "INFO" for free training.`,
  },
  {
    id: 'facebook-4',
    title: 'The Day-in-My-Life',
    platform: 'facebook',
    content: `A day in my life with trading signals:

☀️ 1:00 PM - Phone buzzes. Signal arrives.
📱 1:02 PM - Copy the signal.
✅ 1:03 PM - Paste it in the app. Done.

🌙 7:00 PM - Phone buzzes. Second signal.
📱 7:02 PM - Copy.
✅ 7:03 PM - Paste. Done for the day.

Total time invested: Less than my morning coffee break.

Want to see how it works? Comment "SHOW ME" 👇`,
  },
  {
    id: 'facebook-5',
    title: 'The Before/After',
    platform: 'facebook',
    content: `BEFORE: Spending hours watching YouTube videos about trading. Still confused.

AFTER: Spending 10 minutes copying signals from actual experts. Actually seeing results.

The difference? I stopped trying to be the expert and started following one.

500,000+ people do this every day. Free training to see if it's for you.

Comment "READY" and I'll send it! 🚀`,
  },
  {
    id: 'facebook-6',
    title: 'The Question Post',
    platform: 'facebook',
    content: `Quick poll for my friends:

Would you spend 10 minutes a day if it could change your financial future?

🔥 = Yes, show me how
❄️ = I'm good with my Netflix time

For the 🔥 people: I've got a free training that explains everything. DM me "READY" and I'll send the link.

No pressure for the ❄️ crew - just more signals for the rest of us 😉`,
  },

  // INSTAGRAM SCRIPTS
  {
    id: 'instagram-1',
    title: 'The Aesthetic Caption',
    platform: 'instagram',
    content: `The glow up no one talks about: financial glow up ✨

My 10-minute daily routine:
☕ 1 PM: Copy trading signal
📱 Paste in app
🌙 7 PM: Repeat

That's it. That's the whole thing.

While everyone's watching reels, I'm building wealth.

DM "LEARN" for free training 💫

#WealthMindset #FinancialGlowUp #TradingLife #MoneyMoves #InvestingTips`,
  },
  {
    id: 'instagram-2',
    title: 'The Hook Reel Caption',
    platform: 'instagram',
    content: `"There's no way making money can be that simple."

Me: *copies signal*
Me: *pastes signal*
Me: *closes phone*

Total time: 4 minutes.

I thought the same thing until I tried it. Now I do this twice a day while people argue about whether it's real.

Link in bio. Free training. See for yourself 👀

#MoneyTok #SideHustle #TradingSignals #PassiveIncome`,
  },
  {
    id: 'instagram-3',
    title: 'The Carousel Post Caption',
    platform: 'instagram',
    content: `SAVE THIS if you want to start investing but feel lost 📌

Slide 1: The problem (investing feels complicated)
Slide 2: The solution (follow expert signals)
Slide 3: How it works (copy + paste)
Slide 4: Time required (10 min/day)
Slide 5: Next step (free training)

I used to think you needed a finance degree. Turns out you just need the right team.

DM "START" and I'll send you the training link 💪

#InvestingForBeginners #FinancialEducation #WealthBuilding`,
  },
  {
    id: 'instagram-4',
    title: 'The Story Sequence',
    platform: 'instagram',
    content: `STORY 1:
POV: It's 1 PM and your phone buzzes 📱

STORY 2:
Trading signal just dropped.
Time to copy. Time to paste.

STORY 3:
Done in 3 minutes.
See you at 7 PM for round 2.

STORY 4:
This is literally my life now.
10 minutes a day.
DM "HOW" for free training 🔗`,
  },
  {
    id: 'instagram-5',
    title: 'The Reels Script',
    platform: 'instagram',
    content: `🎬 REEL SCRIPT:

HOOK (0-3 sec):
"I make money in 10 minutes a day and people think I'm lying"

BODY (3-15 sec):
*Show phone screen*
"Signal comes in at 1 PM. I copy it."
*Paste motion*
"Paste it here. Done."
"Same thing at 7 PM."

CTA (15-20 sec):
"Free training in bio if you want to learn how"

CAPTION:
The simplest side hustle ever? Probably. Link in bio 🔗

#MoneyHacks #SideHustleIdeas #InvestingTips #FinancialFreedom`,
  },
  {
    id: 'instagram-6',
    title: 'The DM Conversation Starter',
    platform: 'instagram',
    content: `Just posted about my 10-minute income routine and my DMs are flooding 😅

If you're curious:
• Yes, it's real
• No, you don't need experience
• Yes, there's free training
• No, I'm not selling anything

Link in bio or just DM me "INFO" 📲

#RealTalk #SideHustle #InvestingJourney`,
  },

  // TIKTOK SCRIPTS
  {
    id: 'tiktok-1',
    title: 'The Viral Hook',
    platform: 'tiktok',
    content: `🎬 VIDEO SCRIPT:

HOOK: "The government doesn't want you to know this side hustle exists"

(Just kidding, it's totally legal)

But seriously - I spend 10 minutes a day copying trading signals and that's it.

No degree. No experience. Just copy and paste.

Link in bio for the free training.

#moneytok #sidehustle #passiveincome #tradingsignals #financialfreedom`,
  },
  {
    id: 'tiktok-2',
    title: 'The POV Video',
    platform: 'tiktok',
    content: `POV: You just discovered the laziest way to invest 😴

*alarm goes off at 1 PM*
*checks phone*
*copies signal*
*pastes signal*
*puts phone down*

"Wait that's it?"

Yep. See you at 7 PM for round 2.

Bio link for free training 🔗

#moneytok #investing #sidehustle #passiveincome`,
  },
  {
    id: 'tiktok-3',
    title: 'The Duet/Stitch Bait',
    platform: 'tiktok',
    content: `Stitch this if you have a side hustle that takes less than 10 minutes a day:

*proceeds to show the copy-paste process*

That's it. That's the whole side hustle.

Duet me with your reaction 😂

#sidehustleideas #moneytok #passiveincome #duetthis`,
  },
  {
    id: 'tiktok-4',
    title: 'The Skeptic Response',
    platform: 'tiktok',
    content: `"That copy-paste trading thing isn't real"

Me at 1 PM: *copies signal*
Me at 1:03 PM: *closes phone*
Me at 7 PM: *copies signal*
Me at 7:03 PM: *closes phone, goes to sleep*

500,000 people doing the same thing but sure, it's fake 🙄

Link in bio if you want the truth.

#moneytok #tradingsignals #sidehustle`,
  },
  {
    id: 'tiktok-5',
    title: 'The Storytime Hook',
    platform: 'tiktok',
    content: `STORYTIME: How I accidentally started making extra income 💰

My friend: "Just copy the signal and paste it"
Me: "That sounds fake"
My friend: "Just try it"
Me: *tries it*
Me: 👁️👄👁️

Now I do it every day at 1 PM and 7 PM.

Free training in bio if you want the same energy.

#storytime #moneytok #sidehustle #passiveincome`,
  },
  {
    id: 'tiktok-6',
    title: 'The Comparison Video',
    platform: 'tiktok',
    content: `Other side hustles:
❌ Dropshipping (months to set up)
❌ Flipping (need capital and storage)
❌ Freelancing (trading time for money)

This side hustle:
✅ 10 minutes a day
✅ Just copy/paste
✅ No products, no clients
✅ Free training to start

Bio link 🔗

#sidehustles #passiveincome #moneytok #investing`,
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
  {
    id: 'email-4',
    title: 'Email - The PAS Formula',
    platform: 'email',
    content: `Subject: Tired of complicated "investment advice"?

Hi [Name],

Can I be honest with you?

THE PROBLEM:
Most investment advice sounds like it's written in another language. Charts, candlesticks, market analysis... it's overwhelming. And even if you spend hours learning, there's no guarantee you'll make the right calls.

THE FRUSTRATION:
I spent months trying to figure it out on my own. Watched countless YouTube videos. Read books. Still felt lost. The worst part? Watching my money sit there doing nothing while inflation ate away at it.

THE SOLUTION:
Then I found something different. A team of professional traders who do all the hard work and simply send signals twice a day. My job? Copy. Paste. Done. 10 minutes total.

No charts. No analysis. No stress.

They offer free live training where you can see exactly how it works before committing anything.

Here's my personal link: [LINK]

Worth 60 minutes of your time to see if it fits your life.

Best,
[YOUR NAME]`,
  },
  {
    id: 'email-5',
    title: 'Email - The Success Story',
    platform: 'email',
    content: `Subject: How I went from skeptic to believer

Hi [Name],

Three months ago, if someone told me I'd be following trading signals daily, I would have laughed.

"That's not for people like me," I thought.
"I don't understand the market."
"It's probably too complicated."

Sound familiar?

Here's what actually happened:

Month 1: Joined out of curiosity. Nervous but hopeful.
Week 2: Followed my first signals. Took 5 minutes.
Month 2: Started seeing the pattern. Copy at 1 PM. Copy at 7 PM. That's it.
Month 3: Can't imagine NOT doing this. It's become as routine as checking my email.

The team made it so simple that I actually stuck with it. No confusing jargon. No pressure. Just clear signals and a supportive community.

Want to see if it could work for you too?

Free training here: [LINK]

I'll be around if you have questions.

[YOUR NAME]

P.S. The training is completely free. No credit card needed. Just you and a Zoom link.`,
  },
  {
    id: 'email-6',
    title: 'Email - The Urgency Angle',
    platform: 'email',
    content: `Subject: Quick heads up about next week's training

Hi [Name],

I wanted to give you a quick heads up.

The team I mentioned is hosting their live training session soon, and seats tend to fill up fast. This is the session where they walk you through exactly how the trading signals work, step by step.

Why am I telling you this?

Because I remember sitting where you are. Curious but uncertain. Wanting something better but not sure what to trust.

The training answered every question I had. And it costs nothing but your time.

Here's what you'll learn:
• How the Win-Win-Win model works
• Why you don't need trading experience
• How to follow signals in under 10 minutes/day
• Live Q&A with the team

Grab your spot here: [LINK]

No pressure, but if you're even a little curious, this is the best way to learn.

Talk soon,
[YOUR NAME]`,
  },
  {
    id: 'email-7',
    title: 'Email - Social Proof Heavy',
    platform: 'email',
    content: `Subject: 500,000+ people can't be wrong

Hi [Name],

I want to share something that convinced me to take this seriously:

500,000+ members.

That's not a typo. Over half a million people from around the world are doing the same thing every day, following the same signals at 1 PM and 7 PM.

When I first heard that number, something clicked. This isn't some random scheme. It's a proven system with a massive community of real people seeing real results.

What they do:
✓ Professional trading team analyzes the market
✓ They send clear signals twice daily
✓ Members copy and paste (that's the whole "strategy")
✓ Total time: 10 minutes per day

What I did:
→ Watched the free training
→ Asked my questions (they answer everything)
→ Started small
→ Now it's part of my daily routine

Want to join the 500,000+?

Free training here: [LINK]

See you on the inside,
[YOUR NAME]`,
  },
  {
    id: 'email-8',
    title: 'Email - The AIDA Framework',
    platform: 'email',
    content: `Subject: What if making extra income was actually simple?

Hi [Name],

ATTENTION:
What if I told you there's a way to potentially grow your income in just 10 minutes a day?

INTEREST:
I know that sounds like every other "opportunity" out there. But here's what's different:
- You don't need to learn trading
- You don't need to analyze markets
- You don't need hours of your day

A professional team does all the analysis and sends you exactly what to do. You copy. You paste. You're done.

DESIRE:
Imagine waking up, following two simple signals per day, and knowing you're actively building toward your financial goals. No stress. No confusion. No guesswork.

That's what over 500,000 members experience every single day.

ACTION:
Ready to see how it works?

The team offers completely free training sessions. No credit card required. No commitment. Just pure information so you can decide if it's right for you.

Register for free training here: [LINK]

Your future self might thank you for taking 60 minutes to learn about this.

Best regards,
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
"It's called BG Wealth Sharing through Abundant Blessing AI Trade. They send out trading signals twice a day. All I do is follow along. No analysis, no staring at charts, none of that."

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
  {
    id: 'phone-4',
    title: 'Phone Script - The Casual Check-in',
    platform: 'phone',
    content: `"Hey [Name], how's everything going?

[Let them respond]

Nice! Hey, random question - remember when we talked about wanting to build more income streams? Or maybe saving more for the future?

Well, I found something really interesting. It's this investment community where you just follow trading signals twice a day. Super simple. Takes like 10 minutes.

What's cool is they have free training sessions where they explain everything. No sales pitch, just information.

Would you be open to checking it out? I can send you the link right now.

[If they say yes]
Perfect! It's a 60-minute session and you can ask any questions. I'll text you the link. Let me know what you think after!"`,
  },
  {
    id: 'phone-5',
    title: 'Phone Script - The Success Share',
    platform: 'phone',
    content: `"Hey [Name]! So glad I caught you.

I've been wanting to tell you about something I've been doing lately.

You know how I was always talking about wanting to invest but finding it confusing? Well, I finally found something that works for me.

It's this community called BG Wealth Sharing. They have this team of professional traders who analyze everything and then send us signals twice a day. All we do is copy and paste them. That's literally it.

I've been doing it for a while now and honestly? It's become part of my routine. Like brushing my teeth.

The reason I'm calling is because I thought of you. They do these free training sessions where they explain everything - no commitment, just learn how it works.

Would you want me to send you the link? I really think you'd find it interesting."`,
  },
  {
    id: 'phone-6',
    title: 'Phone Script - The Warm Referral',
    platform: 'phone',
    content: `"Hey [Name], I'm calling because [Mutual Friend] and I were just talking about you.

We've both been doing this trading signals thing - have you heard about it?

[If no]
So basically, there's this team of professional traders who do all the market analysis. Then twice a day, they send out signals telling us exactly what to do. We just copy and paste. Takes like 10 minutes total.

[Mutual Friend] and I both started around the same time and we both wish we'd known about it sooner.

Anyway, we were thinking you'd be perfect for this. There's free training where they explain everything.

Want me to send you the link? No pressure at all, but I think you'd really like it.

[If yes]
Oh awesome! So you know how simple it is then. Want to join the team? I can send you my link for the free training."`,
  },
  {
    id: 'phone-7',
    title: 'Phone Script - The Problem Solver',
    platform: 'phone',
    content: `"Hey [Name], got a minute? I wanted to run something by you.

So I remember you mentioning [their specific pain point - bills, savings, retirement, etc.]. Is that still something you're thinking about?

[Let them respond]

I hear you. Well, I found something that might help. It's not a magic solution, but it's a way to potentially build extra income with just 10 minutes a day.

Here's how it works: there's a team of professional traders who analyze the market. Twice a day, they send out signals - like instructions. All we do is copy those signals and paste them into the trading app.

No experience needed. No staring at charts. Just follow the signals.

They have free training sessions where they show you exactly how it works. Would you be interested in checking it out?

[If hesitant]
Look, I totally get being skeptical. I was too. That's why I like that the training is completely free. No credit card, no commitment. Just see if it makes sense for you."`,
  },
  {
    id: 'phone-8',
    title: 'Phone Script - The Time Frame',
    platform: 'phone',
    content: `"Hey [Name]! Quick call.

So you know how we always say we'll start investing 'someday'? Well, I decided to stop waiting.

I found this thing where you follow trading signals twice a day. The team does all the hard work - analyzing markets, making decisions. I just copy what they send and paste it. Ten minutes, done.

Here's what I want you to think about:

Where will you be financially in 6 months if you do nothing different?

Now where could you be if you spent 10 minutes a day following a proven system?

The training is free. You can learn everything, ask questions, and decide if it's for you.

Want me to send you the link? I really think 6 months from now, you'll be glad you took this call."`,
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
