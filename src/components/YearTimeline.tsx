import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Image as ImageIcon, Heart } from 'lucide-react';
import { PhotoMemory, YearType } from '../types';
import { PolaroidCard } from './PolaroidCard';

interface YearTimelineProps {
  memories: PhotoMemory[];
  onOpenDetail: (memory: PhotoMemory) => void;
  onEditMemory: (memory: PhotoMemory) => void;
  onAddNewMemory: (year?: YearType) => void;
  onToggleFavorite: (id: string) => void;
}

const YEAR_DETAILS: Record<YearType, { title: string; subtitle: string; icon: string; themeColor: string }> = {
  2023: {
    title: 'Kelas X (2023)',
    subtitle: 'Awal Kenalan & Masa Orientasi Pertama',
    icon: '🌱',
    themeColor: 'bg-[#CCD5AE]/40 text-[#4A453F] border-[#A9B388]'
  },
  2024: {
    title: 'Kelas XI (2024)',
    subtitle: 'Masa Paling Seru, Hangat & Penuh Tawa',
    icon: '✨',
    themeColor: 'bg-[#FAEDCD]/60 text-[#4A453F] border-[#D4A373]'
  },
  2025: {
    title: 'Kelas XII (2025)',
    subtitle: 'Perjuangan Ujian & Saling Menguatkan',
    icon: '📖',
    themeColor: 'bg-[#E9EDC6]/50 text-[#4A453F] border-[#CCD5AE]'
  },
  2026: {
    title: 'Kelulusan (2026)',
    subtitle: 'Graduation & Menjemput Cita-Cita Masa Depan',
    icon: '🎓',
    themeColor: 'bg-[#D4A373]/20 text-[#4A453F] border-[#D4A373]'
  }
};

export const YearTimeline: React.FC<YearTimelineProps> = ({
  memories,
  onOpenDetail,
  onEditMemory,
  onAddNewMemory,
  onToggleFavorite
}) => {
  const [selectedYear, setSelectedYear] = useState<YearType | 'all'>('all');
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  const filteredMemories = memories.filter((m) => {
    if (selectedYear !== 'all' && m.year !== selectedYear) return false;
    if (onlyFavorites && !m.isFavorite) return false;
    return true;
  });

  const getCountForYear = (year: YearType) => {
    return memories.filter((m) => m.year === year).length;
  };

  return (
    <section id="section-timeline" className="py-12 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6D7A6A] bg-[#CCD5AE]/40 px-3.5 py-1 rounded-full mb-2 border border-[#A9B388]">
            <ImageIcon className="w-3.5 h-3.5 text-[#D4A373]" />
            <span className="uppercase tracking-[0.15em] text-[10px]">Album Foto Kenangan</span>
          </div>
          <h2 className="font-serif-display text-2xl sm:text-4xl font-medium text-[#4A453F] italic">
            Jejak Waktu SMA (2023 — 2026)
          </h2>
          <p className="text-xs sm:text-sm text-[#8B8378] mt-2 font-sans">
            Setiap lembar foto menceritakan tawa, perjuangan, dan kehangatan persahabatan kita selama 3 tahun penuh arti.
          </p>
        </div>

        {/* Year Filter Bar & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FEFAE0]/80 backdrop-blur-xs p-2.5 sm:p-3 rounded-2xl border border-[#E9E5D9] shadow-xs mb-8">
          {/* Year Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              id="filter-year-all"
              onClick={() => setSelectedYear('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedYear === 'all'
                  ? 'bg-[#6D7A6A] text-white shadow-xs'
                  : 'bg-white text-[#5C564E] hover:bg-[#CCD5AE]/40 border border-[#E9E5D9]'
              }`}
            >
              Semua Tahun ({memories.length})
            </button>

            {([2023, 2024, 2025, 2026] as YearType[]).map((year) => {
              const info = YEAR_DETAILS[year];
              const count = getCountForYear(year);
              const isSelected = selectedYear === year;

              return (
                <button
                  key={year}
                  id={`filter-year-${year}`}
                  onClick={() => setSelectedYear(year)}
                  className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-[#4A453F] text-white shadow-xs font-semibold'
                      : 'bg-white text-[#5C564E] hover:bg-[#CCD5AE]/40 border border-[#E9E5D9]'
                  }`}
                >
                  <span>{info.icon}</span>
                  <span>{year}</span>
                  <span className={`text-[11px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-[#5C564E] text-[#FAEDCD]' : 'bg-[#E9E5D9] text-[#5C564E]'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Action buttons: Favorite filter + Add Photo */}
          <div className="flex items-center gap-2 ml-auto">
            <button
              id="filter-fav-btn"
              onClick={() => setOnlyFavorites(!onlyFavorites)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                onlyFavorites
                  ? 'bg-[#D4A373]/30 text-[#8B4513] border-[#D4A373] shadow-xs'
                  : 'bg-white text-[#5C564E] border-[#E9E5D9] hover:bg-[#FEFAE0]'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-[#D4A373] text-[#D4A373]' : 'text-[#8B8378]'}`} />
              <span className="hidden sm:inline">Hanya Favorit</span>
            </button>

            <button
              id="add-memory-btn"
              onClick={() => onAddNewMemory(selectedYear === 'all' ? 2026 : selectedYear)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#6D7A6A] text-white hover:bg-[#586455] transition-all shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Foto</span>
            </button>
          </div>
        </div>

        {/* Year Banner Summary if specific year is selected */}
        {selectedYear !== 'all' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-2xl border flex items-center justify-between gap-4 ${YEAR_DETAILS[selectedYear].themeColor}`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{YEAR_DETAILS[selectedYear].icon}</span>
              <div>
                <h4 className="font-serif-display font-medium text-base sm:text-lg text-[#4A453F]">
                  {YEAR_DETAILS[selectedYear].title}
                </h4>
                <p className="text-xs sm:text-sm text-[#5C564E]">
                  {YEAR_DETAILS[selectedYear].subtitle}
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold px-3 py-1 bg-white/80 backdrop-blur-xs rounded-full border border-[#E9E5D9] text-[#4A453F]">
              {filteredMemories.length} Foto Tersimpan
            </span>
          </motion.div>
        )}

        {/* Polaroid Grid Layout */}
        {filteredMemories.length === 0 ? (
          <div className="bg-[#FEFAE0]/60 border-2 border-dashed border-[#CCD5AE] rounded-3xl p-12 text-center">
            <p className="text-[#8B8378] text-sm mb-3">
              Belum ada foto kenangan di kategori ini.
            </p>
            <button
              onClick={() => onAddNewMemory(selectedYear === 'all' ? 2023 : selectedYear)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#6D7A6A] text-white hover:bg-[#586455] cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambahkan Foto Kenangan Pertama</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-4">
            {filteredMemories.map((memory) => (
              <PolaroidCard
                key={memory.id}
                memory={memory}
                onOpenDetail={onOpenDetail}
                onEdit={onEditMemory}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
