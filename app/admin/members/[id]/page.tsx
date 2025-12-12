'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { UserCog, Mail, Lock, User, ArrowLeft, Eye, EyeOff, Loader2, Hash, Save } from 'lucide-react';
import Link from 'next/link';
import { getMember, updateMember } from '@/app/actions/admin';

interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  referralCode: string | null;
  isActive: boolean;
  createdAt: Date;
  lastLoginAt: Date | null;
}

export default function EditMemberPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;

  const [member, setMember] = useState<Member | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadMember() {
      try {
        const data = await getMember(userId);
        setMember(data as Member);
      } catch (e) {
        setError('Failed to load member');
      } finally {
        setIsLoading(false);
      }
    }
    loadMember();
  }, [userId]);

  async function handleSubmit(formData: FormData) {
    setIsSaving(true);
    setError('');

    try {
      formData.append('userId', userId);
      const result = await updateMember(formData);
      if (result?.error) {
        setError(result.error);
        setIsSaving(false);
      }
    } catch (e) {
      setError('Failed to update member');
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
      </div>
    );
  }

  if (!member) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <p className="text-white/60">Member not found</p>
        <Link href="/admin/members" className="text-gold hover:text-gold-light mt-4 inline-block">
          Back to Members
        </Link>
      </div>
    );
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
        <h1 className="text-3xl font-bold text-white mb-2">Edit Member</h1>
        <p className="text-white/60">Update {member.firstName} {member.lastName}'s account</p>
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
                  defaultValue={member.firstName}
                  className="w-full pl-12 pr-4 py-3 bg-navy-dark border border-gold/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-gold/50 transition-colors"
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
                  defaultValue={member.lastName}
                  className="w-full pl-12 pr-4 py-3 bg-navy-dark border border-gold/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-gold/50 transition-colors"
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
                defaultValue={member.email}
                className="w-full pl-12 pr-4 py-3 bg-navy-dark border border-gold/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>
          </div>

          {/* Referral Code */}
          <div>
            <label htmlFor="referralCode" className="block text-white/80 text-sm font-medium mb-2">
              Referral Code
            </label>
            <div className="relative">
              <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                id="referralCode"
                name="referralCode"
                defaultValue={member.referralCode || ''}
                className="w-full pl-12 pr-4 py-3 bg-navy-dark border border-gold/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-gold/50 transition-colors"
                placeholder="e.g., BG123456"
              />
            </div>
          </div>

          {/* New Password */}
          <div>
            <label htmlFor="newPassword" className="block text-white/80 text-sm font-medium mb-2">
              New Password <span className="text-white/40">(leave blank to keep current)</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="newPassword"
                name="newPassword"
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

          {/* Member Info */}
          <div className="p-4 bg-navy-dark rounded-lg border border-gold/10">
            <h3 className="text-white/60 text-sm font-medium mb-3">Account Info</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-white/40">Status</p>
                <p className={member.isActive ? 'text-green-400' : 'text-red-400'}>
                  {member.isActive ? 'Active' : 'Inactive'}
                </p>
              </div>
              <div>
                <p className="text-white/40">Joined</p>
                <p className="text-white">{new Date(member.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-white/40">Last Login</p>
                <p className="text-white">
                  {member.lastLoginAt ? new Date(member.lastLoginAt).toLocaleDateString() : 'Never'}
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gold text-navy-dark font-semibold rounded-lg hover:bg-gold-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
