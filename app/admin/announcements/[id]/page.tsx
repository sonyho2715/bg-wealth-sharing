'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Megaphone, Bell, Calendar, Video, AlertTriangle, Loader2, Save } from 'lucide-react';
import { getAnnouncement, updateAnnouncement } from '@/app/actions/announcements';

const typeOptions = [
  { value: 'GENERAL', label: 'General', icon: Bell, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
  { value: 'EVENT', label: 'Event', icon: Calendar, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' },
  { value: 'ZOOM', label: 'Zoom Call', icon: Video, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
  { value: 'URGENT', label: 'Urgent', icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' },
];

interface Announcement {
  id: string;
  title: string;
  message: string;
  type: 'GENERAL' | 'EVENT' | 'ZOOM' | 'URGENT';
  priority: number;
  expiresAt: Date | null;
  isActive: boolean;
}

export default function EditAnnouncementPage() {
  const router = useRouter();
  const params = useParams();
  const announcementId = params.id as string;

  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [selectedType, setSelectedType] = useState('GENERAL');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadAnnouncement() {
      try {
        const data = await getAnnouncement(announcementId);
        if (data) {
          setAnnouncement(data as Announcement);
          setSelectedType(data.type);
        } else {
          setError('Announcement not found');
        }
      } catch (e) {
        setError('Failed to load announcement');
      } finally {
        setIsLoading(false);
      }
    }
    loadAnnouncement();
  }, [announcementId]);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    formData.set('id', announcementId);
    formData.set('type', selectedType);
    await updateAnnouncement(formData);
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
      </div>
    );
  }

  if (error || !announcement) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <p className="text-white/60">{error || 'Announcement not found'}</p>
        <Link href="/admin/announcements" className="text-gold hover:text-gold-light mt-4 inline-block">
          Back to Announcements
        </Link>
      </div>
    );
  }

  const formatDateTimeLocal = (date: Date | null) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().slice(0, 16);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back Button */}
      <Link
        href="/admin/announcements"
        className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Announcements
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Edit Announcement</h1>
        <p className="text-white/60">Update the announcement details</p>
      </div>

      {/* Form */}
      <div className="bg-navy border border-gold/20 rounded-2xl p-8">
        <form action={handleSubmit} className="space-y-6">
          {/* Type Selection */}
          <div>
            <label className="block text-white/80 text-sm font-medium mb-3">
              Announcement Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {typeOptions.map((type) => {
                const TypeIcon = type.icon;
                const isSelected = selectedType === type.value;
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setSelectedType(type.value)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      isSelected
                        ? `${type.bg} ${type.border}`
                        : 'border-gold/20 hover:border-gold/40'
                    }`}
                  >
                    <TypeIcon className={`w-6 h-6 mx-auto mb-2 ${isSelected ? type.color : 'text-white/50'}`} />
                    <p className={`text-sm font-medium ${isSelected ? type.color : 'text-white/70'}`}>
                      {type.label}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-white/80 text-sm font-medium mb-2">
              Title *
            </label>
            <div className="relative">
              <Megaphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                id="title"
                name="title"
                required
                defaultValue={announcement.title}
                className="w-full pl-12 pr-4 py-3 bg-navy-dark border border-gold/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-gold/50 transition-colors"
                placeholder="e.g., Weekly Zoom Call This Friday"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-white/80 text-sm font-medium mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              defaultValue={announcement.message}
              className="w-full px-4 py-3 bg-navy-dark border border-gold/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-gold/50 transition-colors resize-none"
              placeholder="Enter the announcement details..."
            />
          </div>

          {/* Priority & Expiry */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="priority" className="block text-white/80 text-sm font-medium mb-2">
                Priority <span className="text-white/40">(higher = shown first)</span>
              </label>
              <input
                type="number"
                id="priority"
                name="priority"
                defaultValue={announcement.priority}
                min={0}
                max={100}
                className="w-full px-4 py-3 bg-navy-dark border border-gold/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="expiresAt" className="block text-white/80 text-sm font-medium mb-2">
                Expires At <span className="text-white/40">(optional)</span>
              </label>
              <input
                type="datetime-local"
                id="expiresAt"
                name="expiresAt"
                defaultValue={formatDateTimeLocal(announcement.expiresAt)}
                className="w-full px-4 py-3 bg-navy-dark border border-gold/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>
          </div>

          {/* Status Info */}
          <div className="p-4 bg-navy-dark rounded-lg border border-gold/10">
            <h3 className="text-white/60 text-sm font-medium mb-2">Status</h3>
            <p className={announcement.isActive ? 'text-green-400' : 'text-red-400'}>
              {announcement.isActive ? 'Active' : 'Inactive'}
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gold text-navy-dark font-semibold rounded-lg hover:bg-gold-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
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
