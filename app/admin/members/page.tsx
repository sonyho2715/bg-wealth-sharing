import { db } from '@/lib/db';
import { Users, Search, Filter, UserCheck, UserX, Mail, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import { toggleUserStatus, deleteUser } from '@/app/actions/admin';

async function getMembers() {
  const members = await db.user.findMany({
    where: { role: 'MEMBER' },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      isActive: true,
      createdAt: true,
      lastLoginAt: true,
    },
  });
  return members;
}

export default async function MembersPage() {
  const members = await getMembers();

  const activeCount = members.filter(m => m.isActive).length;
  const inactiveCount = members.filter(m => !m.isActive).length;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Members</h1>
          <p className="text-white/60">Manage your team members</p>
        </div>
        <Link
          href="/admin/add-member"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy-dark font-semibold rounded-lg hover:bg-gold-light transition-colors"
        >
          <Users className="w-5 h-5" />
          Add New Member
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-navy border border-gold/20 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Total</p>
              <p className="text-2xl font-bold text-white">{members.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-navy border border-gold/20 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/10">
              <UserCheck className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Active</p>
              <p className="text-2xl font-bold text-white">{activeCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-navy border border-gold/20 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-500/10">
              <UserX className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Inactive</p>
              <p className="text-2xl font-bold text-white">{inactiveCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-navy border border-gold/20 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-gold/20">
          <h2 className="text-xl font-semibold text-white">All Members</h2>
        </div>

        {members.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gold/10">
                  <th className="text-left px-6 py-4 text-white/60 text-sm font-medium">Member</th>
                  <th className="text-left px-6 py-4 text-white/60 text-sm font-medium">Email</th>
                  <th className="text-left px-6 py-4 text-white/60 text-sm font-medium">Joined</th>
                  <th className="text-left px-6 py-4 text-white/60 text-sm font-medium">Last Login</th>
                  <th className="text-left px-6 py-4 text-white/60 text-sm font-medium">Status</th>
                  <th className="text-right px-6 py-4 text-white/60 text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id} className="border-b border-gold/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                          <span className="text-gold font-semibold text-sm">
                            {member.firstName[0]}{member.lastName[0]}
                          </span>
                        </div>
                        <span className="text-white font-medium">
                          {member.firstName} {member.lastName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-white/70">
                        <Mail className="w-4 h-4" />
                        <span>{member.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-white/50 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(member.createdAt).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-white/50 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>
                          {member.lastLoginAt
                            ? new Date(member.lastLoginAt).toLocaleDateString()
                            : 'Never'
                          }
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          member.isActive
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {member.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <form action={toggleUserStatus}>
                          <input type="hidden" name="userId" value={member.id} />
                          <input type="hidden" name="currentStatus" value={member.isActive.toString()} />
                          <button
                            type="submit"
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                              member.isActive
                                ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                                : 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                            }`}
                          >
                            {member.isActive ? 'Deactivate' : 'Activate'}
                          </button>
                        </form>
                        <form action={deleteUser}>
                          <input type="hidden" name="userId" value={member.id} />
                          <button
                            type="submit"
                            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 text-white/50 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                          >
                            Delete
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <Users className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/40 mb-4">No members yet</p>
            <Link
              href="/admin/add-member"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gold text-navy-dark font-medium rounded-lg hover:bg-gold-light transition-colors"
            >
              Add First Member
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
