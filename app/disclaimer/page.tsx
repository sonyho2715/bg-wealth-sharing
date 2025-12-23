'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, AlertTriangle, Calendar } from 'lucide-react';
import { CONFIG } from '@/lib/config';

export default function DisclaimerPage() {
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
              <AlertTriangle className="w-6 h-6 text-gold" />
              <h1 className="text-xl font-bold text-white">Disclaimer</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-navy rounded-2xl border border-gold/20 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Disclaimer</h1>
          <p className="text-white/50 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

          {/* Important Notice Box */}
          <div className="bg-gold/10 border border-gold/30 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-gold mb-2">Important Notice</h3>
                <p className="text-white/80 leading-relaxed">
                  {CONFIG.legal.riskDisclosure}
                </p>
              </div>
            </div>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">1. General Disclaimer</h2>
              <p className="text-white/70 leading-relaxed">
                The information provided by {CONFIG.brand.teamName} on our website and through our services is for general informational and educational purposes only. All information is provided in good faith. However, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">2. No Financial Advice</h2>
              <p className="text-white/70 leading-relaxed">
                The content on our website and services does not constitute financial, investment, trading, or any other type of advice. You should not treat any of our content as such. We do not recommend that any particular cryptocurrency, security, portfolio of securities, transaction, or investment strategy is suitable for any specific person.
              </p>
              <p className="text-white/70 leading-relaxed mt-4">
                You understand that you are using any and all information available on or through our services at your own risk. Before making any financial decisions, we strongly recommend consulting with a qualified financial advisor or professional.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">3. Investment Risks</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                All investments carry inherent risks, including:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                <li><strong className="text-white">Market Risk:</strong> The value of investments can go down as well as up, and you may receive back less than you originally invested.</li>
                <li><strong className="text-white">Volatility Risk:</strong> Cryptocurrency and other digital assets are highly volatile and can experience significant price fluctuations.</li>
                <li><strong className="text-white">Liquidity Risk:</strong> You may not be able to sell your investments at a desired time or price.</li>
                <li><strong className="text-white">Regulatory Risk:</strong> Changes in laws and regulations may adversely affect investments.</li>
                <li><strong className="text-white">Technology Risk:</strong> Technical failures, cyber attacks, or other technological issues may affect investment platforms.</li>
                <li><strong className="text-white">Loss of Capital:</strong> You may lose some or all of your invested capital.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">4. Past Performance</h2>
              <p className="text-white/70 leading-relaxed">
                Past performance is not indicative of future results. Any historical returns, expected returns, or probability projections may not reflect actual future performance. Any testimonials or success stories shared on our website are individual experiences and do not guarantee similar results for all users.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">5. Educational Content</h2>
              <p className="text-white/70 leading-relaxed">
                Our training materials, videos, webinars, and other educational content are provided for informational purposes only. They are designed to help you understand investment concepts and strategies but should not be relied upon as the sole basis for making investment decisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">6. Third-Party Platforms</h2>
              <p className="text-white/70 leading-relaxed">
                We may reference or provide links to third-party platforms, exchanges, or services. We are not responsible for the content, security, or practices of these third parties. Your use of any third-party service is at your own risk and subject to their terms and conditions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">7. No Guarantees</h2>
              <p className="text-white/70 leading-relaxed">
                We do not guarantee any specific outcomes, returns, or results from using our services or following any information or strategies discussed. Individual results will vary based on numerous factors including market conditions, timing, and individual circumstances.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">8. Personal Responsibility</h2>
              <p className="text-white/70 leading-relaxed">
                You are solely responsible for evaluating the merits and risks of any investment decision. You should conduct your own due diligence and research before making any investment. Never invest more than you can afford to lose.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">9. Limitation of Liability</h2>
              <p className="text-white/70 leading-relaxed">
                Under no circumstances shall {CONFIG.brand.teamName}, its officers, directors, employees, or agents be held liable for any loss or damage including, without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of our website or services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">10. Changes to This Disclaimer</h2>
              <p className="text-white/70 leading-relaxed">
                We reserve the right to modify this Disclaimer at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services following any changes indicates your acceptance of the modified Disclaimer.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">11. Contact Us</h2>
              <p className="text-white/70 leading-relaxed">
                If you have any questions about this Disclaimer, please contact us at{' '}
                <a href={`mailto:${CONFIG.contact.email}`} className="text-gold hover:text-gold-light transition-colors">
                  {CONFIG.contact.email}
                </a>
              </p>
            </section>
          </div>
        </div>

        {/* Calendly Section */}
        <div className="mt-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Want to Learn More? <span className="text-gold">Schedule a Call</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Have questions about risks, investments, or how our program works? Book a free consultation with our team.
            </p>
          </div>

          <div className="bg-navy rounded-2xl border border-gold/20 overflow-hidden shadow-2xl shadow-gold/5">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-gold/20 bg-navy-dark/50">
              <Calendar className="w-5 h-5 text-gold" />
              <span className="font-medium text-white">Schedule a Meeting</span>
            </div>
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/blessingsandfreedom/45minutesmeeting"
              style={{ minWidth: '320px', height: '700px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
