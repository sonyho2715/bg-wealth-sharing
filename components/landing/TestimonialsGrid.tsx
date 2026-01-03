'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { TESTIMONIAL_VIDEOS } from '@/data/testimonials';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface VideoCardProps {
  src: string;
  index: number;
}

function VideoCard({ src, index }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (!entry.isIntersecting && videoRef.current) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.3 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
      className="relative group aspect-[9/16] rounded-xl overflow-hidden bg-navy-dark border border-gold/10 hover:border-gold/30 transition-all"
    >
      <video
        ref={videoRef}
        src={isInView ? src : undefined}
        className="w-full h-full object-cover"
        muted={isMuted}
        loop
        playsInline
        preload="metadata"
        onLoadedData={() => setIsLoaded(true)}
        onClick={togglePlay}
      />

      {/* Loading skeleton */}
      {!isLoaded && isInView && (
        <div className="absolute inset-0 bg-navy-dark animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
        </div>
      )}

      {/* Play/Pause overlay */}
      <div
        className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center"
        onClick={togglePlay}
      >
        <div className="w-14 h-14 rounded-full bg-gold/90 flex items-center justify-center">
          {isPlaying ? (
            <Pause className="w-6 h-6 text-navy-dark" />
          ) : (
            <Play className="w-6 h-6 text-navy-dark ml-1" />
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => { e.stopPropagation(); toggleMute(); }}
          className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Video number badge */}
      <div className="absolute top-2 left-2 px-2 py-1 rounded bg-black/50 text-xs text-white font-medium">
        #{index + 1}
      </div>
    </motion.div>
  );
}

export default function TestimonialsGrid() {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(0);
  const videosPerPage = 12;
  const totalPages = Math.ceil(TESTIMONIAL_VIDEOS.length / videosPerPage);

  const startIndex = currentPage * videosPerPage;
  const visibleVideos = TESTIMONIAL_VIDEOS.slice(startIndex, startIndex + videosPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section id="testimonials" className="py-20 bg-navy-dark relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-6">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-sm text-gold">{t.testimonials.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t.testimonials.title} <span className="gold-gradient">{t.testimonials.titleHighlight}</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            {t.testimonials.description}
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30">
            <span className="text-gold font-semibold">{TESTIMONIAL_VIDEOS.length}+</span>
            <span className="text-white/70">{t.testimonials.stories}</span>
          </div>
        </motion.div>

        {/* Video Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {visibleVideos.map((video, index) => (
            <VideoCard key={startIndex + index} src={video} index={startIndex + index} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prevPage}
            className="p-3 rounded-full bg-navy border border-gold/30 text-gold hover:bg-gold/10 transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === currentPage ? 'bg-gold w-8' : 'bg-gold/30 hover:bg-gold/50'
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextPage}
            className="p-3 rounded-full bg-navy border border-gold/30 text-gold hover:bg-gold/10 transition-colors"
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <p className="text-center text-white/50 text-sm mt-4">
          {t.testimonials.showing} {startIndex + 1}-{Math.min(startIndex + videosPerPage, TESTIMONIAL_VIDEOS.length)} {t.testimonials.of} {TESTIMONIAL_VIDEOS.length} {t.testimonials.stories}
        </p>
      </div>
    </section>
  );
}
