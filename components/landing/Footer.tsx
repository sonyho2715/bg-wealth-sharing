'use client';

import Link from 'next/link';
import { TrendingUp, Mail, MessageCircle, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-8 h-8 text-gold" />
              <span className="font-bold text-xl text-white">
                BG Wealth <span className="text-gold">Sharing</span>
              </span>
            </Link>
            <p className="text-white/60 max-w-md mb-4">
              Join the Lee Meadows Team and start your journey to financial freedom.
              Our proven Win-Win-Win model has helped thousands achieve their investment goals.
            </p>
            <div className="flex items-center gap-2 text-sm text-gold">
              <Shield className="w-4 h-4" />
              <span>Secure & Trusted Platform</span>
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
                <a href="#about" className="text-white/60 hover:text-gold transition-colors">
                  About Lee Meadows
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-white/60 hover:text-gold transition-colors">
                  Success Stories
                </a>
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
                  href="mailto:support@bgwealth.com"
                  className="flex items-center gap-2 text-white/60 hover:text-gold transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>support@bgwealth.com</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-white/60 hover:text-gold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Bonchat: S333666</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gold/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} BG Wealth Sharing - Lee Meadows Team. All rights reserved.
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
