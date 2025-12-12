// Centralized configuration for BG Wealth Sharing
// Update values here instead of hardcoding throughout the app

export const CONFIG = {
  // Brand
  brand: {
    name: 'BG Wealth Sharing',
    teamName: 'Lee Meadows Team',
    tagline: 'Build Lasting Wealth Through Strategic Investment',
  },

  // Bonchat Communication
  bonchat: {
    existingMembers: {
      server: 'S333666',
      description: 'For existing members',
    },
    newMembers: {
      server: 'BG2022',
      admins: ['Elena03', 'Stephen03'],
      effectiveDate: '2025-12-09',
      description: 'For new members joining after Dec 9, 2025',
    },
  },

  // Contact Information
  contact: {
    email: 'support@bgwealth.com',
    calendlyUrl: 'https://calendly.com/leemeadowsteam/free-training',
  },

  // Trading Signals
  signals: {
    times: [
      { time: '1:00 PM EST', label: 'Afternoon Signal' },
      { time: '7:00 PM EST', label: 'Evening Signal' },
    ],
    platform: 'Bonchat',
  },

  // Investment Details
  investment: {
    minimum: 300,
    currency: 'USDT',
    networks: ['TRC20 (Tron)', 'ERC20 (Ethereum)'],
  },

  // Meeting Schedule
  meetings: [
    {
      id: 'newcomers',
      title: 'BG Newcomers',
      schedule: 'Monday - Friday | 5:00 PM EST',
      description: 'Training & basic guidance for new members',
      note: 'You will be invited to this group',
      color: 'purple',
    },
    {
      id: 'agent-conference',
      title: 'BG Agent Conference',
      schedule: 'Tuesday, Thursday, Saturday | 5:00 PM EST',
      description: 'Business & strategy updates',
      note: 'For members Level 1 and above',
      color: 'blue',
    },
    {
      id: 'family-meeting',
      title: 'BG Family Meeting',
      schedule: 'Monday & Friday | 8:00 PM EST',
      description: 'Chat only (text messages, not Zoom)',
      note: 'BG Family groups: 111 / 222 / 333 / 444 / 555',
      color: 'green',
    },
    {
      id: 'zoom-professor',
      title: 'Live Zoom with the Professor',
      schedule: 'Every Sunday | 8:00 PM EST',
      description: 'Live teaching & market overview',
      note: 'Zoom link shared before meeting',
      color: 'red',
    },
    {
      id: 'bg-015',
      title: 'BG 015',
      schedule: 'Daily',
      description: 'Receive daily trading codes',
      note: 'Follow instructions carefully',
      color: 'gold',
    },
    {
      id: 'notification',
      title: 'BG Notification',
      schedule: 'As needed',
      description: 'Official announcements',
      note: 'Latest updates from BG assistant',
      color: 'cyan',
    },
  ],

  // External Links
  links: {
    dsjex: 'https://dsjex.com',
    training: '/register',
    login: '/login',
  },

  // Legal & Compliance
  legal: {
    riskDisclosure: 'Investment involves risk. Past performance does not guarantee future results. Please carefully consider your investment objectives and risk tolerance before investing. Only invest funds you can afford to lose.',
    copyright: `© ${new Date().getFullYear()} BG Wealth Sharing - Lee Meadows Team. All rights reserved.`,
  },
} as const;

// Helper function to get Bonchat server info
export function getBonchatServer(isNewMember: boolean = false) {
  return isNewMember ? CONFIG.bonchat.newMembers : CONFIG.bonchat.existingMembers;
}

// Helper to format signal times
export function getSignalTimesDisplay() {
  return CONFIG.signals.times.map(s => s.time).join(' & ');
}
