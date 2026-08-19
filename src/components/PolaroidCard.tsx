import React from 'react';
import { motion } from 'motion/react';
import { Heart, MapPin, Calendar, ZoomIn, Edit2 } from 'lucide-react';
import { PhotoMemory } from '../types';

interface PolaroidCardProps {
  memory: PhotoMemory;
  onOpenDetail: (memory: PhotoMemory) => void;
  onEdit: (memory: PhotoMemory) => void;
  onToggleFavorite: (id: string) => void;
}

export const PolaroidCard: React.FC<PolaroidCardProps> = ({
  memory,
  onOpenDetail,
  onEdit,
  onToggleFavorite
}) => {
  const rotationDeg = memory.rotation ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
      style={{
        transform: `rotate(${rotationDeg}deg)`
      }}
      className="polaroid-card group relative bg-white p-3.5 sm:p-4 pb-5 sm:pb-6 rounded-2xl border border-[#E9E5D9] cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
      onClick={() => onOpenDetail(memory)}
      id={`memory-card-${memory.id}`}
    >
      {/* Washi tape on top for scrapbook look */}
      <div className="washi-tape-top" />

      {/* Photo Frame Container */}
      <div className="relative aspect-4/3 w-full bg-[#FEFAE0] rounded-xl overflow-hidden mb-3 border border-[#E9E5D9] group-hover:opacity-95 transition-opacity">
        <img
          src={memory.imageUrl}
          alt={memory.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Year & Tag Badge */}
        <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-[#4A453F]/85 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-xs">
          <span className="text-[#FAEDCD] font-bold">{memory.year}</span>
          <span className="text-white/40">•</span>
          <span className="text-stone-200 truncate max-w-[110px]">{memory.tag}</span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(memory.id);
          }}
          className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-xs transition-transform active:scale-90 cursor-pointer ${
            memory.isFavorite
              ? 'bg-[#D4A373] text-white shadow-xs'
              : 'bg-[#4A453F]/60 text-white/90 hover:bg-[#4A453F] hover:text-white'
          }`}
          title="Tandai Memori Favorit"
        >
          <Heart className={`w-3.5 h-3.5 ${memory.isFavorite ? 'fill-white' : ''}`} />
        </button>

        {/* Hover zoom overlay hint */}
        <div className="absolute inset-0 bg-[#4A453F]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-white/95 backdrop-blur-xs text-[#4A453F] px-3.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-sm border border-[#E9E5D9]">
            <ZoomIn className="w-3.5 h-3.5 text-[#6D7A6A]" />
            Buka Kisah
          </span>
        </div>
      </div>

      {/* Handwritten Caption & Info */}
      <div className="space-y-1.5 px-0.5 text-left">
        <h4 className="font-handwriting text-xl sm:text-2xl font-bold text-[#4A453F] line-clamp-1 leading-tight">
          {memory.title}
        </h4>

        <p className="text-xs text-[#5C564E] line-clamp-2 leading-relaxed font-sans">
          {memory.description}
        </p>

        {/* Footer info: Date & Location */}
        <div className="pt-2 border-t border-dashed border-[#E9E5D9] flex items-center justify-between text-[11px] text-[#8B8378]">
          <div className="flex items-center gap-1 font-sans">
            <Calendar className="w-3 h-3 text-[#6D7A6A]" />
            <span className="font-medium">{memory.dateStr}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-0.5 truncate max-w-[120px]" title={memory.location}>
              <MapPin className="w-3 h-3 text-[#D4A373] shrink-0" />
              <span className="truncate">{memory.location}</span>
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(memory);
              }}
              className="p-1 rounded-full text-[#8B8378] hover:text-[#4A453F] hover:bg-[#CCD5AE]/40 transition-colors cursor-pointer"
              title="Edit Foto / Cerita"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
