import React from 'react';
import { Volume2, VolumeX, Sparkles, Play, Edit3, Heart, Award, Clock } from 'lucide-react';

interface NavbarProps {
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  onOpenSlideshow: () => void;
  onOpenLetter: () => void;
  onOpenCustomizer: () => void;
  activeSection: 'all' | 'timeline' | 'letter' | 'capsule';
  setActiveSection: (sec: 'all' | 'timeline' | 'letter' | 'capsule') => void;
  friendName: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  isPlayingMusic,
  onToggleMusic,
  onOpenSlideshow,
  onOpenLetter,
  onOpenCustomizer,
  activeSection,
  setActiveSection,
  friendName
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E9E5D9] transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo / Brand */}
        <div 
          onClick={() => setActiveSection('all')}
          className="flex items-center gap-2.5 cursor-pointer group"
          id="nav-brand-btn"
        >
          <div className="w-9 h-9 rounded-full bg-[#CCD5AE]/40 border border-[#A9B388] flex items-center justify-center text-[#6D7A6A] shadow-xs group-hover:scale-105 transition-transform">
            <Heart className="w-4 h-4 fill-[#6D7A6A] text-[#6D7A6A]" />
          </div>
          <div>
            <span className="font-serif-display font-medium text-[#4A453F] tracking-tight text-base sm:text-lg block leading-tight">
              Kenangan Putih Abu-Abu
            </span>
            <span className="text-[11px] font-sans uppercase tracking-[0.15em] text-[#8B8378] font-medium block">
              2023 — 2026 • Untuk {friendName}
            </span>
          </div>
        </div>

        {/* Center navigation tabs (desktop) */}
        <nav className="hidden md:flex items-center gap-1 bg-[#E9EDC6]/40 p-1 rounded-full border border-[#D9E0A3]">
          <button
            id="nav-tab-all"
            onClick={() => setActiveSection('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              activeSection === 'all'
                ? 'bg-white text-[#4A453F] shadow-xs border border-[#E9E5D9]'
                : 'text-[#8B8378] hover:text-[#4A453F] hover:bg-[#FEFAE0]'
            }`}
          >
            Semua
          </button>
          <button
            id="nav-tab-timeline"
            onClick={() => {
              setActiveSection('timeline');
              const el = document.getElementById('section-timeline');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSection === 'timeline'
                ? 'bg-white text-[#4A453F] shadow-xs border border-[#E9E5D9]'
                : 'text-[#8B8378] hover:text-[#4A453F] hover:bg-[#FEFAE0]'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-[#6D7A6A]" />
            Galeri Foto (2023-2026)
          </button>
          <button
            id="nav-tab-letter"
            onClick={() => {
              setActiveSection('letter');
              const el = document.getElementById('section-letter');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSection === 'letter'
                ? 'bg-white text-[#4A453F] shadow-xs border border-[#E9E5D9]'
                : 'text-[#8B8378] hover:text-[#4A453F] hover:bg-[#FEFAE0]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
            Surat Persahabatan
          </button>
          <button
            id="nav-tab-capsule"
            onClick={() => {
              setActiveSection('capsule');
              const el = document.getElementById('section-capsule');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSection === 'capsule'
                ? 'bg-white text-[#4A453F] shadow-xs border border-[#E9E5D9]'
                : 'text-[#8B8378] hover:text-[#4A453F] hover:bg-[#FEFAE0]'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-[#6D7A6A]" />
            Pesan & Harapan
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Music Play/Pause */}
          <button
            id="nav-music-btn"
            onClick={onToggleMusic}
            title={isPlayingMusic ? 'Matikan Musik Nostalgia' : 'Putar Musik Nostalgia (Lo-fi Box)'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
              isPlayingMusic
                ? 'bg-[#CCD5AE] text-[#4A453F] border-[#A9B388] shadow-xs animate-pulse font-semibold'
                : 'bg-white text-[#5C564E] border-[#E9E5D9] hover:bg-[#FEFAE0]'
            }`}
          >
            {isPlayingMusic ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#6D7A6A] animate-bounce" />
                <span className="hidden sm:inline">Musik: Nyala</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#8B8378]" />
                <span className="hidden sm:inline">Musik: Mati</span>
              </>
            )}
          </button>

          {/* Slideshow Button */}
          <button
            id="nav-slideshow-btn"
            onClick={onOpenSlideshow}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#6D7A6A] text-white hover:bg-[#586455] transition-all shadow-xs cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-[#FAEDCD] text-[#FAEDCD]" />
            <span>Putar Memori</span>
          </button>

          {/* Edit / Customize button */}
          <button
            id="nav-customize-btn"
            onClick={onOpenCustomizer}
            title="Edit Nama & Kartu Ucapan"
            className="p-2 rounded-full text-[#5C564E] bg-white border border-[#E9E5D9] hover:bg-[#FEFAE0] hover:text-[#4A453F] transition-colors cursor-pointer"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
