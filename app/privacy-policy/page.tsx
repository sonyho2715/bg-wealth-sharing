import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';
import { CONFIG } from '@/lib/config';

export default function PrivacyPolicyPage() {
  const lastUpdated = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

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
              <Shield className="w-6 h-6 text-gold" />
              <h1 className="text-xl font-bold text-white">Privacy Policy</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-navy rounded-2xl border border-gold/20 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-white/50 mb-8">Last updated: {lastUpdated}</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">1. Introduction</h2>
              <p className="text-white/70 leading-relaxed">
                {CONFIG.brand.teamName} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">2. Information We Collect</h2>
              <p className="text-white/70 leading-relaxed mb-4">We may collect information about you in various ways, including:</p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                <li><strong className="text-white">Personal Data:</strong> Name, email address, phone number, and other contact information you provide when registering or contacting us.</li>
                <li><strong className="text-white">Financial Information:</strong> Information necessary for investment processing, which is handled securely through third-party platforms.</li>
                <li><strong className="text-white">Usage Data:</strong> Information about how you access and use our website, including IP address, browser type, pages visited, and time spent on pages.</li>
                <li><strong className="text-white">Communication Data:</strong> Records of correspondence if you contact us directly.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">3. How We Use Your Information</h2>
              <p className="text-white/70 leading-relaxed mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                <li>Provide, operate, and maintain our services</li>
                <li>Process your registration and manage your account</li>
                <li>Send you updates, newsletters, and marketing communications (with your consent)</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">4. Information Sharing</h2>
              <p className="text-white/70 leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4 mt-4">
                <li>With service providers who assist us in operating our website and services</li>
                <li>To comply with legal requirements or respond to lawful requests</li>
                <li>To protect our rights, privacy, safety, or property</li>
                <li>With your consent or at your direction</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">5. Data Security</h2>
              <p className="text-white/70 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">6. Your Rights</h2>
              <p className="text-white/70 leading-relaxed mb-4">Depending on your location, you may have the right to:</p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent where processing is based on consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">7. Cookies</h2>
              <p className="text-white/70 leading-relaxed">
                We may use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">8. Changes to This Policy</h2>
              <p className="text-white/70 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">9. Contact Us</h2>
              <p className="text-white/70 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at{' '}
                <a href={`mailto:${CONFIG.contact.email}`} className="text-gold hover:text-gold-light transition-colors">
                  {CONFIG.contact.email}
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
