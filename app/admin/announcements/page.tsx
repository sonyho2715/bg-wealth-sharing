import { db } from '@/lib/db';
import { Megaphone, Plus, Calendar, Clock, AlertTriangle, Video, Bell, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { toggleAnnouncementStatus, deleteAnnouncement } from '@/app/actions/announcements';

async function getAnnouncements() {
  const announcements = await db.announcement.findMany({
    orderBy: [
      { priority: 'desc' },
      { createdAt: 'desc' },
    ],
  });
  return announcements;
}

const typeConfig = {
  GENERAL: { icon: Bell, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  EVENT: { icon: Calendar, color: 'text-green-400', bg: 'bg-green-500/10' },
  ZOOM: { icon: Video, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  URGENT: { icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/10' },
};

export default async function AnnouncementsPage() {
  const announcements = await getAnnouncements();
  const activeCount = announcements.filter(a => a.isActive).length;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Announcements</h1>
          <p className="text-white/60">Create and manage announcements for members</p>
        </div>
        <Link
          href="/admin/announcements/new"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy-dark font-semibold rounded-lg hover:bg-gold-light transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Announcement
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-navy border border-gold/20 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Megaphone className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Total</p>
              <p className="text-2xl font-bold text-white">{announcements.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-navy border border-gold/20 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/10">
              <Bell className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Active</p>
              <p className="text-2xl font-bold text-white">{activeCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-navy border border-gold/20 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Video className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Zoom Calls</p>
              <p className="text-2xl font-bold text-white">{announcements.filter(a => a.type === 'ZOOM').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-navy border border-gold/20 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-500/10">
              <Calendar className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Events</p>
              <p className="text-2xl font-bold text-white">{announcements.filter(a => a.type === 'EVENT').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Announcements List */}
      <div className="bg-navy border border-gold/20 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-gold/20">
          <h2 className="text-xl font-semibold text-white">All Announcements</h2>
        </div>

        {announcements.length > 0 ? (
          <div className="divide-y divide-gold/10">
            {announcements.map((announcement) => {
              const config = typeConfig[announcement.type];
              const TypeIcon = config.icon;
              const isExpired = announcement.expiresAt && new Date(announcement.expiresAt) < new Date();

              return (
                <div
                  key={announcement.id}
                  className={`p-6 hover:bg-white/5 transition-colors ${!announcement.isActive || isExpired ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${config.bg}`}>
                        <TypeIcon className={`w-6 h-6 ${config.color}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-semibold text-white">{announcement.title}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
                            {announcement.type}
                          </span>
                          {announcement.priority > 0 && (
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gold/20 text-gold">
                              Priority: {announcement.priority}
                            </span>
                          )}
                          {isExpired && (
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-500/20 text-red-400">
                              Expired
                            </span>
                          )}
                        </div>
                        <p className="text-white/70 mb-2">{announcement.message}</p>
                        <div className="flex items-center gap-4 text-sm text-white/50">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {new Date(announcement.createdAt).toLocaleDateString()}
                          </span>
                          {announcement.expiresAt && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Expires: {new Date(announcement.expiresAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/announcements/${announcement.id}`}
                        className="p-2 rounded-lg text-white/50 hover:text-gold hover:bg-gold/10 transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-5 h-5" />
                      </Link>
                      <form action={toggleAnnouncementStatus}>
                        <input type="hidden" name="id" value={announcement.id} />
                        <input type="hidden" name="currentStatus" value={announcement.isActive.toString()} />
                        <button
                          type="submit"
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            announcement.isActive
                              ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                              : 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                          }`}
                        >
                          {announcement.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                      </form>
                      <form action={deleteAnnouncement}>
                        <input type="hidden" name="id" value={announcement.id} />
                        <button
                          type="submit"
                          className="p-2 rounded-lg text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center">
            <Megaphone className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/40 mb-4">No announcements yet</p>
            <Link
              href="/admin/announcements/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gold text-navy-dark font-medium rounded-lg hover:bg-gold-light transition-colors"
            >
              Create First Announcement
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
