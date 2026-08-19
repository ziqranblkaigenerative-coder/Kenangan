import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, Plus, Send, MessageCircle, Lock } from 'lucide-react';
import { FriendshipWish } from '../types';

interface TimeCapsuleSectionProps {
  wishes: FriendshipWish[];
  promiseText: string;
  senderName: string;
  recipientName: string;
  onAddWish: (wish: Omit<FriendshipWish, 'id'>) => void;
  onUpdatePromise: (text: string) => void;
}

const STICKY_COLORS = [
  'bg-[#CCD5AE]/60 text-[#4A453F] border-[#A9B388]',
  'bg-[#FEFAE0] text-[#4A453F] border-[#E9E5D9]',
  'bg-[#FAEDCD] text-[#4A453F] border-[#D4A373]',
  'bg-[#E9EDC6] text-[#4A453F] border-[#CCD5AE]',
  'bg-[#D4A373]/30 text-[#4A453F] border-[#BC6C25]/40',
];

const EMOJI_OPTIONS = ['🎓', '🌿', '✨', '☕', '📜', '💌', '🌸', '🎉', '🍀'];

export const TimeCapsuleSection: React.FC<TimeCapsuleSectionProps> = ({
  wishes,
  promiseText,
  senderName,
  recipientName,
  onAddWish,
  onUpdatePromise
}) => {
  const [newSender, setNewSender] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🎓');
  const [selectedColor, setSelectedColor] = useState(STICKY_COLORS[0]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditingPromise, setIsEditingPromise] = useState(false);
  const [tempPromise, setTempPromise] = useState(promiseText);

  const handlePostWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    onAddWish({
      sender: newSender.trim() || senderName || 'Sahabat',
      message: newMessage.trim(),
      date: '2026',
      emoji: selectedEmoji,
      bgColor: selectedColor,
    });

    setNewMessage('');
    setIsAdding(false);
  };

  const handleSavePromise = () => {
    onUpdatePromise(tempPromise);
    setIsEditingPromise(false);
  };

  return (
    <section id="section-capsule" className="py-12 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6D7A6A] bg-[#CCD5AE]/40 px-3.5 py-1 rounded-full mb-2 border border-[#A9B388]">
            <Award className="w-3.5 h-3.5 text-[#D4A373]" />
            <span className="uppercase tracking-[0.15em] text-[10px]">Pesan & Doa Kelulusan 2026</span>
          </div>
          <h2 className="font-serif-display text-2xl sm:text-4xl font-medium text-[#4A453F] italic">
            Kapsul Waktu & Janji Persahabatan
          </h2>
          <p className="text-xs sm:text-sm text-[#8B8378] mt-2 font-sans">
            Pesan-pesan hangat, doa kelulusan, dan janji untuk tetap saling kabar di masa depan.
          </p>
        </div>

        {/* Friendship Promise Card */}
        <div className="mb-10 bg-[#FEFAE0] border-2 border-[#CCD5AE] rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden shadow-xs">
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#6D7A6A] text-[#FAEDCD] text-xs font-semibold uppercase tracking-wider">
              <Lock className="w-3 h-3" />
              <span>Janji Persahabatan SMA 2023 - 2026</span>
            </div>

            {isEditingPromise ? (
              <div className="space-y-3 pt-2">
                <textarea
                  rows={3}
                  value={tempPromise}
                  onChange={(e) => setTempPromise(e.target.value)}
                  className="w-full p-3 text-sm bg-white border border-[#CCD5AE] rounded-2xl focus:outline-hidden focus:ring-2 focus:ring-[#6D7A6A] font-serif-display text-[#4A453F]"
                />
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => setIsEditingPromise(false)}
                    className="px-3.5 py-1.5 text-xs text-[#8B8378] font-medium hover:bg-white rounded-full border border-[#E9E5D9] cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSavePromise}
                    className="px-4 py-1.5 text-xs text-white font-semibold bg-[#6D7A6A] hover:bg-[#586455] rounded-full shadow-2xs cursor-pointer"
                  >
                    Simpan Janji
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="font-serif-display text-lg sm:text-xl font-medium text-[#4A453F] italic leading-relaxed">
                  "{promiseText}"
                </p>
                <div className="mt-4 flex items-center justify-center gap-3 text-xs text-[#6D7A6A] font-medium">
                  <span className="font-handwriting text-2xl font-bold text-[#4A453F]">{senderName}</span>
                  <span>🤝</span>
                  <span className="font-handwriting text-2xl font-bold text-[#4A453F]">{recipientName}</span>
                  <button
                    onClick={() => {
                      setTempPromise(promiseText);
                      setIsEditingPromise(true);
                    }}
                    className="ml-2 text-[11px] text-[#D4A373] hover:underline cursor-pointer font-sans"
                  >
                    (edit janji)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sticky Notes Board */}
        <div className="bg-[#FDFBF7] border border-[#E9E5D9] rounded-3xl p-6 sm:p-8 relative">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif-display font-medium text-[#4A453F] text-lg sm:text-xl flex items-center gap-2 italic">
              <MessageCircle className="w-5 h-5 text-[#6D7A6A]" />
              <span>Papan Catatan & Ucapan</span>
            </h3>

            {!isAdding && (
              <button
                id="add-sticky-btn"
                onClick={() => setIsAdding(true)}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#6D7A6A] hover:bg-[#586455] text-white transition-all shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tulis Ucapan Baru</span>
              </button>
            )}
          </div>

          {/* Form to add note */}
          {isAdding && (
            <motion.form
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handlePostWish}
              className="bg-white p-5 rounded-2xl border border-[#CCD5AE] shadow-md mb-6 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#6D7A6A] uppercase tracking-wider">
                  Tempel Catatan Kenangan
                </span>
                {/* Emoji Selector */}
                <div className="flex items-center gap-1">
                  {EMOJI_OPTIONS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setSelectedEmoji(emoji)}
                      className={`w-7 h-7 rounded-full text-sm flex items-center justify-center transition-all cursor-pointer ${
                        selectedEmoji === emoji ? 'bg-[#CCD5AE] scale-110 shadow-xs' : 'hover:bg-[#FEFAE0]'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={newSender}
                  onChange={(e) => setNewSender(e.target.value)}
                  placeholder={`Nama Pengirim (Default: ${senderName})`}
                  className="w-full px-3 py-2 text-xs bg-[#FDFBF7] border border-[#E9E5D9] rounded-xl focus:outline-hidden focus:ring-1 focus:ring-[#6D7A6A]"
                />

                {/* Color Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-[#8B8378]">Warna Kertas:</span>
                  {STICKY_COLORS.map((c, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      className={`w-6 h-6 rounded-full border ${c.split(' ')[0]} cursor-pointer ${
                        selectedColor === c ? 'ring-2 ring-[#6D7A6A] scale-110' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>

              <textarea
                rows={3}
                required
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Tuliskan ucapan penyemangat, doa kelulusan, atau kenangan lucu masa SMA..."
                className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FDFBF7] border border-[#E9E5D9] rounded-xl focus:outline-hidden focus:ring-1 focus:ring-[#6D7A6A]"
              />

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-3.5 py-1.5 text-xs text-[#8B8378] font-medium hover:bg-[#FEFAE0] rounded-full border border-[#E9E5D9] cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold bg-[#6D7A6A] hover:bg-[#586455] text-white rounded-full transition-all cursor-pointer"
                >
                  <Send className="w-3 h-3" />
                  <span>Tempelkan Catatan</span>
                </button>
              </div>
            </motion.form>
          )}

          {/* Sticky Notes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {wishes.map((wish, index) => {
              const rotation = (index % 3 - 1) * 2; // subtle tilt -2, 0, 2 deg
              return (
                <motion.div
                  key={wish.id}
                  style={{ transform: `rotate(${rotation}deg)` }}
                  whileHover={{ scale: 1.03, rotate: 0 }}
                  className={`p-5 rounded-2xl border shadow-xs transition-all relative flex flex-col justify-between min-h-[145px] ${wish.bgColor}`}
                >
                  {/* Pin or tape at top */}
                  <div className="w-8 h-2 bg-[#8B8378]/20 rounded-full mx-auto mb-2" />

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xl">{wish.emoji}</span>
                      <span className="text-[10px] font-bold opacity-75 uppercase tracking-wider font-sans">
                        {wish.date}
                      </span>
                    </div>

                    <p className="font-note text-base sm:text-lg leading-snug">
                      "{wish.message}"
                    </p>
                  </div>

                  <div className="pt-2 mt-2 border-t border-black/10 text-right">
                    <span className="font-handwriting text-sm sm:text-base font-bold opacity-90">
                      — {wish.sender}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
