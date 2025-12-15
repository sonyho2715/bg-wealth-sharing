'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TrendingUp, Eye, EyeOff, ArrowLeft, Lock, Mail } from 'lucide-react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { login } from '@/app/actions/auth';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Get reCAPTCHA token
    let recaptchaToken = '';
    if (executeRecaptcha) {
      try {
        recaptchaToken = await executeRecaptcha('login');
      } catch (err) {
        console.error('reCAPTCHA error:', err);
      }
    }

    const formData = new FormData(e.currentTarget);
    formData.append('recaptchaToken', recaptchaToken);
    const result = await login(formData);

    if (result.success) {
      router.push(result.redirectTo || '/dashboard');
      router.refresh();
    } else {
      setError(result.error || 'Login failed');
      setIsLoading(false);
    }
  }, [executeRecaptcha, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-dark via-navy to-navy-dark flex items-center justify-center px-4">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-gold transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Login Card */}
        <div className="bg-navy border border-gold/20 rounded-2xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <TrendingUp className="w-10 h-10 text-gold" />
              <span className="font-bold text-2xl text-white">
                BG Wealth <span className="text-gold">Sharing</span>
              </span>
            </div>
            <h1 className="text-xl font-semibold text-white">Member Login</h1>
            <p className="text-white/60 text-sm mt-1">
              Access your onboarding dashboard
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-6">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full bg-navy-dark border border-gold/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-gold/50 transition-colors"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-white/80">
                  Password
                </label>
                <Link href="/forgot-password" className="text-sm text-gold hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="w-full bg-navy-dark border border-gold/20 rounded-lg pl-10 pr-12 py-3 text-white placeholder-white/40 focus:outline-none focus:border-gold/50 transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gold text-navy-dark font-semibold py-3 rounded-lg hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-navy-dark/30 border-t-navy-dark rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Register link */}
          <p className="text-center text-white/60 text-sm mt-6">
            New member?{' '}
            <Link href="/register" className="text-gold hover:underline font-medium">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
