'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  variant?: 'default' | 'compact';
}

export default function LanguageToggle({ variant = 'default' }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage();

  if (variant === 'compact') {
    return (
      <button
        onClick={() => setLanguage(language === 'en' ? 'vi' : 'en')}
        className="flex items-center gap-1.5 px-2 py-1 rounded-md text-white/80 hover:text-gold hover:bg-gold/10 transition-colors"
        aria-label="Toggle language"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium uppercase">{language}</span>
      </button>
    );
  }

  return (
    <div className="flex items-center gap-1 p-1 rounded-lg bg-navy-dark border border-gold/20">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
          language === 'en'
            ? 'bg-gold text-navy-dark'
            : 'text-white/60 hover:text-white'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('vi')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
          language === 'vi'
            ? 'bg-gold text-navy-dark'
            : 'text-white/60 hover:text-white'
        }`}
      >
        VI
      </button>
    </div>
  );
}
