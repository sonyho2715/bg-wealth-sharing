'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  TrendingUp,
  Eye,
  EyeOff,
  ArrowLeft,
  Lock,
  Mail,
  User,
  Phone,
  UserPlus,
} from 'lucide-react';
import { register } from '@/app/actions/auth';

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [referralCode, setReferralCode] = useState('');

  // Pre-fill referral code from URL if present
  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) {
      setReferralCode(ref);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const result = await register(formData);

    if (result.success) {
      router.push(result.redirectTo || '/dashboard');
      router.refresh();
    } else {
      setError(result.error || 'Registration failed');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-dark via-navy to-navy-dark flex items-center justify-center px-4 py-8">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-gold transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Register Card */}
        <div className="bg-navy border border-gold/20 rounded-2xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 mb-3">
              <TrendingUp className="w-10 h-10 text-gold" />
              <span className="font-bold text-2xl text-white">
                BG Wealth <span className="text-gold">Sharing</span>
              </span>
            </div>
            <h1 className="text-xl font-semibold text-white">New Member Registration</h1>
            <p className="text-white/60 text-sm mt-1">
              Join the Lee Meadows team and start your journey
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-6">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-white/80 mb-1.5">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className="w-full bg-navy-dark border border-gold/20 rounded-lg pl-10 pr-3 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-gold/50 transition-colors text-sm"
                    placeholder="First"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-white/80 mb-1.5">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className="w-full bg-navy-dark border border-gold/20 rounded-lg px-3 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-gold/50 transition-colors text-sm"
                  placeholder="Last"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="w-full bg-navy-dark border border-gold/20 rounded-lg pl-10 pr-3 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-gold/50 transition-colors text-sm"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full bg-navy-dark border border-gold/20 rounded-lg pl-10 pr-3 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-gold/50 transition-colors text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Referral Code (hidden if pre-filled) */}
            <input
              type="hidden"
              name="referralCode"
              value={referralCode}
            />

            {/* Who's Your Leader */}
            <div>
              <label htmlFor="referredBy" className="block text-sm font-medium text-white/80 mb-1.5">
                Who&apos;s Your Leader?
              </label>
              <div className="relative">
                <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  id="referredBy"
                  name="referredBy"
                  type="text"
                  required
                  className="w-full bg-navy-dark border border-gold/20 rounded-lg pl-10 pr-3 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-gold/50 transition-colors text-sm"
                  placeholder="Enter your leader's name"
                />
              </div>
              <p className="text-white/40 text-xs mt-1">
                Enter the name of the person who invited you
              </p>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="w-full bg-navy-dark border border-gold/20 rounded-lg pl-10 pr-10 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-gold/50 transition-colors text-sm"
                  placeholder="Minimum 6 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/80 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  className="w-full bg-navy-dark border border-gold/20 rounded-lg pl-10 pr-10 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-gold/50 transition-colors text-sm"
                  placeholder="Re-enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gold text-navy-dark font-semibold py-3 rounded-lg hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-navy-dark/30 border-t-navy-dark rounded-full animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* Login link */}
          <p className="text-center text-white/60 text-sm mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-gold hover:underline font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
