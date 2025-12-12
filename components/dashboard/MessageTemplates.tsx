'use client';

import { useState } from 'react';
import {
  MessageSquare,
  MessageCircle,
  Mail,
  Phone,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Video,
} from 'lucide-react';
import { REFERRAL_SCRIPTS, SCRIPT_PLATFORMS, Script } from '@/data/referral-scripts';

interface MessageTemplatesProps {
  referralCode: string;
  firstName: string;
}

const platformIcons: Record<string, React.ElementType> = {
  MessageSquare,
  MessageCircle,
  Mail,
  Phone,
  Facebook: MessageCircle,
  Instagram: MessageCircle,
  Video,
};

export default function MessageTemplates({ referralCode, firstName }: MessageTemplatesProps) {
  const [activePlatform, setActivePlatform] = useState<string>('text');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // DSJ invitation link format
  const dsjInvitationLink = `https://dsj927.com/?code=${referralCode}`;

  const replaceVariables = (content: string) => {
    return content
      .replace(/\[LINK\]/g, dsjInvitationLink)
      .replace(/\[YOUR NAME\]/g, firstName)
      .replace(/\[Name\]/g, '[Friend\'s Name]');
  };

  const handleCopy = async (script: Script) => {
    try {
      const content = replaceVariables(script.content);
      await navigator.clipboard.writeText(content);
      setCopiedId(script.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const filteredScripts = REFERRAL_SCRIPTS.filter(
    (script) => script.platform === activePlatform
  );

  return (
    <div className="bg-navy border border-gold/20 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gold/20">
        <h2 className="text-lg font-semibold text-white">Copy & Paste Scripts</h2>
        <p className="text-white/60 text-sm mt-1">
          Ready-to-use messages for every platform. Just copy, paste, and send!
        </p>
      </div>

      {/* Platform Tabs */}
      <div className="flex overflow-x-auto border-b border-gold/20 px-4">
        {SCRIPT_PLATFORMS.map((platform) => {
          const Icon = platformIcons[platform.icon] || MessageSquare;
          const isActive = activePlatform === platform.id;
          const count = REFERRAL_SCRIPTS.filter((s) => s.platform === platform.id).length;

          return (
            <button
              key={platform.id}
              onClick={() => setActivePlatform(platform.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                isActive
                  ? 'border-gold text-gold'
                  : 'border-transparent text-white/50 hover:text-white/70'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{platform.label}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                isActive ? 'bg-gold/20 text-gold' : 'bg-white/10 text-white/40'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Scripts List */}
      <div className="divide-y divide-gold/10">
        {filteredScripts.map((script) => {
          const isExpanded = expandedId === script.id;
          const isCopied = copiedId === script.id;
          const processedContent = replaceVariables(script.content);

          return (
            <div key={script.id} className="p-4">
              <div className="flex items-start justify-between gap-4">
                <button
                  onClick={() => setExpandedId(isExpanded ? null : script.id)}
                  className="flex-1 text-left"
                >
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-white">{script.title}</h3>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-white/50" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-white/50" />
                    )}
                  </div>
                  {!isExpanded && (
                    <p className="text-sm text-white/50 mt-1 line-clamp-2">
                      {processedContent.substring(0, 100)}...
                    </p>
                  )}
                </button>
                <button
                  onClick={() => handleCopy(script)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex-shrink-0 ${
                    isCopied
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-gold/10 hover:bg-gold/20 text-gold border border-gold/30'
                  }`}
                >
                  {isCopied ? (
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

              {isExpanded && (
                <div className="mt-4 p-4 bg-navy-dark/50 rounded-lg border border-gold/10">
                  <pre className="text-sm text-white/80 whitespace-pre-wrap font-sans leading-relaxed">
                    {processedContent}
                  </pre>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Tips Section */}
      <div className="p-6 bg-gold/5 border-t border-gold/20">
        <h3 className="font-semibold text-white mb-3">Tips for Success</h3>
        <ul className="space-y-2 text-sm text-white/70">
          <li className="flex items-start gap-2">
            <span className="text-gold">•</span>
            Personalize the message with your friend&apos;s name
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gold">•</span>
            Focus on the &quot;10 minutes a day&quot; simplicity
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gold">•</span>
            Mention the free training with no obligation
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gold">•</span>
            Follow up if they don&apos;t respond right away
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gold">•</span>
            Share your own experience and results
          </li>
        </ul>
      </div>
    </div>
  );
}
