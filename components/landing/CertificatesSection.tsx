'use client';

import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const certificates = [
  { src: '/images/bg/screenshot-1.png', alt: 'Certificate 1' },
  { src: '/images/bg/screenshot-2.png', alt: 'Certificate 2' },
  { src: '/images/bg/screenshot-3.png', alt: 'Certificate 3' },
  { src: '/images/bg/screenshot-4.png', alt: 'Certificate 4' },
  { src: '/images/bg/screenshot-5.png', alt: 'Certificate 5' },
  { src: '/images/bg/screenshot-6.png', alt: 'Certificate 6' },
];

export default function CertificatesSection() {
  const { t } = useLanguage();

  return (
    <section id="certificates" className="py-20 bg-navy-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-6">
            <Award className="w-4 h-4 text-gold" />
            <span className="text-sm text-gold">{t.certificates.badge}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t.certificates.title} <span className="text-gold">{t.certificates.titleHighlight}</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {t.certificates.description}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="rounded-xl overflow-hidden border-2 border-gold/20 hover:border-gold/50 transition-all duration-300 shadow-lg hover:shadow-gold/20">
                <Image
                  src={cert.src}
                  alt={cert.alt}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
