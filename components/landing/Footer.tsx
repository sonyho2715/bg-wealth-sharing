'use client';

import Link from 'next/link';
import { TrendingUp, Mail, MessageCircle, Shield, AlertTriangle } from 'lucide-react';
import { CONFIG } from '@/lib/config';

export default function Footer() {
  return (
    <footer className="bg-navy border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-8 h-8 text-gold" />
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-xl text-white">
                  {CONFIG.brand.teamName.split(' ').slice(0, 2).join(' ')} <span className="text-gold">{CONFIG.brand.teamName.split(' ').slice(2).join(' ')}</span>
                </span>
                <span className="text-xs text-white/50">{CONFIG.brand.name}</span>
              </div>
            </Link>
            <p className="text-white/60 max-w-md mb-4">
              Join Abundant Blessing AI Trade and start your journey to financial growth.
              Our proven Win-Win-Win model has helped members build sustainable income streams.
            </p>
            <div className="flex items-center gap-2 text-sm text-gold">
              <Shield className="w-4 h-4" />
              <span>Secure Platform</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#overview" className="text-white/60 hover:text-gold transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#dsjex-explained" className="text-white/60 hover:text-gold transition-colors">
                  How DSJEX Works
                </a>
              </li>
              <li>
                <a href="#team" className="text-white/60 hover:text-gold transition-colors">
                  Our Team
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-white/60 hover:text-gold transition-colors">
                  Success Stories
                </a>
              </li>
              <li>
                <Link href="/register" className="text-gold hover:text-gold-light transition-colors font-medium">
                  Free Live Training
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-white/60 hover:text-gold transition-colors">
                  Member Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${CONFIG.contact.email}`}
                  className="flex items-center gap-2 text-white/60 hover:text-gold transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>{CONFIG.contact.email}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-white/60">
                  <MessageCircle className="w-4 h-4 mt-0.5" />
                  <div className="text-sm">
                    <p>Connect with your leader</p>
                    <p className="text-white/40 text-xs">via Facebook group chat</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Risk Disclosure */}
        <div className="mt-8 p-4 bg-navy-dark/50 border border-gold/10 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-gold/60 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-white/50 leading-relaxed">
              <span className="text-gold/70 font-medium">Risk Disclosure:</span> {CONFIG.legal.riskDisclosure}
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-gold/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            {CONFIG.legal.copyright}
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-white/40 hover:text-gold transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-white/40 hover:text-gold transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-white/40 hover:text-gold transition-colors">
              Disclaimer
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
