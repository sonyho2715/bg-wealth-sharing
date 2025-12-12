export interface SubStep {
  title: string;
  items: string[];
}

export interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  icon: 'user-plus' | 'log-in' | 'wallet' | 'message-circle' | 'clipboard' | 'trending-up' | 'target' | 'download';
  time: string;
  subSteps: SubStep[];
  videoUrl?: string;
  videoType?: 'youtube' | 'youtube-short';
  externalLink?: string;
  externalLinkText?: string;
}

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 1,
    title: 'Register New Account',
    description: 'Use the invitation code and link to create your DSJ account.',
    icon: 'user-plus',
    time: '5 min',
    subSteps: [
      {
        title: 'Step 1: Register New Account',
        items: [
          'Use the invitation code and link from your referrer',
          'Open the invitation link in Safari or Chrome',
          'You can register with Email or Mobile Number',
          'Fill in your email address or phone number',
          "Enter the code to verify, then check your email (if registered with email) or phone (if registered with phone) to get the verification code",
          'Create and confirm your password',
          'Click Register',
        ],
      },
      {
        title: 'Step 2: Log In',
        items: [
          'Enter your email and password on the login screen',
          "Click 'Save Password' for easy access later",
          "Click 'Log In' to access DSJ Exchange",
        ],
      },
    ],
    videoUrl: 'https://youtu.be/5ZaTrGK70iw',
    videoType: 'youtube',
    externalLink: 'https://dsjex.com',
    externalLinkText: 'Open DSJEX Signup',
  },
  {
    id: 2,
    title: 'Deposit & Setup Assets',
    description: 'Add funds to your trading account.',
    icon: 'wallet',
    time: '10 min',
    subSteps: [
      {
        title: 'Get Your Deposit Info',
        items: [
          'Click Assets (bottom right corner)',
          'Click Deposit',
          'Screenshot the QR code',
          'Copy the deposit link',
          'Send both to your referrer',
        ],
      },
      {
        title: 'Send Funds via Zelle',
        items: [
          "Wait for seller's Zelle information",
          'Send payment via Zelle',
          'Screenshot proof of payment',
          'Send screenshot to your referrer',
          'Wait for seller to deposit crypto into your DSJ account',
        ],
      },
      {
        title: 'Verify Your Deposit',
        items: [
          'Go to Assets and check your balance',
          'You should see your deposit amount in your account',
          "If you deposited $500+, you'll see reward bonuses",
          "You're ready for the next step!",
        ],
      },
    ],
    videoUrl: 'https://youtu.be/wH89VHy9Fec',
    videoType: 'youtube',
  },
  {
    id: 3,
    title: 'Join BonChat',
    description: 'Connect with the community on BonChat.',
    icon: 'message-circle',
    time: '8 min',
    subSteps: [
      {
        title: 'Download BonChat',
        items: [
          'Click: https://www.bonchat.live/?id=d333666',
          "OR search 'BonChat' in App Store (iPhone) or Google Play (Android)",
          'Download and open the app',
        ],
      },
      {
        title: 'Enter Server ID',
        items: [
          'Open BonChat app',
          "You'll see 'Server ID/Domain' field",
          'For USA: Enter D333666',
          'For Vietnam/Europe/Africa/Asia: Enter S333666',
          'Click Join',
        ],
      },
      {
        title: 'Create Account',
        items: [
          "Click 'Sign up' at the bottom",
          'Select your country',
          'Enter your phone number',
          "Click 'Send' to get SMS code",
          "Enter the code in 'SMS Code' field",
          'Check both confirmation boxes',
          "Click 'Continue'",
        ],
      },
      {
        title: 'Set Profile & Add Contacts',
        items: [
          'Create a Nick Name',
          'Create and confirm your password',
          "Click 'Continue'",
          'Click the person icon (bottom right) to add profile picture',
          "Your Bonchat ID starts with 'u' (visible in person icon)",
        ],
      },
      {
        title: 'Add Professors & Assistants',
        items: [
          'USA & International: Add Stephen03 & Elena03',
          'Vietnam Only: Add Stephen001 & RosaRosa8',
          "Search each name, click, say 'Hi' and click 'Send Request'",
          'Wait for approval',
        ],
      },
    ],
    videoUrl: 'https://www.youtube.com/watch?v=yuYJIucjvgM',
    videoType: 'youtube',
  },
  {
    id: 4,
    title: 'Complete Registration Form',
    description: 'Fill out your profile information with Elena and Stephen.',
    icon: 'clipboard',
    time: '5 min',
    subSteps: [
      {
        title: "Elena's Questions",
        items: [
          "Elena will ask: 'Did you register using email or phone?'",
          'If you used email for DSJ: Provide your email',
          'If you used phone for DSJ: Provide your phone number',
        ],
      },
      {
        title: 'Fill Out BG-Wealth Form',
        items: [
          'Full Name: Your complete name',
          'Country/Region: Your location',
          "Join Date: Today's date",
          'Deposit Amount: How much you deposited',
          'New Account ID: Your DSJ account ID (Home → Person icon → ID → Copy)',
          "Recommended Account ID: Your referrer's DSJ account ID",
        ],
      },
      {
        title: "Professor Stephen's Questions",
        items: [
          'Your Name: Full name',
          "Transaction Process: 'Not yet, I am learning'",
          'Age: Your age',
          "Initial Deposit: e.g., '1000 USDT'",
          'DSJEX Account: Your DSJ account ID',
          "Referrer Name: Your referrer's name",
          "Region: e.g., 'United States'",
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'Transfer Funds & Start Trading',
    description: 'Move funds to your trading account and get ready.',
    icon: 'trending-up',
    time: '3 min',
    subSteps: [
      {
        title: 'Transfer to Trading Account',
        items: [
          'Log into DSJ account',
          'Click Assets (bottom right)',
          "Click 'Transfer'",
          "Select 'All' to transfer everything",
          'Move funds from Exchange → Trade account',
          "You're now ready to trade! 🥳",
        ],
      },
      {
        title: 'Trading Schedule',
        items: [
          'Trading times (EST): 1:20 PM and 7:20 PM',
          'You have 10 minutes to execute each trade',
          'SET ALARMS for your local timezone',
          'Bonus signals start on Day 2',
          'First day deposit of $500+ = 6 bonus signals over 1.5 days',
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'How to Follow Bonus Signals',
    description: 'Learn to execute bonus signal trades.',
    icon: 'target',
    time: '4 min',
    subSteps: [
      {
        title: 'Bonus Trading Process',
        items: [
          'NO CODE NEEDED for bonuses',
          'Simply click: Futures → Invited me → Confirm to follow order',
          'You have 10 minutes after signal is sent',
          'Bonuses available 2-3 minutes before official time',
        ],
      },
      {
        title: 'Day 1 Bonus Times (EST)',
        items: [
          '2:00 PM',
          '2:30 PM',
          '8:30 PM',
          '9:00 PM',
        ],
      },
      {
        title: 'Day 2 Bonus Times (EST)',
        items: [
          '2:00 PM',
          '2:30 PM',
          'Then bonus period ends',
        ],
      },
      {
        title: 'Important Reminders',
        items: [
          'System time is EST (Florida/New York)',
          'Convert to your local timezone',
          'Set alarms for all trading & bonus times',
          "If you miss a signal, it's not recoverable",
          'If there\'s a technical error, take screenshot and send to Elena/Stephen',
        ],
      },
    ],
    videoUrl: 'https://youtube.com/shorts/yF9BGqn-JO4',
    videoType: 'youtube-short',
  },
  {
    id: 7,
    title: 'How to Withdraw',
    description: 'Learn how to withdraw your profits from DSJ.',
    icon: 'download',
    time: '5 min',
    subSteps: [
      {
        title: 'First Withdrawal Requirements',
        items: [
          'Your wallet address (TRC20 or ERC20)',
          'A selfie photo holding your ID',
          'Fill out the withdrawal form',
          'Wait for processing (usually 24-48 hours)',
        ],
      },
    ],
    videoUrl: 'https://youtu.be/dA42P1SNqao',
    videoType: 'youtube',
  },
];

export const getYouTubeEmbedUrl = (url: string): string => {
  // Handle YouTube Shorts
  if (url.includes('youtube.com/shorts/')) {
    const videoId = url.split('shorts/')[1].split('?')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  // Handle youtu.be short links
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1].split('?')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  // Handle regular YouTube links
  if (url.includes('youtube.com/watch')) {
    const urlParams = new URLSearchParams(url.split('?')[1]);
    const videoId = urlParams.get('v');
    return `https://www.youtube.com/embed/${videoId}`;
  }

  return url;
};
