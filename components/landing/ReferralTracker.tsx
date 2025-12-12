'use client';

import { useEffect } from 'react';
import { trackReferralVisit } from '@/app/actions/referral';

interface ReferralTrackerProps {
  referralCode: string;
  source?: string;
}

export default function ReferralTracker({ referralCode, source }: ReferralTrackerProps) {
  useEffect(() => {
    // Track the visit once when the page loads
    const trackVisit = async () => {
      // Check if we've already tracked this visit in this session
      const trackedKey = `referral_tracked_${referralCode}`;
      if (sessionStorage.getItem(trackedKey)) {
        return;
      }

      await trackReferralVisit(referralCode, source);
      sessionStorage.setItem(trackedKey, 'true');

      // Also store the referral code for later use during registration
      localStorage.setItem('bg_referral_code', referralCode);
    };

    trackVisit();
  }, [referralCode, source]);

  return null;
}
