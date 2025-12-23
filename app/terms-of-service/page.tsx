import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';
import { CONFIG } from '@/lib/config';

export default function TermsOfServicePage() {
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
              <FileText className="w-6 h-6 text-gold" />
              <h1 className="text-xl font-bold text-white">Terms of Service</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-navy rounded-2xl border border-gold/20 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Terms of Service</h1>
          <p className="text-white/50 mb-8">Last updated: {lastUpdated}</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">1. Agreement to Terms</h2>
              <p className="text-white/70 leading-relaxed">
                By accessing or using the {CONFIG.brand.teamName} website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">2. Eligibility</h2>
              <p className="text-white/70 leading-relaxed">
                You must be at least 18 years of age to use our services. By using our services, you represent and warrant that you are of legal age to form a binding contract and meet all eligibility requirements.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">3. Account Registration</h2>
              <p className="text-white/70 leading-relaxed mb-4">When you create an account with us, you agree to:</p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">4. Services Description</h2>
              <p className="text-white/70 leading-relaxed">
                {CONFIG.brand.teamName} provides educational resources, training materials, and information related to investment opportunities. Our services include access to member dashboard, onboarding materials, training sessions, and community support.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">5. Investment Risks</h2>
              <p className="text-white/70 leading-relaxed">
                <strong className="text-gold">Important:</strong> {CONFIG.legal.riskDisclosure}
              </p>
              <p className="text-white/70 leading-relaxed mt-4">
                You acknowledge that any investment decisions are made at your own risk. We do not provide financial advice, and our educational materials should not be construed as such.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">6. User Conduct</h2>
              <p className="text-white/70 leading-relaxed mb-4">You agree not to:</p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                <li>Use our services for any unlawful purpose</li>
                <li>Share your account credentials with others</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt our services</li>
                <li>Copy, modify, or distribute our content without permission</li>
                <li>Use our services to harass, abuse, or harm others</li>
                <li>Misrepresent your affiliation with us or our services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">7. Intellectual Property</h2>
              <p className="text-white/70 leading-relaxed">
                All content, features, and functionality of our services, including text, graphics, logos, videos, and software, are owned by {CONFIG.brand.teamName} and are protected by copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">8. Third-Party Links and Services</h2>
              <p className="text-white/70 leading-relaxed">
                Our services may contain links to third-party websites or services. We are not responsible for the content, privacy policies, or practices of any third-party sites or services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">9. Limitation of Liability</h2>
              <p className="text-white/70 leading-relaxed">
                To the fullest extent permitted by law, {CONFIG.brand.teamName} shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or other intangible losses resulting from your use of our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">10. Indemnification</h2>
              <p className="text-white/70 leading-relaxed">
                You agree to indemnify and hold harmless {CONFIG.brand.teamName} and its affiliates, officers, agents, and employees from any claims, damages, losses, or expenses arising from your use of our services or violation of these terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">11. Termination</h2>
              <p className="text-white/70 leading-relaxed">
                We reserve the right to terminate or suspend your account and access to our services at our sole discretion, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users or our business interests.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">12. Changes to Terms</h2>
              <p className="text-white/70 leading-relaxed">
                We reserve the right to modify these Terms of Service at any time. We will notify users of significant changes by posting the new terms on this page. Your continued use of our services after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">13. Governing Law</h2>
              <p className="text-white/70 leading-relaxed">
                These Terms of Service shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">14. Contact Information</h2>
              <p className="text-white/70 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at{' '}
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
