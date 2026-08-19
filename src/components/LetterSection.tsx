import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Edit3, Check, Quote, Calendar } from 'lucide-react';
import { GreetingCardData } from '../types';

interface LetterSectionProps {
  cardData: GreetingCardData;
  onUpdateCardData: (updated: Partial<GreetingCardData>) => void;
}

export const LetterSection: React.FC<LetterSectionProps> = ({
  cardData,
  onUpdateCardData
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editRecipient, setEditRecipient] = useState(cardData.recipientName);
  const [editSender, setEditSender] = useState(cardData.senderName);
  const [editHeadline, setEditHeadline] = useState(cardData.letterHeadline);
  const [editContent, setEditContent] = useState(cardData.letterContent);
  const [editSpecialNote, setEditSpecialNote] = useState(cardData.specialNote);

  const handleSave = () => {
    onUpdateCardData({
      recipientName: editRecipient,
      senderName: editSender,
      letterHeadline: editHeadline,
      letterContent: editContent,
      specialNote: editSpecialNote
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditRecipient(cardData.recipientName);
    setEditSender(cardData.senderName);
    setEditHeadline(cardData.letterHeadline);
    setEditContent(cardData.letterContent);
    setEditSpecialNote(cardData.specialNote);
    setIsEditing(false);
  };

  return (
    <section id="section-letter" className="py-12 px-4 sm:px-6 relative">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6D7A6A] bg-[#CCD5AE]/40 px-3.5 py-1 rounded-full mb-2 border border-[#A9B388]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
            <span className="uppercase tracking-[0.15em] text-[10px]">Ungkapan Dari Lubuk Hati</span>
          </div>
          <h2 className="font-serif-display text-2xl sm:text-4xl font-medium text-[#4A453F] italic">
            Surat Untuk Sahabat Seperjuangan
          </h2>
          <p className="text-xs sm:text-sm text-[#8B8378] mt-1 font-sans uppercase tracking-wider">
            Mengenang perjalanan persahabatan kita dari 2023 hingga 2026
          </p>
        </div>

        {/* Vintage Parchment Letter Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-[#FEFAE0] border border-[#E9E5D9] rounded-[32px] p-6 sm:p-12 shadow-md text-[#4A453F] letter-paper"
        >
          {/* Washi tape accents */}
          <div className="washi-tape-top" />
          <div className="washi-tape-corner" />

          {/* Quick Edit Toggle in Top Right */}
          <div className="flex justify-end mb-4">
            {!isEditing ? (
              <button
                id="edit-letter-btn"
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-1.5 text-xs text-[#6D7A6A] bg-[#CCD5AE]/40 hover:bg-[#CCD5AE]/70 px-3.5 py-1.5 rounded-full font-medium transition-colors cursor-pointer border border-[#A9B388]"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#6D7A6A]" />
                <span>Edit Kata-Kata Surat</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  id="cancel-letter-btn"
                  onClick={handleCancel}
                  className="text-xs text-[#8B8378] hover:text-[#4A453F] px-3 py-1.5 rounded-full border border-[#E9E5D9] font-medium transition-colors cursor-pointer bg-white"
                >
                  Batal
                </button>
                <button
                  id="save-letter-btn"
                  onClick={handleSave}
                  className="inline-flex items-center gap-1 text-xs text-white bg-[#6D7A6A] hover:bg-[#586455] px-3.5 py-1.5 rounded-full font-medium transition-colors shadow-2xs cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            )}
          </div>

          {isEditing ? (
            /* Editing Form Mode */
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-[#6D7A6A] uppercase tracking-[0.15em] mb-1">
                  Nama Sahabat (Penerima)
                </label>
                <input
                  type="text"
                  value={editRecipient}
                  onChange={(e) => setEditRecipient(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-[#CCD5AE] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#6D7A6A]"
                  placeholder="Nama Sahabat..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6D7A6A] uppercase tracking-[0.15em] mb-1">
                  Judul Surat
                </label>
                <input
                  type="text"
                  value={editHeadline}
                  onChange={(e) => setEditHeadline(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-[#CCD5AE] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#6D7A6A] font-serif-display font-medium"
                  placeholder="Judul Surat..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6D7A6A] uppercase tracking-[0.15em] mb-1">
                  Isi Surat Ucapan & Rasa Terima Kasih
                </label>
                <textarea
                  rows={10}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-[#CCD5AE] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#6D7A6A] font-sans leading-relaxed"
                  placeholder="Tuliskan ungkapan terima kasih, suka duka bersama..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6D7A6A] uppercase tracking-[0.15em] mb-1">
                  Kutipan / Catatan Spesial
                </label>
                <input
                  type="text"
                  value={editSpecialNote}
                  onChange={(e) => setEditSpecialNote(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-[#CCD5AE] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#6D7A6A] italic"
                  placeholder="Kutipan persahabatan..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6D7A6A] uppercase tracking-[0.15em] mb-1">
                  Nama Pengirim (Namamu)
                </label>
                <input
                  type="text"
                  value={editSender}
                  onChange={(e) => setEditSender(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-[#CCD5AE] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#6D7A6A]"
                  placeholder="Namamu..."
                />
              </div>
            </div>
          ) : (
            /* Styled Reading Mode */
            <div className="space-y-6">
              {/* Header inside letter */}
              <div className="border-b border-[#E9E5D9] pb-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-[#8B8378] font-semibold block">
                    Kepada Tersayang
                  </span>
                  <h3 className="font-handwriting text-3xl sm:text-4xl text-[#4A453F] font-bold">
                    {cardData.recipientName}
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#8B8378] font-medium font-sans">
                  <Calendar className="w-3.5 h-3.5 text-[#6D7A6A]" />
                  <span>2023 — 2026</span>
                </div>
              </div>

              {/* Headline */}
              <h4 className="font-serif-display text-xl sm:text-2xl font-medium text-[#6D7A6A] italic leading-snug">
                {cardData.letterHeadline}
              </h4>

              {/* Letter Paragraphs */}
              <div className="space-y-4 text-[#5C564E] text-sm sm:text-base leading-relaxed whitespace-pre-line font-sans">
                {cardData.letterContent}
              </div>

              {/* Special Quote Box */}
              {cardData.specialNote && (
                <div className="my-6 p-4 sm:p-6 bg-[#E9EDC6]/50 rounded-2xl border-l-4 border-[#6D7A6A] relative">
                  <Quote className="w-6 h-6 text-[#6D7A6A]/30 absolute top-3 right-3 pointer-events-none" />
                  <p className="font-serif-display italic text-[#4A453F] text-sm sm:text-base leading-relaxed">
                    {cardData.specialNote}
                  </p>
                </div>
              )}

              {/* Signature & Closing */}
              <div className="pt-6 border-t border-[#E9E5D9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-[#8B8378] font-medium block">Dengan tulus & cinta persahabatan,</span>
                  <span className="font-handwriting text-3xl font-bold text-[#D4A373] block mt-1">
                    {cardData.senderName}
                  </span>
                </div>

                {/* Clay/Earth Stamp Graphic */}
                <div className="flex items-center gap-2.5 bg-white/70 border border-[#CCD5AE] px-3.5 py-2 rounded-full shadow-2xs">
                  <div className="w-7 h-7 rounded-full bg-[#D4A373] flex items-center justify-center text-white">
                    <Heart className="w-3.5 h-3.5 fill-white" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[#4A453F] block leading-tight">
                      Sahabat Sejati
                    </span>
                    <span className="text-[9px] text-[#8B8378] font-medium block">
                      SMA 2023 - 2026
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
