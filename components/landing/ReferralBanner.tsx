'use client';

import { UserCircle, Sparkles } from 'lucide-react';

interface ReferralBannerProps {
  referrerName: string;
  referralCode: string;
}

export default function ReferralBanner({ referrerName, referralCode }: ReferralBannerProps) {
  return (
    <div className="bg-gradient-to-r from-gold/20 via-gold/10 to-gold/20 border-b border-gold/30">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-3 text-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gold/30 rounded-full flex items-center justify-center">
              <UserCircle className="w-5 h-5 text-gold" />
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-white text-sm sm:text-base">
                <span className="text-gold font-semibold">{referrerName}</span>
                {' '}invited you to join Abundant Blessing AI Trade
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
