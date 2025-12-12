'use client';

import { useState } from 'react';
import { Link2, Copy, Check, Share2, QrCode } from 'lucide-react';

interface ReferralLinkCardProps {
  referralCode: string;
  firstName: string;
}

export default function ReferralLinkCard({ referralCode, firstName }: ReferralLinkCardProps) {
  const [copied, setCopied] = useState(false);
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://bgwealth.com';
  const referralLink = `${baseUrl}/r/${referralCode}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Join ${firstName}'s Team - BG Wealth Sharing`,
          text: 'Check out this investment opportunity! Just 10 minutes a day.',
          url: referralLink,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="bg-gradient-to-br from-gold/20 via-gold/10 to-gold/5 border border-gold/30 rounded-xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Link2 className="w-5 h-5 text-gold" />
            Your Personal Referral Link
          </h2>
          <p className="text-white/60 text-sm mt-1">
            Share this link with friends and family to invite them to join your team
          </p>
        </div>
      </div>

      {/* Link Display */}
      <div className="bg-navy-dark/50 border border-gold/20 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="flex-1 bg-transparent text-white text-sm font-mono focus:outline-none"
          />
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              copied
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-gold hover:bg-gold-light text-navy-dark'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy Link
              </>
            )}
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-[#1877F2]/20 hover:bg-[#1877F2]/30 text-[#1877F2] rounded-lg transition-colors"
        >
          Facebook
        </a>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(`Check out this investment opportunity! Just 10 minutes a day to make money. ${referralLink}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] rounded-lg transition-colors"
        >
          WhatsApp
        </a>
        <a
          href={`sms:?body=${encodeURIComponent(`Hey! Check out this investment opportunity. Just 10 minutes a day! ${referralLink}`)}`}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors"
        >
          Text Message
        </a>
      </div>

      {/* Pro Tip */}
      <div className="mt-4 p-3 bg-gold/10 border border-gold/20 rounded-lg">
        <p className="text-sm text-gold">
          <span className="font-semibold">Pro Tip:</span> Use the scripts below to craft the perfect message. Copy, paste, and personalize!
        </p>
      </div>
    </div>
  );
}
