import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Pause, ChevronLeft, ChevronRight, Volume2, VolumeX, Sparkles, Calendar, MapPin } from 'lucide-react';
import { PhotoMemory } from '../types';

interface SlideshowModalProps {
  memories: PhotoMemory[];
  onClose: () => void;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
}

export const SlideshowModal: React.FC<SlideshowModalProps> = ({
  memories,
  onClose,
  isPlayingMusic,
  onToggleMusic
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const current = memories[currentIndex];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % memories.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, memories.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % memories.length);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#33302C]/95 flex flex-col justify-between p-4 sm:p-8 backdrop-blur-md text-[#FDFBF7]">
      {/* Top Bar */}
      <div className="flex items-center justify-between z-10 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#FAEDCD] bg-[#6D7A6A]/80 border border-[#A9B388]/60 px-3.5 py-1 rounded-full flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
            <span>Memori Putih Abu-Abu (2023 - 2026)</span>
          </span>

          <span className="text-xs text-[#E9E5D9] font-mono hidden sm:inline">
            {currentIndex + 1} / {memories.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Music button */}
          <button
            onClick={onToggleMusic}
            className={`p-2 rounded-full border transition-colors cursor-pointer ${
              isPlayingMusic
                ? 'bg-[#D4A373] text-white border-[#D4A373]'
                : 'bg-[#4A453F] text-[#E9E5D9] border-[#5C564E] hover:text-white'
            }`}
            title="Toggle Music"
          >
            {isPlayingMusic ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Auto play toggle */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#4A453F] hover:bg-[#5C564E] text-xs font-medium border border-[#5C564E] text-[#FDFBF7] transition-colors cursor-pointer"
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-[#FAEDCD]" />
                <span>Jeda</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-[#FAEDCD] text-[#FAEDCD]" />
                <span>Putar Otomatis</span>
              </>
            )}
          </button>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#4A453F] hover:bg-[#5C564E] text-[#E9E5D9] hover:text-white transition-colors cursor-pointer border border-[#5C564E]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Slide Content */}
      <div className="relative flex-1 flex items-center justify-center my-4 max-w-5xl mx-auto w-full overflow-hidden">
        <AnimatePresence mode="wait">
          {current && (
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 w-full max-h-[70vh]"
            >
              {/* Photo Frame */}
              <div className="relative max-h-[48vh] md:max-h-[62vh] w-auto aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border-4 border-[#FDFBF7] bg-[#4A453F] shrink-0">
                <img
                  src={current.imageUrl}
                  alt={current.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#4A453F]/85 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold text-[#FAEDCD] border border-[#CCD5AE]/40">
                  {current.year} • {current.gradeLabel.split('•')[0]}
                </div>
              </div>

              {/* Story side */}
              <div className="max-w-md space-y-4 text-left p-2">
                <div className="flex items-center gap-3 text-xs text-[#CCD5AE]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#D4A373]" />
                    {current.dateStr}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#D4A373]" />
                    {current.location}
                  </span>
                </div>

                <h2 className="font-serif-display text-2xl sm:text-3xl font-medium text-[#FDFBF7] leading-tight italic">
                  {current.title}
                </h2>

                <p className="text-[#E9E5D9] text-sm sm:text-base leading-relaxed font-sans">
                  {current.description}
                </p>

                {current.quote && (
                  <div className="p-3.5 bg-[#4A453F]/60 border-l-3 border-[#D4A373] rounded-r-xl">
                    <p className="font-handwriting text-xl sm:text-2xl text-[#FAEDCD]">
                      “{current.quote}”
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Prev / Next controls */}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#4A453F]/80 hover:bg-[#4A453F] text-white backdrop-blur-xs border border-[#5C564E] transition-transform active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#4A453F]/80 hover:bg-[#4A453F] text-white backdrop-blur-xs border border-[#5C564E] transition-transform active:scale-95 cursor-pointer"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Timeline Strip */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-center gap-2 overflow-x-auto py-2">
        {memories.map((m, idx) => (
          <button
            key={m.id}
            onClick={() => {
              setCurrentIndex(idx);
              setIsAutoPlaying(false);
            }}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              currentIndex === idx
                ? 'w-8 bg-[#CCD5AE]'
                : 'w-2 bg-[#5C564E] hover:bg-[#8B8378]'
            }`}
            title={`${m.year}: ${m.title}`}
          />
        ))}
      </div>
    </div>
  );
};
