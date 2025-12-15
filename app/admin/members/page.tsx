import { Users, UserCheck, UserX, Mail, Calendar, Hash, Pencil, ChevronLeft, ChevronRight, Search, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { getMembers, toggleUserStatus, deleteUser } from '@/app/actions/admin';

interface PageProps {
  searchParams: Promise<{
    search?: string;
    status?: 'all' | 'active' | 'inactive';
    page?: string;
  }>;
}

export default async function MembersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search || '';
  const status = params.status || 'all';
  const page = parseInt(params.page || '1', 10);

  const { members, total, totalPages } = await getMembers({
    search,
    status: status as 'all' | 'active' | 'inactive',
    page,
    limit: 10,
  });

  // Get stats for all members (unfiltered)
  const allStats = await getMembers({ status: 'all', page: 1, limit: 1 });
  const activeStats = await getMembers({ status: 'active', page: 1, limit: 1 });
  const inactiveStats = await getMembers({ status: 'inactive', page: 1, limit: 1 });

  const buildUrl = (newParams: Record<string, string | undefined>) => {
    const urlParams = new URLSearchParams();
    const merged = { search, status, page: page.toString(), ...newParams };

    Object.entries(merged).forEach(([key, value]) => {
      if (value && value !== 'all' && value !== '1' && value !== '') {
        urlParams.set(key, value);
      }
    });

    const queryString = urlParams.toString();
    return `/admin/members${queryString ? `?${queryString}` : ''}`;
  };

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
        <Link
          href={buildUrl({ status: undefined, page: undefined })}
          className={`bg-navy border rounded-xl p-4 transition-colors ${
            status === 'all' ? 'border-gold/50' : 'border-gold/20 hover:border-gold/40'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Total</p>
              <p className="text-2xl font-bold text-white">{allStats.total}</p>
            </div>
          </div>
        </Link>
        <Link
          href={buildUrl({ status: 'active', page: undefined })}
          className={`bg-navy border rounded-xl p-4 transition-colors ${
            status === 'active' ? 'border-gold/50' : 'border-gold/20 hover:border-gold/40'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/10">
              <UserCheck className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Active</p>
              <p className="text-2xl font-bold text-white">{activeStats.total}</p>
            </div>
          </div>
        </Link>
        <Link
          href={buildUrl({ status: 'inactive', page: undefined })}
          className={`bg-navy border rounded-xl p-4 transition-colors ${
            status === 'inactive' ? 'border-gold/50' : 'border-gold/20 hover:border-gold/40'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-500/10">
              <UserX className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Inactive</p>
              <p className="text-2xl font-bold text-white">{inactiveStats.total}</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="bg-navy border border-gold/20 rounded-2xl p-6 mb-6">
        <form method="get" className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              name="search"
              defaultValue={search}
              placeholder="Search by name or email..."
              className="w-full pl-12 pr-4 py-3 bg-navy-dark border border-gold/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-gold/50 transition-colors"
            />
          </div>
          <input type="hidden" name="status" value={status} />
          <button
            type="submit"
            className="px-6 py-3 bg-gold text-navy-dark font-semibold rounded-lg hover:bg-gold-light transition-colors"
          >
            Search
          </button>
          {search && (
            <Link
              href={buildUrl({ search: undefined, page: undefined })}
              className="px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors"
            >
              Clear
            </Link>
          )}
        </form>
      </div>

      {/* Members Table */}
      <div className="bg-navy border border-gold/20 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-gold/20 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">
            {status === 'all' ? 'All Members' : status === 'active' ? 'Active Members' : 'Inactive Members'}
            {search && <span className="text-white/60 font-normal ml-2">matching "{search}"</span>}
          </h2>
          <span className="text-white/60 text-sm">
            Showing {members.length} of {total} members
          </span>
        </div>

        {members.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gold/10">
                    <th className="text-left px-6 py-4 text-white/60 text-sm font-medium">Member</th>
                    <th className="text-left px-6 py-4 text-white/60 text-sm font-medium">Email</th>
                    <th className="text-left px-6 py-4 text-white/60 text-sm font-medium">Referred By</th>
                    <th className="text-left px-6 py-4 text-white/60 text-sm font-medium">DSJ Code</th>
                    <th className="text-left px-6 py-4 text-white/60 text-sm font-medium">Joined</th>
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
                        {member.referredBy ? (
                          <div className="flex items-center gap-2 text-white/70 text-sm">
                            <UserPlus className="w-4 h-4 text-gold" />
                            <span>{member.referredBy}</span>
                          </div>
                        ) : (
                          <span className="text-white/30 text-sm">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {member.referralCode ? (
                          <div className="flex items-center gap-2 text-gold text-sm font-mono">
                            <Hash className="w-4 h-4" />
                            <span>{member.referralCode}</span>
                          </div>
                        ) : (
                          <span className="text-white/30 text-sm">Not set</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-white/50 text-sm">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(member.createdAt).toLocaleDateString()}</span>
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
                          <Link
                            href={`/admin/members/${member.id}`}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gold/10 text-gold hover:bg-gold/20 transition-colors inline-flex items-center gap-1"
                          >
                            <Pencil className="w-3 h-3" />
                            Edit
                          </Link>
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="p-6 border-t border-gold/10 flex items-center justify-between">
                <p className="text-white/60 text-sm">
                  Page {page} of {totalPages}
                </p>
                <div className="flex items-center gap-2">
                  {page > 1 ? (
                    <Link
                      href={buildUrl({ page: (page - 1).toString() })}
                      className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors inline-flex items-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </Link>
                  ) : (
                    <span className="px-4 py-2 rounded-lg bg-white/5 text-white/30 cursor-not-allowed inline-flex items-center gap-1">
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </span>
                  )}

                  {/* Page numbers */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum: number;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (page <= 3) {
                        pageNum = i + 1;
                      } else if (page >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = page - 2 + i;
                      }

                      return (
                        <Link
                          key={pageNum}
                          href={buildUrl({ page: pageNum.toString() })}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                            pageNum === page
                              ? 'bg-gold text-navy-dark'
                              : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                        >
                          {pageNum}
                        </Link>
                      );
                    })}
                  </div>

                  {page < totalPages ? (
                    <Link
                      href={buildUrl({ page: (page + 1).toString() })}
                      className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors inline-flex items-center gap-1"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <span className="px-4 py-2 rounded-lg bg-white/5 text-white/30 cursor-not-allowed inline-flex items-center gap-1">
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="p-12 text-center">
            <Users className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/40 mb-4">
              {search ? `No members found matching "${search}"` : 'No members yet'}
            </p>
            {!search && (
              <Link
                href="/admin/add-member"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gold text-navy-dark font-medium rounded-lg hover:bg-gold-light transition-colors"
              >
                Add First Member
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
