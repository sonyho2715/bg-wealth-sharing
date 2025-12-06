import { Settings, User, Shield, Key } from 'lucide-react';
import { getSession } from '@/lib/auth';

export default async function SettingsPage() {
  const session = await getSession();

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-white/60">Manage your admin account settings</p>
      </div>

      {/* Account Info */}
      <div className="bg-navy border border-gold/20 rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gold/10">
            <User className="w-6 h-6 text-gold" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Account Information</h2>
            <p className="text-white/60 text-sm">Your admin account details</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white/60 text-sm mb-1">Name</label>
            <p className="text-white font-medium">
              {session.firstName} {session.lastName}
            </p>
          </div>
          <div>
            <label className="block text-white/60 text-sm mb-1">Email</label>
            <p className="text-white font-medium">{session.email}</p>
          </div>
          <div>
            <label className="block text-white/60 text-sm mb-1">Role</label>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-gold" />
              <p className="text-gold font-medium">Administrator</p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-navy border border-gold/20 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-blue-500/10">
            <Key className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Security</h2>
            <p className="text-white/60 text-sm">Manage your security settings</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-navy-dark rounded-xl border border-gold/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Password</p>
                <p className="text-white/50 text-sm">Last changed: Unknown</p>
              </div>
              <button
                disabled
                className="px-4 py-2 bg-white/5 text-white/50 rounded-lg text-sm cursor-not-allowed"
              >
                Change Password
              </button>
            </div>
          </div>

          <div className="p-4 bg-navy-dark rounded-xl border border-gold/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Two-Factor Authentication</p>
                <p className="text-white/50 text-sm">Add an extra layer of security</p>
              </div>
              <span className="px-3 py-1 bg-white/5 text-white/50 rounded-full text-xs">
                Coming Soon
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
