import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroEnvelope } from './components/HeroEnvelope';
import { LetterSection } from './components/LetterSection';
import { YearTimeline } from './components/YearTimeline';
import { TimeCapsuleSection } from './components/TimeCapsuleSection';
import { PhotoDetailModal } from './components/PhotoDetailModal';
import { PhotoEditorModal } from './components/PhotoEditorModal';
import { SlideshowModal } from './components/SlideshowModal';
import { CardCustomizerModal } from './components/CardCustomizerModal';
import { GreetingCardData, PhotoMemory, YearType, FriendshipWish } from './types';
import { INITIAL_GREETING_DATA } from './data/defaultData';
import { musicPlayer } from './utils/musicGenerator';
import { Heart, Sparkles, GraduationCap, ChevronUp, Share2, Copy, CheckCheck } from 'lucide-react';

const STORAGE_KEY = 'sahabat_sma_greeting_card_data_v3';

export default function App() {
  // Load saved state or default
  const [cardData, setCardData] = useState<GreetingCardData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return INITIAL_GREETING_DATA;
  });

  const [isCardOpened, setIsCardOpened] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [activeSection, setActiveSection] = useState<'all' | 'timeline' | 'letter' | 'capsule'>('all');

  // Modals state
  const [selectedDetailMemory, setSelectedDetailMemory] = useState<PhotoMemory | null>(null);
  const [memoryToEdit, setMemoryToEdit] = useState<PhotoMemory | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [newMemoryDefaultYear, setNewMemoryDefaultYear] = useState<YearType>(2026);
  const [isSlideshowOpen, setIsSlideshowOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cardData));
    } catch {
      // storage full or disabled
    }
  }, [cardData]);

  // Audio handlers
  const handleToggleMusic = () => {
    const isPlaying = musicPlayer.toggle();
    setIsPlayingMusic(isPlaying);
  };

  const handleStartMusic = () => {
    if (!isPlayingMusic) {
      musicPlayer.play();
      setIsPlayingMusic(true);
    }
  };

  // Card update handlers
  const handleUpdateCardData = (updated: Partial<GreetingCardData>) => {
    setCardData((prev) => ({
      ...prev,
      ...updated,
      lastUpdated: new Date().toISOString()
    }));
  };

  const handleResetCardData = () => {
    setCardData(INITIAL_GREETING_DATA);
  };

  // Memory Handlers
  const handleSaveMemory = (memory: PhotoMemory) => {
    setCardData((prev) => {
      const exists = prev.memories.some((m) => m.id === memory.id);
      let updatedMemories: PhotoMemory[];
      if (exists) {
        updatedMemories = prev.memories.map((m) => (m.id === memory.id ? memory : m));
      } else {
        // Add new memory sorted by year
        updatedMemories = [memory, ...prev.memories].sort((a, b) => a.year - b.year);
      }
      return { ...prev, memories: updatedMemories };
    });
  };

  const handleDeleteMemory = (id: string) => {
    setCardData((prev) => ({
      ...prev,
      memories: prev.memories.filter((m) => m.id !== id)
    }));
  };

  const handleToggleFavorite = (id: string) => {
    setCardData((prev) => ({
      ...prev,
      memories: prev.memories.map((m) =>
        m.id === id ? { ...m, isFavorite: !m.isFavorite } : m
      )
    }));
  };

  const handleOpenAddMemory = (year?: YearType) => {
    setMemoryToEdit(null);
    setNewMemoryDefaultYear(year ?? 2026);
    setIsEditorOpen(true);
  };

  const handleOpenEditMemory = (memory: PhotoMemory) => {
    setMemoryToEdit(memory);
    setIsEditorOpen(true);
  };

  // Time capsule wishes
  const handleAddWish = (wish: Omit<FriendshipWish, 'id'>) => {
    const newWish: FriendshipWish = {
      ...wish,
      id: `w-${Date.now()}`
    };
    setCardData((prev) => ({
      ...prev,
      wishes: [newWish, ...prev.wishes]
    }));
  };

  const handleUpdatePromise = (promiseText: string) => {
    setCardData((prev) => ({
      ...prev,
      promiseText
    }));
  };

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#4A453F] flex flex-col font-sans bg-grid-pattern selection:bg-[#CCD5AE]">
      {/* Top Navigation */}
      <Navbar
        isPlayingMusic={isPlayingMusic}
        onToggleMusic={handleToggleMusic}
        onOpenSlideshow={() => setIsSlideshowOpen(true)}
        onOpenLetter={() => {
          setIsCardOpened(true);
          const el = document.getElementById('section-letter');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        friendName={cardData.recipientName}
      />

      <main className="flex-1">
        {/* Hero Envelope Section */}
        <HeroEnvelope
          cardData={cardData}
          isOpen={isCardOpened}
          onOpenCard={() => setIsCardOpened(true)}
          onStartMusic={handleStartMusic}
        />

        {/* Heartfelt Letter Section */}
        <LetterSection
          cardData={cardData}
          onUpdateCardData={handleUpdateCardData}
        />

        {/* Year-by-Year Photo Timeline Gallery (2023 - 2026) */}
        <YearTimeline
          memories={cardData.memories}
          onOpenDetail={(mem) => setSelectedDetailMemory(mem)}
          onEditMemory={handleOpenEditMemory}
          onAddNewMemory={handleOpenAddMemory}
          onToggleFavorite={handleToggleFavorite}
        />

        {/* Time Capsule & Wishes Section */}
        <TimeCapsuleSection
          wishes={cardData.wishes}
          promiseText={cardData.promiseText}
          senderName={cardData.senderName}
          recipientName={cardData.recipientName}
          onAddWish={handleAddWish}
          onUpdatePromise={handleUpdatePromise}
        />
      </main>

      {/* Floating Action / Share Bar at Bottom */}
      <div className="sticky bottom-4 z-30 max-w-fit mx-auto px-4">
        <div className="bg-[#4A453F]/90 backdrop-blur-md text-[#FDFBF7] px-4 py-2 rounded-full border border-[#5C564E] shadow-xl flex items-center gap-3 text-xs">
          <button
            id="footer-share-btn"
            onClick={handleCopyShareLink}
            className="flex items-center gap-1.5 font-medium hover:text-[#FAEDCD] transition-colors cursor-pointer"
          >
            {copiedLink ? (
              <>
                <CheckCheck className="w-3.5 h-3.5 text-[#CCD5AE]" />
                <span className="text-[#CCD5AE] font-semibold">Tautan Tersalin!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>Bagikan ke {cardData.recipientName}</span>
              </>
            )}
          </button>

          <span className="w-px h-3 bg-[#5C564E]" />

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-[#E9E5D9] hover:text-white transition-colors cursor-pointer"
            title="Kembali ke Atas"
          >
            <ChevronUp className="w-3.5 h-3.5" />
            <span>Atas</span>
          </button>
        </div>
      </div>

      {/* Heartfelt Footer */}
      <footer className="mt-16 border-t border-[#E9E5D9] bg-[#FEFAE0]/80 py-8 px-4 text-center text-[#4A453F] text-xs sm:text-sm">
        <div className="max-w-3xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-[#6D7A6A] font-serif-display text-sm font-semibold">
            <GraduationCap className="w-4 h-4 text-[#D4A373]" />
            <span className="tracking-wide">Masa SMA 2023 — 2026</span>
          </div>
          <p className="text-[#8B8378] max-w-md mx-auto text-xs leading-relaxed font-sans">
            "Terima kasih atas segala cerita, tawa, dan kebersamaan di masa putih abu-abu. Sukses selalu untuk langkahmu selanjutnya!"
          </p>
          <div className="pt-2 text-[11px] text-[#8B8378] flex items-center justify-center gap-1 font-sans">
            <span>Dibuat dengan</span>
            <Heart className="w-3 h-3 fill-[#D4A373] text-[#D4A373] inline" />
            <span>untuk {cardData.recipientName} dari {cardData.senderName}</span>
          </div>
        </div>
      </footer>

      {/* Lightbox / Detail Photo Modal */}
      <PhotoDetailModal
        memory={selectedDetailMemory}
        allMemories={cardData.memories}
        onClose={() => setSelectedDetailMemory(null)}
        onSelectMemory={(mem) => setSelectedDetailMemory(mem)}
        onEditMemory={handleOpenEditMemory}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Add / Edit Photo Memory Modal */}
      {isEditorOpen && (
        <PhotoEditorModal
          memoryToEdit={memoryToEdit}
          defaultYear={newMemoryDefaultYear}
          onSave={handleSaveMemory}
          onDelete={handleDeleteMemory}
          onClose={() => setIsEditorOpen(false)}
        />
      )}

      {/* Fullscreen Cinematic Slideshow */}
      {isSlideshowOpen && (
        <SlideshowModal
          memories={cardData.memories}
          onClose={() => setIsSlideshowOpen(false)}
          isPlayingMusic={isPlayingMusic}
          onToggleMusic={handleToggleMusic}
        />
      )}

      {/* Card Settings / Personalization Customizer */}
      {isCustomizerOpen && (
        <CardCustomizerModal
          cardData={cardData}
          onSave={handleUpdateCardData}
          onReset={handleResetCardData}
          onClose={() => setIsCustomizerOpen(false)}
        />
      )}
    </div>
  );
}
