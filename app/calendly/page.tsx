'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';

export default function CalendlyPage() {
  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-navy-dark">
      {/* Header */}
      <div className="bg-navy border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-gold" />
              <h1 className="text-xl font-bold text-white">Schedule a Call</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Calendly Widget */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Book Your <span className="text-gold">Free Consultation</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Schedule a 45-minute call to learn more about the BG Wealth Sharing opportunity and how you can start your journey to financial freedom.
          </p>
        </div>

        <div className="bg-navy rounded-2xl border border-gold/20 overflow-hidden shadow-2xl shadow-gold/5">
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/blessingsandfreedom/45minutesmeeting"
            style={{ minWidth: '320px', height: '700px' }}
          />
        </div>
      </div>
    </div>
  );
}
