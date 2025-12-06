'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, TrendingUp } from 'lucide-react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '#overview', label: 'Overview' },
    { href: '#about', label: 'About Lee' },
    { href: '#testimonials', label: 'Success Stories' },
    { href: '/login', label: 'Member Login' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-sm border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <TrendingUp className="w-8 h-8 text-gold" />
            <span className="font-bold text-xl text-white">
              BG Wealth <span className="text-gold">Sharing</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  link.href === '/login'
                    ? 'bg-gold text-navy-dark px-4 py-2 rounded-lg hover:bg-gold-light'
                    : 'text-white/80 hover:text-gold'
                }`}
              >
                {link.label}
              </Link>
            ))}
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
                  className={`text-sm font-medium transition-colors ${
                    link.href === '/login'
                      ? 'bg-gold text-navy-dark px-4 py-2 rounded-lg hover:bg-gold-light text-center'
                      : 'text-white/80 hover:text-gold'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
