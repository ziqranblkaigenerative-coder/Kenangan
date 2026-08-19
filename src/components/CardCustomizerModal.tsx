import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { X, Check, RotateCcw, Copy, CheckCheck, Sparkles, Music, Upload } from 'lucide-react';
import { GreetingCardData } from '../types';
import { musicPlayer } from '../utils/musicGenerator';

interface CardCustomizerModalProps {
  cardData: GreetingCardData;
  onSave: (updated: Partial<GreetingCardData>) => void;
  onReset: () => void;
  onClose: () => void;
}

export const CardCustomizerModal: React.FC<CardCustomizerModalProps> = ({
  cardData,
  onSave,
  onReset,
  onClose
}) => {
  const [recipient, setRecipient] = useState(cardData.recipientName);
  const [sender, setSender] = useState(cardData.senderName);
  const [school, setSchool] = useState(cardData.schoolName);
  const [copied, setCopied] = useState(false);
  const [uploadedAudioName, setUploadedAudioName] = useState<string | null>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      musicPlayer.setCustomAudio(url);
      setUploadedAudioName(file.name);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      recipientName: recipient.trim() || 'Sahabatku',
      senderName: sender.trim() || 'Temanmu',
      schoolName: school.trim() || 'Masa Putih Abu-Abu (2023 - 2026)',
    });
    onClose();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#4A453F]/75 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-lg bg-[#FDFBF7] rounded-3xl shadow-2xl border border-[#E9E5D9] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E9E5D9] bg-[#FEFAE0]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#CCD5AE] text-[#4A453F] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#6D7A6A]" />
            </div>
            <div>
              <h3 className="font-serif-display font-medium text-[#4A453F] text-lg italic">
                Pengaturan Kartu Ucapan
              </h3>
              <p className="text-xs text-[#8B8378] font-sans">
                Personalisasi nama sahabat & identitas kartu
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white border border-[#E9E5D9] text-[#8B8378] hover:text-[#4A453F] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#6D7A6A] uppercase tracking-wider mb-1">
              Nama Sahabat (Penerima Kartu) *
            </label>
            <input
              type="text"
              required
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Contoh: Sarah / Budi / Sahabatku..."
              className="w-full px-4 py-2.5 text-sm bg-white border border-[#E9E5D9] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#6D7A6A] font-medium text-[#4A453F]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#6D7A6A] uppercase tracking-wider mb-1">
              Nama Pengirim (Namamu) *
            </label>
            <input
              type="text"
              required
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              placeholder="Contoh: Ziqran / Teman Sebangkumu..."
              className="w-full px-4 py-2.5 text-sm bg-white border border-[#E9E5D9] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#6D7A6A] font-medium text-[#4A453F]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#6D7A6A] uppercase tracking-wider mb-1">
              Label SMA / Periode Waktu
            </label>
            <input
              type="text"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              placeholder="Contoh: SMA Negeri 1 (2023 - 2026)"
              className="w-full px-4 py-2.5 text-sm bg-white border border-[#E9E5D9] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#6D7A6A] text-[#4A453F]"
            />
          </div>

          {/* Background Music Options */}
          <div className="p-3.5 bg-[#FEFAE0]/80 rounded-2xl border border-[#CCD5AE] space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4 text-[#6D7A6A]" />
                <span className="text-xs font-bold text-[#4A453F]">Lagu Latar Belakang</span>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 bg-[#CCD5AE] text-[#4A453F] rounded-full">
                Wonder (Hey Yeah)
              </span>
            </div>
            <p className="text-[11px] text-[#8B8378] leading-relaxed">
              Lagu latar belakang otomatis memainkan aransemen lagu <em>Wonder ("You're a wonder just like me...")</em>. Anda juga bisa mengunggah file musik Anda sendiri.
            </p>
            <div className="pt-1 flex items-center gap-2">
              <button
                type="button"
                onClick={() => audioInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white text-[#4A453F] border border-[#E9E5D9] hover:bg-[#FAEDCD] transition-colors cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>{uploadedAudioName ? 'Ganti File Musik' : 'Unggah File Musik Sendiri'}</span>
              </button>
              {uploadedAudioName && (
                <span className="text-[11px] text-[#6D7A6A] font-medium truncate max-w-[180px]">
                  ✓ {uploadedAudioName}
                </span>
              )}
              <input
                ref={audioInputRef}
                type="file"
                accept="audio/*"
                onChange={handleAudioUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Quick Share / Link copy */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#FEFAE0] hover:bg-[#FAEDCD] text-[#4A453F] border border-[#CCD5AE] rounded-2xl text-xs font-semibold transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <CheckCheck className="w-4 h-4 text-[#6D7A6A]" />
                  <span>Tautan Web Kartu Berhasil Disalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#D4A373]" />
                  <span>Salin Tautan Web untuk Dikirim ke Teman</span>
                </>
              )}
            </button>
          </div>

          {/* Footer actions */}
          <div className="pt-4 border-t border-[#E9E5D9] flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                if (confirm('Kembalikan ke template data kenangan awal?')) {
                  onReset();
                  onClose();
                }
              }}
              className="inline-flex items-center gap-1.5 text-xs text-[#8B8378] hover:text-[#4A453F] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data Awal</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-[#8B8378] hover:bg-[#FEFAE0] rounded-full border border-[#E9E5D9] transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold bg-[#6D7A6A] hover:bg-[#586455] text-white rounded-full transition-all shadow-xs cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Terapkan</span>
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
