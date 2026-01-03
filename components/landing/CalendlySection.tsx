'use client';

import { useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function CalendlySection() {
  const { t } = useLanguage();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <section id="book-call" className="py-20 bg-navy-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.calendly.title} <span className="text-gold">{t.calendly.cta}</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {t.calendly.description}
          </p>
        </div>

        <div className="bg-navy rounded-2xl border border-gold/20 overflow-hidden shadow-2xl shadow-gold/5">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-gold/20 bg-navy-dark/50">
            <Calendar className="w-5 h-5 text-gold" />
            <span className="font-medium text-white">{t.calendly.cta}</span>
          </div>
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/blessingsandfreedom/45minutesmeeting"
            style={{ minWidth: '320px', height: '700px' }}
          />
        </div>
      </div>
    </section>
  );
}
