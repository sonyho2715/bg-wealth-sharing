'use client';

import { motion } from 'framer-motion';
import { Users, DollarSign, TrendingUp, Target, Sparkles, Gift, Award } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function TeamSection() {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: Gift,
      title: t.teamSection.benefit1Title,
      description: t.teamSection.benefit1Desc,
    },
    {
      icon: TrendingUp,
      title: t.teamSection.benefit2Title,
      description: t.teamSection.benefit2Desc,
    },
    {
      icon: Sparkles,
      title: t.teamSection.benefit3Title,
      description: t.teamSection.benefit3Desc,
    },
  ];

  return (
    <section id="team" className="py-20 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t.teamSection.title} <span className="text-gold">{t.teamSection.titleHighlight}</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {t.teamSection.description}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Compensation Table Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden border-2 border-gold/30 shadow-2xl shadow-gold/10">
              <Image
                src="/images/bg/compensation-table.png"
                alt="BG Wealth Sharing Compensation Table - Levels 1 to 12"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gold/20 rounded-full blur-2xl" />
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-gold/10 rounded-full blur-3xl" />
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              {t.teamSection.whyHelp}
            </h3>
            <p className="text-white/70 leading-relaxed">
              {t.teamSection.whyHelpDesc}
            </p>

            <div className="space-y-4 pt-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="bg-navy-dark border border-gold/20 rounded-xl p-5 hover:border-gold/40 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gold/10 rounded-xl flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{benefit.title}</h4>
                      <p className="text-white/60 text-sm">{benefit.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              <div className="bg-navy-dark border border-gold/20 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gold/10 rounded-lg">
                    <Award className="w-5 h-5 text-gold" />
                  </div>
                  <span className="text-white font-semibold">{t.teamSection.trainingProvided}</span>
                </div>
                <p className="text-white/60 text-sm">{t.teamSection.trainingDesc}</p>
              </div>
              <div className="bg-navy-dark border border-gold/20 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gold/10 rounded-lg">
                    <Users className="w-5 h-5 text-gold" />
                  </div>
                  <span className="text-white font-semibold">{t.teamSection.teamSupport}</span>
                </div>
                <p className="text-white/60 text-sm">{t.teamSection.teamSupportDesc}</p>
              </div>
              <div className="bg-navy-dark border border-gold/20 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gold/10 rounded-lg">
                    <Target className="w-5 h-5 text-gold" />
                  </div>
                  <span className="text-white font-semibold">{t.teamSection.dailySignals}</span>
                </div>
                <p className="text-white/60 text-sm">{t.teamSection.dailySignalsDesc}</p>
              </div>
              <div className="bg-navy-dark border border-gold/20 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gold/10 rounded-lg">
                    <DollarSign className="w-5 h-5 text-gold" />
                  </div>
                  <span className="text-white font-semibold">{t.teamSection.multipleIncome}</span>
                </div>
                <p className="text-white/60 text-sm">{t.teamSection.multipleIncomeDesc}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
