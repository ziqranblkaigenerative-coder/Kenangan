import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { X, Upload, Check, Trash2, Image as ImageIcon, Sparkles } from 'lucide-react';
import { PhotoMemory, YearType } from '../types';
import { CURATED_PHOTO_PRESETS } from '../data/defaultData';

interface PhotoEditorModalProps {
  memoryToEdit: PhotoMemory | null;
  defaultYear?: YearType;
  onSave: (memory: PhotoMemory) => void;
  onDelete?: (id: string) => void;
  onClose: () => void;
}

export const PhotoEditorModal: React.FC<PhotoEditorModalProps> = ({
  memoryToEdit,
  defaultYear = 2026,
  onSave,
  onDelete,
  onClose
}) => {
  const isNew = !memoryToEdit;

  const [year, setYear] = useState<YearType>(memoryToEdit?.year ?? defaultYear);
  const [title, setTitle] = useState(memoryToEdit?.title ?? '');
  const [dateStr, setDateStr] = useState(memoryToEdit?.dateStr ?? '');
  const [location, setLocation] = useState(memoryToEdit?.location ?? '');
  const [description, setDescription] = useState(memoryToEdit?.description ?? '');
  const [quote, setQuote] = useState(memoryToEdit?.quote ?? '');
  const [tag, setTag] = useState(memoryToEdit?.tag ?? 'Kenangan');
  const [imageUrl, setImageUrl] = useState(memoryToEdit?.imageUrl ?? CURATED_PHOTO_PRESETS[0].url);
  const [isPresetOpen, setIsPresetOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    let gradeLabel = 'Kenangan Masa SMA';
    if (year === 2023) gradeLabel = 'Kelas X • Awal Mula Perjalanan';
    else if (year === 2024) gradeLabel = 'Kelas XI • Puncak Kehebohan';
    else if (year === 2025) gradeLabel = 'Kelas XII • Masa Perjuangan & Ujian';
    else if (year === 2026) gradeLabel = 'Tahun 2026 • Kelulusan & Babak Baru';

    const savedMemory: PhotoMemory = {
      id: memoryToEdit?.id ?? `mem-${Date.now()}`,
      year,
      gradeLabel,
      title: title.trim(),
      dateStr: dateStr.trim() || `${year}`,
      location: location.trim() || 'SMA Tercinta',
      description: description.trim() || 'Momen indah yang tak terlupakan bersama sahabat.',
      imageUrl: imageUrl.trim() || CURATED_PHOTO_PRESETS[0].url,
      quote: quote.trim() || undefined,
      tag: tag.trim() || 'Kenangan',
      rotation: memoryToEdit?.rotation ?? (Math.floor(Math.random() * 7) - 3),
      isFavorite: memoryToEdit?.isFavorite ?? false,
    };

    onSave(savedMemory);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#4A453F]/75 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-3xl shadow-2xl border border-[#E9E5D9] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E9E5D9] bg-[#FEFAE0]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#CCD5AE] text-[#4A453F] flex items-center justify-center font-bold">
              <ImageIcon className="w-4 h-4 text-[#6D7A6A]" />
            </div>
            <div>
              <h3 className="font-serif-display font-medium text-[#4A453F] text-lg italic">
                {isNew ? 'Tambah Foto Kenangan Baru' : 'Edit Foto & Cerita'}
              </h3>
              <p className="text-xs text-[#8B8378] font-sans">
                Abadikan momen berharga persahabatan 2023 - 2026
              </p>
            </div>
          </div>

          <button
            id="editor-close-btn"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white border border-[#E9E5D9] text-[#8B8378] hover:text-[#4A453F] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Photo Preview and Upload */}
          <div>
            <label className="block text-xs font-bold text-[#6D7A6A] uppercase tracking-wider mb-2">
              Foto Kenangan
            </label>
            <div className="flex flex-col sm:flex-row gap-4 items-center bg-white p-4 rounded-2xl border border-dashed border-[#CCD5AE]">
              <div className="w-32 h-24 bg-[#FEFAE0] rounded-xl overflow-hidden shrink-0 border border-[#E9E5D9] shadow-2xs relative group">
                <img
                  src={imageUrl}
                  alt="Preview"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 w-full space-y-2">
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#6D7A6A] text-white hover:bg-[#586455] transition-colors cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Foto Sendiri</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsPresetOpen(!isPresetOpen)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white text-[#4A453F] border border-[#E9E5D9] hover:bg-[#FEFAE0] transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
                    <span>Pilih Foto Estetik</span>
                  </button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Atau tempelkan link URL foto..."
                  className="w-full text-xs px-3 py-1.5 bg-[#FDFBF7] border border-[#E9E5D9] rounded-xl focus:outline-hidden focus:ring-1 focus:ring-[#6D7A6A]"
                />
              </div>
            </div>

            {/* Presets Gallery dropdown */}
            {isPresetOpen && (
              <div className="mt-3 p-3 bg-[#FEFAE0] rounded-2xl border border-[#CCD5AE]">
                <span className="text-[11px] font-semibold text-[#6D7A6A] uppercase tracking-wider block mb-2 font-sans">
                  Pilih Contoh Foto Kenangan SMA:
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {CURATED_PHOTO_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setImageUrl(preset.url);
                        if (!title) setTitle(preset.title);
                        setIsPresetOpen(false);
                      }}
                      className="group relative aspect-4/3 rounded-xl overflow-hidden border border-[#E9E5D9] hover:border-[#6D7A6A] transition-all cursor-pointer shadow-2xs"
                    >
                      <img
                        src={preset.url}
                        alt={preset.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-[#4A453F]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-1 text-center">
                        <span className="text-[10px] font-bold text-white leading-tight">
                          {preset.tag}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Year selector & Tag */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#6D7A6A] uppercase tracking-wider mb-1">
                Tahun Kenangan SMA *
              </label>
              <select
                value={year}
                onChange={(e) => setYear(Number(e.target.value) as YearType)}
                className="w-full px-3.5 py-2 text-sm bg-white border border-[#E9E5D9] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#6D7A6A] font-medium text-[#4A453F]"
              >
                <option value={2023}>2023 - Kelas X (Awal Mula & Kenalan)</option>
                <option value={2024}>2024 - Kelas XI (Paling Heboh & Seru)</option>
                <option value={2025}>2025 - Kelas XII (Perjuangan & Bimbel)</option>
                <option value={2026}>2026 - Kelulusan (Graduation & Babak Baru)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#6D7A6A] uppercase tracking-wider mb-1">
                Kategori / Tag
              </label>
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="Contoh: Study Tour, Kantin, Ujian..."
                className="w-full px-3.5 py-2 text-sm bg-white border border-[#E9E5D9] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#6D7A6A] text-[#4A453F]"
              />
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-[#6D7A6A] uppercase tracking-wider mb-1">
              Judul Foto Kenangan *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Momen Hujan-hujanan Sepulang Sekolah..."
              className="w-full px-3.5 py-2 text-sm bg-white border border-[#E9E5D9] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#6D7A6A] font-medium text-[#4A453F]"
            />
          </div>

          {/* Date & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#6D7A6A] uppercase tracking-wider mb-1">
                Waktu / Bulan
              </label>
              <input
                type="text"
                value={dateStr}
                onChange={(e) => setDateStr(e.target.value)}
                placeholder="Contoh: Oktober 2024"
                className="w-full px-3.5 py-2 text-sm bg-white border border-[#E9E5D9] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#6D7A6A] text-[#4A453F]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#6D7A6A] uppercase tracking-wider mb-1">
                Lokasi Kenangan
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Contoh: Lapangan Belakang, Kantin..."
                className="w-full px-3.5 py-2 text-sm bg-white border border-[#E9E5D9] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#6D7A6A] text-[#4A453F]"
              />
            </div>
          </div>

          {/* Story / Description */}
          <div>
            <label className="block text-xs font-bold text-[#6D7A6A] uppercase tracking-wider mb-1">
              Kisah & Cerita di Balik Foto
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ceritakan kejadian lucu, haru, atau suka duka di momen ini..."
              className="w-full px-3.5 py-2 text-sm bg-white border border-[#E9E5D9] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#6D7A6A] text-[#4A453F]"
            />
          </div>

          {/* Quote / Short handwritten note */}
          <div>
            <label className="block text-xs font-bold text-[#6D7A6A] uppercase tracking-wider mb-1">
              Kutipan / Catatan Tangan Singkat
            </label>
            <input
              type="text"
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              placeholder="Contoh: Selalu ada tawa di balik lelahnya seragam putih abu-abu."
              className="w-full px-3.5 py-2 text-sm bg-white border border-[#E9E5D9] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#6D7A6A] italic text-[#4A453F]"
            />
          </div>

          {/* Buttons */}
          <div className="pt-4 border-t border-[#E9E5D9] flex items-center justify-between">
            {!isNew && onDelete ? (
              <button
                type="button"
                id="editor-delete-btn"
                onClick={() => {
                  if (confirm('Yakin ingin menghapus foto kenangan ini?')) {
                    onDelete(memoryToEdit.id);
                    onClose();
                  }
                }}
                className="inline-flex items-center gap-1.5 text-xs text-[#D4A373] hover:text-[#BC6C25] px-3.5 py-2 rounded-full hover:bg-[#FAEDCD] font-medium transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus Foto</span>
              </button>
            ) : <div />}

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
                id="editor-save-btn"
                className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold bg-[#6D7A6A] hover:bg-[#586455] text-white rounded-full transition-all shadow-xs cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>{isNew ? 'Tambahkan Foto' : 'Simpan Perubahan'}</span>
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
