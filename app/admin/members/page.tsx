import {
  Users,
  UserCheck,
  UserX,
  Mail,
  Calendar,
  Hash,
  Pencil,
  ChevronLeft,
  ChevronRight,
  Search,
  UserPlus,
  ClipboardList,
  Activity,
  Clock,
  Filter,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { getMembers, toggleUserStatus, deleteUser } from '@/app/actions/admin';

export const dynamic = 'force-dynamic';
import { getMemberSegmentStats } from '@/app/actions/analytics';

interface PageProps {
  searchParams: Promise<{
    search?: string;
    status?: 'all' | 'active' | 'inactive';
    onboarding?: 'all' | 'not_started' | 'in_progress' | 'complete';
    activity?: 'all' | 'recent' | 'dormant' | 'at_risk';
    joinDate?: 'all' | 'this_week' | 'this_month' | 'earlier';
    page?: string;
  }>;
}

export default async function MembersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search || '';
  const status = params.status || 'all';
  const onboarding = params.onboarding || 'all';
  const activity = params.activity || 'all';
  const joinDate = params.joinDate || 'all';
  const page = parseInt(params.page || '1', 10);

  const [membersResult, segmentStats] = await Promise.all([
    getMembers({
      search,
      status: status as 'all' | 'active' | 'inactive',
      onboarding: onboarding as 'all' | 'not_started' | 'in_progress' | 'complete',
      activity: activity as 'all' | 'recent' | 'dormant' | 'at_risk',
      joinDate: joinDate as 'all' | 'this_week' | 'this_month' | 'earlier',
      page,
      limit: 10,
    }),
    getMemberSegmentStats(),
  ]);

  const { members, total, totalPages } = membersResult;

  // Check if any filters are active
  const hasActiveFilters = status !== 'all' || onboarding !== 'all' || activity !== 'all' || joinDate !== 'all' || search;

  const buildUrl = (newParams: Record<string, string | undefined>) => {
    const urlParams = new URLSearchParams();
    const merged = {
      search,
      status,
      onboarding,
      activity,
      joinDate,
      page: page.toString(),
      ...newParams,
    };

    Object.entries(merged).forEach(([key, value]) => {
      if (value && value !== 'all' && value !== '1' && value !== '') {
        urlParams.set(key, value);
      }
    });

    const queryString = urlParams.toString();
    return `/admin/members${queryString ? `?${queryString}` : ''}`;
  };

  // Filter chip configurations
  const statusFilters = [
    { value: 'all', label: 'All Status', count: segmentStats.onboardingNotStarted + segmentStats.onboardingInProgress + segmentStats.onboardingComplete },
    { value: 'active', label: 'Active', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
    { value: 'inactive', label: 'Inactive', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
  ];

  const onboardingFilters = [
    { value: 'all', label: 'All Onboarding' },
    { value: 'not_started', label: 'Not Started', count: segmentStats.onboardingNotStarted, color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
    { value: 'in_progress', label: 'In Progress', count: segmentStats.onboardingInProgress, color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
    { value: 'complete', label: 'Complete', count: segmentStats.onboardingComplete, color: 'bg-green-500/20 text-green-400 border-green-500/30' },
  ];

  const activityFilters = [
    { value: 'all', label: 'All Activity' },
    { value: 'recent', label: 'Recent (7d)', count: segmentStats.activeRecent, color: 'bg-green-500/20 text-green-400 border-green-500/30' },
    { value: 'dormant', label: 'Dormant (8-30d)', count: segmentStats.activeDormant, color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
    { value: 'at_risk', label: 'At Risk (30d+)', count: segmentStats.activeAtRisk, color: 'bg-red-500/20 text-red-400 border-red-500/30' },
  ];

  const joinDateFilters = [
    { value: 'all', label: 'All Dates' },
    { value: 'this_week', label: 'This Week', count: segmentStats.joinedThisWeek },
    { value: 'this_month', label: 'This Month', count: segmentStats.joinedThisMonth },
    { value: 'earlier', label: 'Earlier', count: segmentStats.joinedEarlier },
  ];

  return (
    <div className="max-w-7xl mx-auto">
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
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Link
          href={buildUrl({ status: undefined, page: undefined })}
          className={`bg-navy border rounded-xl p-4 transition-colors ${
            status === 'all' && !hasActiveFilters ? 'border-gold/50' : 'border-gold/20 hover:border-gold/40'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Total</p>
              <p className="text-2xl font-bold text-white">
                {segmentStats.onboardingNotStarted + segmentStats.onboardingInProgress + segmentStats.onboardingComplete}
              </p>
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
              <p className="text-2xl font-bold text-white">{segmentStats.activeRecent + segmentStats.activeDormant}</p>
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
              <p className="text-white/60 text-sm">At Risk</p>
              <p className="text-2xl font-bold text-white">{segmentStats.activeAtRisk}</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="bg-navy border border-gold/20 rounded-2xl p-6 mb-6 space-y-4">
        {/* Search Bar */}
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
          {/* Preserve other filters */}
          {status !== 'all' && <input type="hidden" name="status" value={status} />}
          {onboarding !== 'all' && <input type="hidden" name="onboarding" value={onboarding} />}
          {activity !== 'all' && <input type="hidden" name="activity" value={activity} />}
          {joinDate !== 'all' && <input type="hidden" name="joinDate" value={joinDate} />}
          <button
            type="submit"
            className="px-6 py-3 bg-gold text-navy-dark font-semibold rounded-lg hover:bg-gold-light transition-colors"
          >
            Search
          </button>
          {hasActiveFilters && (
            <Link
              href="/admin/members"
              className="px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors inline-flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Clear All
            </Link>
          )}
        </form>

        {/* Filter Chips */}
        <div className="space-y-3">
          {/* Onboarding Status */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 text-white/60 text-sm min-w-[100px]">
              <ClipboardList className="w-4 h-4" />
              <span>Onboarding:</span>
            </div>
            {onboardingFilters.map((filter) => (
              <Link
                key={filter.value}
                href={buildUrl({ onboarding: filter.value === 'all' ? undefined : filter.value, page: undefined })}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  onboarding === filter.value
                    ? 'bg-gold/20 text-gold border-gold/50'
                    : filter.color || 'bg-white/5 text-white/60 border-white/10 hover:border-white/30'
                }`}
              >
                {filter.label}
                {filter.count !== undefined && (
                  <span className="ml-1 opacity-70">({filter.count})</span>
                )}
              </Link>
            ))}
          </div>

          {/* Activity Status */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 text-white/60 text-sm min-w-[100px]">
              <Activity className="w-4 h-4" />
              <span>Activity:</span>
            </div>
            {activityFilters.map((filter) => (
              <Link
                key={filter.value}
                href={buildUrl({ activity: filter.value === 'all' ? undefined : filter.value, page: undefined })}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  activity === filter.value
                    ? 'bg-gold/20 text-gold border-gold/50'
                    : filter.color || 'bg-white/5 text-white/60 border-white/10 hover:border-white/30'
                }`}
              >
                {filter.label}
                {filter.count !== undefined && (
                  <span className="ml-1 opacity-70">({filter.count})</span>
                )}
              </Link>
            ))}
          </div>

          {/* Join Date */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 text-white/60 text-sm min-w-[100px]">
              <Calendar className="w-4 h-4" />
              <span>Joined:</span>
            </div>
            {joinDateFilters.map((filter) => (
              <Link
                key={filter.value}
                href={buildUrl({ joinDate: filter.value === 'all' ? undefined : filter.value, page: undefined })}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  joinDate === filter.value
                    ? 'bg-gold/20 text-gold border-gold/50'
                    : 'bg-white/5 text-white/60 border-white/10 hover:border-white/30'
                }`}
              >
                {filter.label}
                {filter.count !== undefined && (
                  <span className="ml-1 opacity-70">({filter.count})</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-navy border border-gold/20 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-gold/20 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">
            {hasActiveFilters ? 'Filtered Members' : 'All Members'}
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
                    <th className="text-left px-6 py-4 text-white/60 text-sm font-medium">Onboarding</th>
                    <th className="text-left px-6 py-4 text-white/60 text-sm font-medium">Activity</th>
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
                          <div>
                            <span className="text-white font-medium block">
                              {member.firstName} {member.lastName}
                            </span>
                            {member.referralCode && (
                              <span className="text-gold/60 text-xs font-mono">#{member.referralCode}</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-white/70">
                          <Mail className="w-4 h-4" />
                          <span className="text-sm">{member.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                            member.onboardingStatus === 'complete'
                              ? 'bg-green-500/20 text-green-400'
                              : member.onboardingStatus === 'in_progress'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-white/10 text-white/50'
                          }`}>
                            {member.onboardingStatus === 'complete'
                              ? 'Complete'
                              : member.onboardingStatus === 'in_progress'
                              ? `${member.stepsCompleted}/7`
                              : 'Not Started'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          member.activityStatus === 'recent'
                            ? 'bg-green-500/20 text-green-400'
                            : member.activityStatus === 'dormant'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          <Clock className="w-3 h-3" />
                          {member.activityStatus === 'recent'
                            ? 'Recent'
                            : member.activityStatus === 'dormant'
                            ? 'Dormant'
                            : 'At Risk'}
                        </div>
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
              {hasActiveFilters ? 'No members match the selected filters' : 'No members yet'}
            </p>
            {hasActiveFilters ? (
              <Link
                href="/admin/members"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4" />
                Clear Filters
              </Link>
            ) : (
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
