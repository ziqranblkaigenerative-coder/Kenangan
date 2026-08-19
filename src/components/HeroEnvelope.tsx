import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { MailOpen, Heart, Sparkles, Image as ImageIcon, GraduationCap, ChevronDown } from 'lucide-react';
import { GreetingCardData } from '../types';

interface HeroEnvelopeProps {
  cardData: GreetingCardData;
  isOpen: boolean;
  onOpenCard: () => void;
  onStartMusic: () => void;
}

export const HeroEnvelope: React.FC<HeroEnvelopeProps> = ({
  cardData,
  isOpen,
  onOpenCard,
  onStartMusic
}) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    onStartMusic();

    // Trigger celebration confetti in natural earthy tones
    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6D7A6A', '#CCD5AE', '#D4A373', '#FAEDCD', '#BC6C25']
      });
    } catch {
      // safe fallback
    }

    setTimeout(() => {
      onOpenCard();
      setIsOpening(false);
    }, 700);
  };

  return (
    <div className="relative overflow-hidden py-10 sm:py-16 px-4">
      {/* Decorative background floating elements in natural sage & clay tones */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-8 left-10 w-40 h-40 bg-[#CCD5AE] rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-[#FAEDCD] rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E9EDC6]/70 text-[#4A453F] border border-[#D9E0A3] text-xs sm:text-sm font-medium mb-4 shadow-2xs"
        >
          <GraduationCap className="w-4 h-4 text-[#6D7A6A]" />
          <span>Kenangan Masa SMA 2023 — 2026</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#6D7A6A]"></span>
          <span className="font-serif-display italic text-[#6D7A6A]">Suka & Duka Putih Abu-Abu</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif-display text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#4A453F] leading-tight sm:leading-tight mb-4"
        >
          <span className="italic text-[#6D7A6A] block">Sebuah Perjalanan Bersama</span>
          <span className="block font-handwriting text-4xl sm:text-6xl mt-2 text-[#D4A373] font-normal">
            Untuk {cardData.recipientName}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto text-[#5C564E] text-sm sm:text-base mb-8 leading-relaxed font-sans"
        >
          Terima kasih telah menjadi sahabat terbaik, mempercayaiku, dan melangkah bersama melewati suka, duka, tawa, dan ujian selama tiga tahun terindah di bangku SMA (2023–2026).
        </motion.p>

        {/* Envelope Presentation */}
        {!isOpen ? (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-md mx-auto relative group cursor-pointer"
            onClick={handleOpen}
            id="envelope-card-btn"
          >
            {/* Washi Tape Accent */}
            <div className="washi-tape-top" />

            <div className="bg-[#FEFAE0] border-2 border-[#CCD5AE] rounded-[32px] p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden text-left border-dashed">
              {/* Postage Stamp */}
              <div className="absolute top-4 right-4 w-16 h-20 bg-[#E9EDC6]/90 border-2 border-dashed border-[#A9B388] rounded-xl flex flex-col items-center justify-center p-1 text-center shadow-xs rotate-3">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#6D7A6A]">POST SMA</span>
                <Sparkles className="w-4 h-4 text-[#D4A373] my-0.5" />
                <span className="text-[8px] font-serif-display font-semibold text-[#4A453F]">2023-2026</span>
              </div>

              <div className="space-y-4 pr-16">
                <div>
                  <span className="text-[11px] font-semibold text-[#8B8378] uppercase tracking-[0.15em] block">
                    Kepada Sahabatku:
                  </span>
                  <span className="font-handwriting text-3xl font-bold text-[#4A453F] block leading-tight">
                    {cardData.recipientName}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-[#8B8378] uppercase tracking-[0.15em] block">
                    Dari:
                  </span>
                  <span className="font-handwriting text-2xl text-[#5C564E] block leading-tight">
                    {cardData.senderName}
                  </span>
                </div>

                <div className="pt-2 border-t border-[#E9E5D9] flex items-center justify-between text-xs text-[#8B8378]">
                  <span className="flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-[#6D7A6A]" />
                    {cardData.memories.length} Foto Memori
                  </span>
                  <span>Masa Putih Abu-Abu</span>
                </div>
              </div>

              {/* Terracotta/Clay Wax Seal Button */}
              <div className="mt-6 flex flex-col items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  className="w-16 h-16 rounded-full bg-[#D4A373] border-4 border-[#BC6C25]/30 shadow-md flex items-center justify-center text-white cursor-pointer relative group-hover:bg-[#c29160] transition-colors"
                >
                  <Heart className="w-7 h-7 fill-white text-white drop-shadow-xs" />
                  <div className="absolute inset-0 rounded-full border border-[#FAEDCD] animate-ping opacity-25 pointer-events-none" />
                </motion.div>
                <span className="mt-2.5 text-xs font-semibold text-[#6D7A6A] flex items-center gap-1.5">
                  <MailOpen className="w-3.5 h-3.5" />
                  Klik Segel Lilin untuk Membuka Surat
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="#section-letter"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#6D7A6A] text-white font-medium text-sm hover:bg-[#586455] transition-all shadow-xs"
              id="scroll-to-letter-btn"
            >
              <span>Baca Surat Lengkap</span>
              <ChevronDown className="w-4 h-4" />
            </a>
            <a
              href="#section-timeline"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-[#4A453F] border border-[#CCD5AE] font-medium text-sm hover:bg-[#FEFAE0] transition-all shadow-xs"
              id="scroll-to-timeline-btn"
            >
              <ImageIcon className="w-4 h-4 text-[#6D7A6A]" />
              <span>Jelajahi Foto 2023 - 2026</span>
            </a>
          </motion.div>
        )}
      </div>
    </div>
  );
};
