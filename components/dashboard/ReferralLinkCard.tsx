'use client';

import { useState } from 'react';
import { Link2, Copy, Check, Share2 } from 'lucide-react';

interface ReferralLinkCardProps {
  referralCode: string;
  firstName: string;
}

export default function ReferralLinkCard({ referralCode, firstName }: ReferralLinkCardProps) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // DSJ invitation link format
  const dsjInvitationLink = `https://dsj927.com/?code=${referralCode}`;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(dsjInvitationLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
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
          url: dsjInvitationLink,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="bg-gradient-to-br from-gold/20 via-gold/10 to-gold/5 border border-gold/30 rounded-xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Link2 className="w-5 h-5 text-gold" />
            Your DSJ Invitation
          </h2>
          <p className="text-white/60 text-sm mt-1">
            Share this code and link with friends and family to invite them to join DSJ
          </p>
        </div>
      </div>

      {/* Invitation Code Display */}
      <div className="bg-navy-dark/50 border border-gold/20 rounded-lg p-4 mb-4">
        <p className="text-white/60 text-xs mb-2">My invitation code</p>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={referralCode}
            readOnly
            className="flex-1 bg-transparent text-white text-lg font-mono focus:outline-none"
          />
          <button
            onClick={handleCopyCode}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
              copiedCode
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-white/10 hover:bg-white/20 text-gold border border-gold/30'
            }`}
          >
            {copiedCode ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Invitation Link Display */}
      <div className="bg-navy-dark/50 border border-gold/20 rounded-lg p-4 mb-4">
        <p className="text-white/60 text-xs mb-2">My invitation code link</p>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={dsjInvitationLink}
            readOnly
            className="flex-1 bg-transparent text-white text-sm font-mono focus:outline-none"
          />
          <button
            onClick={handleCopyLink}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
              copiedLink
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-gold hover:bg-gold-light text-navy-dark'
            }`}
          >
            {copiedLink ? (
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
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(dsjInvitationLink)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-[#1877F2]/20 hover:bg-[#1877F2]/30 text-[#1877F2] rounded-lg transition-colors"
        >
          Facebook
        </a>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(`Check out this investment opportunity! Just 10 minutes a day to make money. ${dsjInvitationLink}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] rounded-lg transition-colors"
        >
          WhatsApp
        </a>
        <a
          href={`sms:?body=${encodeURIComponent(`Hey! Check out this investment opportunity. Just 10 minutes a day! ${dsjInvitationLink}`)}`}
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
