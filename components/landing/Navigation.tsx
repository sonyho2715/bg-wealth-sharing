'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import LanguageToggle from '@/components/ui/LanguageToggle';

interface NavigationProps {
  referralCode?: string;
}

export default function Navigation({ referralCode }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navLinks = [
    { href: '#overview', label: t.nav.overview },
    { href: '#team', label: t.nav.team },
    { href: '#testimonials', label: t.nav.successStories },
  ];

  const registerHref = referralCode ? `/register?ref=${referralCode}` : '/register';

  const ctaLinks = [
    { href: registerHref, label: t.nav.freeTraining, primary: true },
    { href: '/login', label: t.nav.login, primary: false },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-sm border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <TrendingUp className="w-8 h-8 text-gold" />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-lg text-white">
                Abundant Blessing <span className="text-gold">AI Trade</span>
              </span>
              <span className="text-xs text-white/50">BG Wealth Sharing</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/80 hover:text-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* Language Toggle */}
            <LanguageToggle />

            <div className="flex items-center gap-2 ml-2">
              {ctaLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                    link.primary
                      ? 'bg-gold text-navy-dark hover:bg-gold-light'
                      : 'border border-gold/30 text-gold hover:bg-gold/10'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gold/20">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-medium text-white/80 hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              {/* Language Toggle for Mobile */}
              <div className="py-2">
                <LanguageToggle />
              </div>

              <div className="flex flex-col gap-2 pt-2 border-t border-gold/20">
                {ctaLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-sm font-medium px-4 py-2 rounded-lg text-center transition-colors ${
                      link.primary
                        ? 'bg-gold text-navy-dark hover:bg-gold-light'
                        : 'border border-gold/30 text-gold hover:bg-gold/10'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
