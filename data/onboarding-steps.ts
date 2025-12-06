export interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  action?: string;
  instruction?: string;
  videoUrl: string;
  videoType: 'youtube' | 'youtube-short';
  externalLink?: string;
  externalLinkText?: string;
}

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 1,
    title: "Get Referral Link",
    description: "Start by getting your official BG/DSJEX registration link.",
    action: "Copy official BG/DSJEX registration link.",
    videoUrl: "https://youtube.com/shorts/Mp4QjtqXDLA",
    videoType: 'youtube-short',
  },
  {
    id: 2,
    title: "Create DSJEX Account",
    description: "Sign up for your DSJEX trading account using the referral link.",
    action: "Click the button below to open DSJEX signup.",
    videoUrl: "https://youtu.be/5ZaTrGK70iw",
    videoType: 'youtube',
    externalLink: "https://dsjex.com",
    externalLinkText: "Open DSJEX Signup",
  },
  {
    id: 3,
    title: "Setup Crypto Wallet & Recharge",
    description: "Prepare your cryptocurrency wallet for funding your account.",
    instruction: "Prepare your USDT (TRC20 or ERC20) wallet.",
    videoUrl: "https://youtu.be/wH89VHy9Fec",
    videoType: 'youtube',
  },
  {
    id: 4,
    title: "Create Bonchat",
    description: "Download and set up Bonchat for team communication.",
    instruction: "Download Bonchat. Server: S333666.",
    videoUrl: "https://www.youtube.com/watch?v=yuYJIucjvgM",
    videoType: 'youtube',
  },
  {
    id: 5,
    title: "Deposit Funds",
    description: "Fund your account with the minimum investment amount.",
    instruction: "Minimum $300 investment required.",
    videoUrl: "https://youtu.be/dA42P1SNqao",
    videoType: 'youtube',
  },
  {
    id: 6,
    title: "Activation",
    description: "Get your account activated by the team.",
    instruction: "Contact Lee Meadows/Admin via Bonchat. Send Screenshot of DSJ Account ID.",
    videoUrl: "https://youtube.com/shorts/eD2bzbpEZyQ",
    videoType: 'youtube-short',
  },
  {
    id: 7,
    title: "Trade & Signals",
    description: "Start trading with the team's daily signals.",
    instruction: "Follow the 1 PM and 7 PM EST signals.",
    videoUrl: "https://youtube.com/shorts/yF9BGqn-JO4",
    videoType: 'youtube-short',
    externalLink: "https://youtube.com/shorts/nbittflr6Yk",
    externalLinkText: "Watch Bonus Signals Video",
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
