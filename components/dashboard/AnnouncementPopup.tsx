'use client';

import { useState, useEffect } from 'react';
import { X, Bell, Calendar, Video, AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Announcement {
  id: string;
  title: string;
  message: string;
  type: 'GENERAL' | 'EVENT' | 'ZOOM' | 'URGENT';
  priority: number;
  expiresAt: Date | null;
  createdAt: Date;
}

interface AnnouncementPopupProps {
  announcements: Announcement[];
}

const typeConfig = {
  GENERAL: { icon: Bell, color: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-500/30' },
  EVENT: { icon: Calendar, color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/30' },
  ZOOM: { icon: Video, color: 'text-purple-400', bg: 'bg-purple-500/20', border: 'border-purple-500/30' },
  URGENT: { icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/30' },
};

const DISMISSED_KEY = 'dismissed_announcements';

export default function AnnouncementPopup({ announcements }: AnnouncementPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleAnnouncements, setVisibleAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    // Get dismissed announcement IDs from localStorage
    const dismissedIds = JSON.parse(localStorage.getItem(DISMISSED_KEY) || '[]');

    // Filter out dismissed announcements
    const filtered = announcements.filter(a => !dismissedIds.includes(a.id));

    setVisibleAnnouncements(filtered);

    // Open popup if there are announcements to show
    if (filtered.length > 0) {
      // Small delay before showing
      const timer = setTimeout(() => setIsOpen(true), 500);
      return () => clearTimeout(timer);
    }
  }, [announcements]);

  const handleDismiss = () => {
    if (visibleAnnouncements.length === 0) return;

    const currentAnnouncement = visibleAnnouncements[currentIndex];

    // Add to dismissed list
    const dismissedIds = JSON.parse(localStorage.getItem(DISMISSED_KEY) || '[]');
    dismissedIds.push(currentAnnouncement.id);
    localStorage.setItem(DISMISSED_KEY, JSON.stringify(dismissedIds));

    // Remove from visible
    const newVisible = visibleAnnouncements.filter((_, i) => i !== currentIndex);
    setVisibleAnnouncements(newVisible);

    // Close if no more announcements
    if (newVisible.length === 0) {
      setIsOpen(false);
    } else if (currentIndex >= newVisible.length) {
      setCurrentIndex(newVisible.length - 1);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : visibleAnnouncements.length - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < visibleAnnouncements.length - 1 ? prev + 1 : 0));
  };

  if (visibleAnnouncements.length === 0) return null;

  const currentAnnouncement = visibleAnnouncements[currentIndex];
  const config = typeConfig[currentAnnouncement.type];
  const TypeIcon = config.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg mx-4 z-50"
          >
            <div className={`bg-navy border-2 ${config.border} rounded-2xl shadow-2xl overflow-hidden`}>
              {/* Header */}
              <div className={`px-6 py-4 ${config.bg} border-b ${config.border}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${config.bg}`}>
                      <TypeIcon className={`w-6 h-6 ${config.color}`} />
                    </div>
                    <div>
                      <span className={`text-xs font-medium uppercase tracking-wide ${config.color}`}>
                        {currentAnnouncement.type === 'ZOOM' ? 'Zoom Call' : currentAnnouncement.type}
                      </span>
                      {visibleAnnouncements.length > 1 && (
                        <span className="text-white/40 text-xs ml-2">
                          ({currentIndex + 1} of {visibleAnnouncements.length})
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleClose}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5 text-white/60" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-3">
                  {currentAnnouncement.title}
                </h2>
                <p className="text-white/70 leading-relaxed whitespace-pre-wrap">
                  {currentAnnouncement.message}
                </p>

                {currentAnnouncement.expiresAt && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-white/50">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Valid until: {new Date(currentAnnouncement.expiresAt).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-navy-dark border-t border-gold/10 flex items-center justify-between">
                {/* Navigation */}
                {visibleAnnouncements.length > 1 ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={goToPrevious}
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-white/60" />
                    </button>
                    <div className="flex gap-1">
                      {visibleAnnouncements.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentIndex(i)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            i === currentIndex ? 'bg-gold' : 'bg-white/20 hover:bg-white/40'
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={goToNext}
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-white/60" />
                    </button>
                  </div>
                ) : (
                  <div />
                )}

                {/* Dismiss Button */}
                <button
                  onClick={handleDismiss}
                  className="px-4 py-2 bg-gold text-navy-dark font-semibold rounded-lg hover:bg-gold-light transition-colors"
                >
                  Got it
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
