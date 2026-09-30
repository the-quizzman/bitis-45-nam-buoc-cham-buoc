import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/mockData';
import { GalleryItem } from '../types';
import { Camera, X, ZoomIn, Hash } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  const categories = [
    { key: 'all', label: 'TẤT CẢ' },
    { key: 'runner', label: 'RUNNER' },
    { key: 'family', label: 'GIA ĐÌNH' },
    { key: 'bitis', label: 'BITI’S' },
    { key: 'route', label: 'ĐƯỜNG CHẠY' },
    { key: 'stage', label: 'SÂN KHẤU' },
    { key: 'checkin', label: 'CHECK-IN' },
  ];

  const filteredPhotos =
    selectedCategory === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((p) => p.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-heading font-black tracking-widest text-orange-600 uppercase mb-2 inline-block">
            KHOẢNH KHẮC GIẢI CHẠY
          </span>
          <h2 className="text-balance font-heading font-black text-3xl sm:text-5xl text-slate-900 uppercase tracking-tight">
            NHỮNG BƯỚC CHÂN ĐƯỢC GHI DẤU
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Cùng lưu giữ năng lượng thể thao bùng nổ và tình thân gắn kết qua từng góc máy rạng rỡ.
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat.key
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-orange-300 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200/90 aspect-[4/3] shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest">
                  {photo.tag}
                </span>
                <h3 className="font-heading font-black text-lg mt-1 text-white">
                  {photo.title}
                </h3>
                <p className="text-xs text-slate-200 mt-1 line-clamp-1">
                  {photo.caption}
                </p>

                <div className="absolute top-3.5 right-3.5 p-2 rounded-full bg-white/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-2xl text-slate-900"
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-3.5 right-3.5 z-10 p-2 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[70vh] bg-slate-950 flex items-center justify-center overflow-hidden">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            <div className="p-6 bg-gradient-to-r from-white via-amber-50/40 to-white border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                  {activePhoto.tag}
                </span>
                <h3 className="font-heading font-black text-2xl text-slate-900 mt-1">
                  {activePhoto.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  {activePhoto.caption}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                  Kỷ niệm 45 Năm Biti’s
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
