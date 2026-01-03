'use client';

import { motion } from 'framer-motion';
import { Video, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface CTASectionProps {
  referralCode?: string;
}

export default function CTASection({ referralCode }: CTASectionProps) {
  const { t } = useLanguage();
  const registerHref = referralCode ? `/register?ref=${referralCode}` : '/register';

  return (
    <section className="py-20 bg-gradient-to-b from-navy-dark to-[#0a0a14] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-navy-light/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {t.cta.title}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            {t.cta.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={registerHref}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-navy-dark font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-gold/30 transition-all duration-300"
            >
              <Video className="w-5 h-5" />
              {t.cta.primaryCta}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-gold/30 text-gold font-semibold text-lg rounded-xl hover:bg-gold/10 transition-all duration-300"
            >
              {t.cta.alreadyMember} {t.cta.login}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
