'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  TrendingUp,
  Home,
  ClipboardList,
  Radio,
  BookOpen,
  LogOut,
  Menu,
  X,
  ChevronRight,
  User,
  Settings,
  Calculator,
  Share2,
} from 'lucide-react';
import { logout } from '@/app/actions/auth';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import LanguageToggle from '@/components/ui/LanguageToggle';

interface SidebarProps {
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { href: '/dashboard', icon: Home, label: t.dashboard.sidebar.dashboard },
    { href: '/dashboard/onboarding', icon: ClipboardList, label: t.dashboard.sidebar.onboarding },
    { href: '/dashboard/signals', icon: Radio, label: t.dashboard.sidebar.signals },
    { href: '/dashboard/calculators', icon: Calculator, label: t.dashboard.sidebar.calculators },
    { href: '/dashboard/resources', icon: BookOpen, label: t.dashboard.sidebar.resources },
    { href: '/dashboard/referrals', icon: Share2, label: t.dashboard.sidebar.referrals },
    { href: '/dashboard/settings', icon: Settings, label: t.dashboard.sidebar.settings },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-navy border border-gold/20 rounded-lg text-white"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-navy border-r border-gold/20 z-40 transform transition-transform lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gold/20">
          <Link href="/dashboard" className="flex items-center gap-2">
            <TrendingUp className="w-8 h-8 text-gold" />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-sm text-white">
                Abundant Blessing <span className="text-gold">AI Trade</span>
              </span>
              <span className="text-xs text-white/50">BG Wealth Sharing</span>
            </div>
          </Link>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-gold/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
              <User className="w-5 h-5 text-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-white/50 text-sm truncate">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Language Toggle */}
        <div className="p-4 border-b border-gold/20">
          <div className="flex items-center justify-between">
            <span className="text-white/60 text-sm">{t.dashboard.settings.language}</span>
            <LanguageToggle />
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-gold/10 text-gold border border-gold/30'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gold/20">
          <form action={logout}>
            <button
              type="submit"
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-white/70 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">{t.dashboard.sidebar.logout}</span>
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
