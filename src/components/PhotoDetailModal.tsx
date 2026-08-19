import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Heart, Calendar, MapPin, Quote, Edit2 } from 'lucide-react';
import { PhotoMemory } from '../types';

interface PhotoDetailModalProps {
  memory: PhotoMemory | null;
  allMemories: PhotoMemory[];
  onClose: () => void;
  onSelectMemory: (memory: PhotoMemory) => void;
  onEditMemory: (memory: PhotoMemory) => void;
  onToggleFavorite: (id: string) => void;
}

export const PhotoDetailModal: React.FC<PhotoDetailModalProps> = ({
  memory,
  allMemories,
  onClose,
  onSelectMemory,
  onEditMemory,
  onToggleFavorite
}) => {
  if (!memory) return null;

  const currentIndex = allMemories.findIndex((m) => m.id === memory.id);
  const prevMemory = currentIndex > 0 ? allMemories[currentIndex - 1] : null;
  const nextMemory = currentIndex < allMemories.length - 1 ? allMemories[currentIndex + 1] : null;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && prevMemory) onSelectMemory(prevMemory);
      if (e.key === 'ArrowRight' && nextMemory) onSelectMemory(nextMemory);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevMemory, nextMemory, onClose, onSelectMemory]);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#4A453F]/75 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-4xl bg-[#FDFBF7] rounded-3xl shadow-2xl border border-[#E9E5D9] overflow-hidden my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-[#E9E5D9] bg-[#FEFAE0]">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#6D7A6A] text-[#FAEDCD]">
                Tahun {memory.year}
              </span>
              <span className="text-xs text-[#8B8378] font-medium hidden sm:inline font-sans">
                {memory.gradeLabel}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="detail-fav-btn"
                onClick={() => onToggleFavorite(memory.id)}
                className={`p-2 rounded-full border transition-colors cursor-pointer ${
                  memory.isFavorite
                    ? 'bg-[#FAEDCD] border-[#D4A373] text-[#D4A373]'
                    : 'bg-white border-[#E9E5D9] text-[#8B8378] hover:text-[#4A453F]'
                }`}
                title="Favorit"
              >
                <Heart className={`w-4 h-4 ${memory.isFavorite ? 'fill-[#D4A373]' : ''}`} />
              </button>

              <button
                id="detail-edit-btn"
                onClick={() => {
                  onClose();
                  onEditMemory(memory);
                }}
                className="p-2 rounded-full bg-white border border-[#E9E5D9] text-[#8B8378] hover:text-[#4A453F] transition-colors cursor-pointer"
                title="Edit Cerita Foto"
              >
                <Edit2 className="w-4 h-4" />
              </button>

              <button
                id="detail-close-btn"
                onClick={onClose}
                className="p-2 rounded-full bg-white hover:bg-[#FEFAE0] border border-[#E9E5D9] text-[#4A453F] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="grid grid-cols-1 md:grid-cols-2 max-h-[80vh] overflow-y-auto">
            {/* Image Preview Side */}
            <div className="relative bg-[#33302C] flex items-center justify-center p-4 sm:p-6 min-h-[300px] md:min-h-[420px]">
              <img
                src={memory.imageUrl}
                alt={memory.title}
                referrerPolicy="no-referrer"
                className="max-h-[380px] w-auto max-w-full object-contain rounded-xl shadow-md border border-white/10"
              />

              {/* Navigation Arrows */}
              {prevMemory && (
                <button
                  id="modal-prev-btn"
                  onClick={() => onSelectMemory(prevMemory)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#4A453F]/70 hover:bg-[#4A453F] text-white backdrop-blur-xs transition-colors cursor-pointer"
                  title="Foto Sebelumnya"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              {nextMemory && (
                <button
                  id="modal-next-btn"
                  onClick={() => onSelectMemory(nextMemory)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#4A453F]/70 hover:bg-[#4A453F] text-white backdrop-blur-xs transition-colors cursor-pointer"
                  title="Foto Selanjutnya"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Story & Details Side */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#FDFBF7] letter-paper">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs text-[#8B8378] font-sans">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#6D7A6A]" />
                    {memory.dateStr}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 truncate">
                    <MapPin className="w-3.5 h-3.5 text-[#D4A373]" />
                    {memory.location}
                  </span>
                </div>

                <h3 className="font-serif-display text-2xl sm:text-3xl font-medium text-[#4A453F] leading-snug italic">
                  {memory.title}
                </h3>

                <div className="w-12 h-0.5 bg-[#CCD5AE] rounded-full" />

                <p className="text-[#5C564E] text-sm sm:text-base leading-relaxed whitespace-pre-line font-sans">
                  {memory.description}
                </p>

                {memory.quote && (
                  <div className="p-4 bg-[#FEFAE0] rounded-2xl border border-[#CCD5AE] relative">
                    <Quote className="w-5 h-5 text-[#D4A373]/50 absolute top-2 right-2" />
                    <p className="font-handwriting text-xl sm:text-2xl font-bold text-[#4A453F] leading-snug">
                      “{memory.quote}”
                    </p>
                  </div>
                )}
              </div>

              {/* Memory index indicator */}
              <div className="pt-4 border-t border-[#E9E5D9] flex items-center justify-between text-xs text-[#8B8378] font-sans">
                <span>
                  Memori {currentIndex + 1} dari {allMemories.length}
                </span>
                <span className="font-handwriting text-lg text-[#6D7A6A] font-bold">
                  Masa SMA 2023 - 2026
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
