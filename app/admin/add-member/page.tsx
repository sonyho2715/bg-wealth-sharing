'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserPlus, Mail, Lock, User, ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { addMember } from '@/app/actions/admin';

export default function AddMemberPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError('');

    try {
      const result = await addMember(formData);
      if (result?.error) {
        setError(result.error);
        setIsLoading(false);
      }
    } catch (e) {
      setError('Failed to add member');
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back Button */}
      <Link
        href="/admin/members"
        className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Members
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Add New Member</h1>
        <p className="text-white/60">Create a new team member account</p>
      </div>

      {/* Form */}
      <div className="bg-navy border border-gold/20 rounded-2xl p-8">
        <form action={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-white/80 text-sm font-medium mb-2">
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-navy-dark border border-gold/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-gold/50 transition-colors"
                  placeholder="John"
                />
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-white/80 text-sm font-medium mb-2">
                Last Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-navy-dark border border-gold/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-gold/50 transition-colors"
                  placeholder="Doe"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-white/80 text-sm font-medium mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full pl-12 pr-4 py-3 bg-navy-dark border border-gold/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-gold/50 transition-colors"
                placeholder="john@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-white/80 text-sm font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                required
                minLength={6}
                className="w-full pl-12 pr-12 py-3 bg-navy-dark border border-gold/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-gold/50 transition-colors"
                placeholder="Min 6 characters"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gold text-navy-dark font-semibold rounded-lg hover:bg-gold-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Create Member Account
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Help Text */}
      <p className="text-center text-white/40 text-sm mt-6">
        The member will receive their login credentials and can access the member dashboard.
      </p>
    </div>
  );
}
