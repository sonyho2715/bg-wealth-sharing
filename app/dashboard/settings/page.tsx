'use client';

import { useState, useEffect } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Loader2, Save, Hash, Calendar, CheckCircle2, Link2, ExternalLink } from 'lucide-react';
import { getProfile, updateProfile, changePassword, updateReferralCode } from '@/app/actions/member';

interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  referralCode: string | null;
  createdAt: Date;
  lastLoginAt: Date | null;
}

export default function SettingsPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Profile form state
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMessage, setProfileMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Password form state
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Referral code form state
  const [referralSaving, setReferralSaving] = useState(false);
  const [referralMessage, setReferralMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    async function loadProfile() {
      const data = await getProfile();
      setProfile(data as Profile);
      setIsLoading(false);
    }
    loadProfile();
  }, []);

  async function handleProfileSubmit(formData: FormData) {
    setProfileSaving(true);
    setProfileMessage(null);

    const result = await updateProfile(formData);

    if (result.success) {
      setProfileMessage({ type: 'success', text: 'Profile updated successfully' });
      // Reload profile
      const data = await getProfile();
      setProfile(data as Profile);
    } else {
      setProfileMessage({ type: 'error', text: result.error || 'Failed to update profile' });
    }

    setProfileSaving(false);
  }

  async function handlePasswordSubmit(formData: FormData) {
    setPasswordSaving(true);
    setPasswordMessage(null);

    const result = await changePassword(formData);

    if (result.success) {
      setPasswordMessage({ type: 'success', text: result.message || 'Password changed successfully' });
      // Clear form
      const form = document.getElementById('password-form') as HTMLFormElement;
      form?.reset();
    } else {
      setPasswordMessage({ type: 'error', text: result.error || 'Failed to change password' });
    }

    setPasswordSaving(false);
  }

  async function handleReferralSubmit(formData: FormData) {
    setReferralSaving(true);
    setReferralMessage(null);

    const result = await updateReferralCode(formData);

    if (result.success) {
      setReferralMessage({ type: 'success', text: result.message || 'DSJ invitation code updated successfully' });
      // Reload profile
      const data = await getProfile();
      setProfile(data as Profile);
    } else {
      setReferralMessage({ type: 'error', text: result.error || 'Failed to update invitation code' });
    }

    setReferralSaving(false);
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <p className="text-white/60">Unable to load profile</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-white/60">Manage your account settings and preferences</p>
      </div>

      {/* Profile Information */}
      <div className="bg-navy border border-gold/20 rounded-2xl p-8 mb-6">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <User className="w-5 h-5 text-gold" />
          Profile Information
        </h2>

        <form action={handleProfileSubmit} className="space-y-6">
          {profileMessage && (
            <div className={`p-4 rounded-lg border ${
              profileMessage.type === 'success'
                ? 'bg-green-500/10 border-green-500/30 text-green-400'
                : 'bg-red-500/10 border-red-500/30 text-red-400'
            }`}>
              <div className="flex items-center gap-2">
                {profileMessage.type === 'success' && <CheckCircle2 className="w-5 h-5" />}
                <p className="text-sm">{profileMessage.text}</p>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
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
                  defaultValue={profile.firstName}
                  className="w-full pl-12 pr-4 py-3 bg-navy-dark border border-gold/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>
            </div>

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
                  defaultValue={profile.lastName}
                  className="w-full pl-12 pr-4 py-3 bg-navy-dark border border-gold/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>
            </div>
          </div>

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
                defaultValue={profile.email}
                className="w-full pl-12 pr-4 py-3 bg-navy-dark border border-gold/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={profileSaving}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gold text-navy-dark font-semibold rounded-lg hover:bg-gold-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {profileSaving ? (
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
        </form>
      </div>

      {/* DSJ Invitation Code */}
      <div className="bg-navy border border-gold/20 rounded-2xl p-8 mb-6">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <Link2 className="w-5 h-5 text-gold" />
          DSJ Invitation Code
        </h2>

        <form action={handleReferralSubmit} className="space-y-6">
          {referralMessage && (
            <div className={`p-4 rounded-lg border ${
              referralMessage.type === 'success'
                ? 'bg-green-500/10 border-green-500/30 text-green-400'
                : 'bg-red-500/10 border-red-500/30 text-red-400'
            }`}>
              <div className="flex items-center gap-2">
                {referralMessage.type === 'success' && <CheckCircle2 className="w-5 h-5" />}
                <p className="text-sm">{referralMessage.text}</p>
              </div>
            </div>
          )}

          <div>
            <label htmlFor="referralCode" className="block text-white/80 text-sm font-medium mb-2">
              Your DSJ Invitation Code
            </label>
            <div className="relative">
              <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                id="referralCode"
                name="referralCode"
                required
                defaultValue={profile.referralCode || ''}
                className="w-full pl-12 pr-4 py-3 bg-navy-dark border border-gold/20 rounded-lg text-white font-mono placeholder-white/40 focus:outline-none focus:border-gold/50 transition-colors"
                placeholder="e.g., apdpva27vg00"
              />
            </div>
            <p className="text-white/50 text-xs mt-2">
              Get this from DSJ app: Share With Friends → My invitation code
            </p>
          </div>

          {profile.referralCode && (
            <div className="p-4 bg-gold/10 border border-gold/20 rounded-lg">
              <p className="text-white/70 text-sm mb-2">Your invitation link:</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-gold text-sm font-mono break-all">
                  https://dsj927.com/?code={profile.referralCode}
                </code>
                <a
                  href={`https://dsj927.com/?code=${profile.referralCode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gold hover:text-gold-light transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={referralSaving}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gold text-navy-dark font-semibold rounded-lg hover:bg-gold-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {referralSaving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Invitation Code
              </>
            )}
          </button>
        </form>
      </div>

      {/* Account Info (Read Only) */}
      <div className="bg-navy border border-gold/20 rounded-2xl p-8 mb-6">
        <h2 className="text-xl font-semibold text-white mb-6">Account Information</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-navy-dark rounded-lg border border-gold/10">
            <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
              <Calendar className="w-4 h-4" />
              Member Since
            </div>
            <p className="text-white font-medium">
              {new Date(profile.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          <div className="p-4 bg-navy-dark rounded-lg border border-gold/10">
            <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
              <Calendar className="w-4 h-4" />
              Last Login
            </div>
            <p className="text-white font-medium">
              {profile.lastLoginAt
                ? new Date(profile.lastLoginAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : 'Never'}
            </p>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-navy border border-gold/20 rounded-2xl p-8">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <Lock className="w-5 h-5 text-gold" />
          Change Password
        </h2>

        <form id="password-form" action={handlePasswordSubmit} className="space-y-6">
          {passwordMessage && (
            <div className={`p-4 rounded-lg border ${
              passwordMessage.type === 'success'
                ? 'bg-green-500/10 border-green-500/30 text-green-400'
                : 'bg-red-500/10 border-red-500/30 text-red-400'
            }`}>
              <div className="flex items-center gap-2">
                {passwordMessage.type === 'success' && <CheckCircle2 className="w-5 h-5" />}
                <p className="text-sm">{passwordMessage.text}</p>
              </div>
            </div>
          )}

          <div>
            <label htmlFor="currentPassword" className="block text-white/80 text-sm font-medium mb-2">
              Current Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                id="currentPassword"
                name="currentPassword"
                required
                className="w-full pl-12 pr-12 py-3 bg-navy-dark border border-gold/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-gold/50 transition-colors"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
              >
                {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-white/80 text-sm font-medium mb-2">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type={showNewPassword ? 'text' : 'password'}
                id="newPassword"
                name="newPassword"
                required
                minLength={6}
                className="w-full pl-12 pr-12 py-3 bg-navy-dark border border-gold/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-gold/50 transition-colors"
                placeholder="Min 6 characters"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
              >
                {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-white/80 text-sm font-medium mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type={showNewPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                required
                minLength={6}
                className="w-full pl-12 pr-4 py-3 bg-navy-dark border border-gold/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-gold/50 transition-colors"
                placeholder="Confirm new password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={passwordSaving}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gold text-navy-dark font-semibold rounded-lg hover:bg-gold-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {passwordSaving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Changing...
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                Change Password
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
