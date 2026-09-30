import React, { useState } from 'react';
import { NEWS_LIST, GALLERY_ITEMS } from '../data/mockData';
import { NewsItem, GalleryItem } from '../types';
import { Newspaper, Camera, ArrowRight, X } from 'lucide-react';

export const NewsGallerySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'news' | 'gallery'>('news');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  // Gallery category filter
  const [galleryFilter, setGalleryFilter] = useState<string>('all');
  const filteredPhotos =
    galleryFilter === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((p) => p.category === galleryFilter);

  return (
    <section
      id="news-gallery"
      className="relative min-h-[calc(100vh-76px)] lg:h-[calc(100vh-76px)] lg:max-h-[calc(100vh-76px)] py-8 lg:py-0 flex flex-col justify-center bg-white text-[#18233A] overflow-hidden"
    >
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Header with Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-3 lg:mb-4">
          <div>
            <span className="text-[11px] font-heading font-bold uppercase tracking-widest text-[#005EB8] mb-1 block">
              TRUYỀN THÔNG & CỘNG ĐỒNG
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-[#18233A] leading-tight">
              Bản tin & Khoảnh khắc
            </h2>
          </div>

          <div className="inline-flex p-1 bg-[#F3F7FA] rounded-xl border border-[#E8EDF2] self-start md:self-auto shrink-0">
            <button
              onClick={() => setActiveTab('news')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-heading font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'news'
                  ? 'bg-[#18233A] text-white shadow-xs'
                  : 'text-[#526077] hover:text-[#18233A]'
              }`}
            >
              <Newspaper className="w-3.5 h-3.5" />
              <span>Bản tin sự kiện</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-heading font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'gallery'
                  ? 'bg-[#18233A] text-white shadow-xs'
                  : 'text-[#526077] hover:text-[#18233A]'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Khoảnh khắc runner</span>
            </button>
          </div>
        </div>

        {/* TAB 1: NEWS */}
        {activeTab === 'news' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 max-h-[380px] lg:max-h-[400px]">
            {NEWS_LIST.slice(0, 4).map((news) => (
              <div
                key={news.id}
                onClick={() => setSelectedNews(news)}
                className="group rounded-2xl border border-[#E8EDF2] bg-[#FAF7F1] hover:bg-white hover:border-[#F26522]/40 transition-all p-3 flex flex-col justify-between cursor-pointer shadow-[0_2px_8px_rgba(24,35,58,0.02)]"
              >
                <div>
                  <div className="relative h-28 sm:h-32 rounded-xl overflow-hidden bg-slate-200 mb-2.5">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-md text-white text-[9px] font-heading font-bold uppercase">
                      {news.category}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-[#8C9BAE] block mb-0.5">
                    {news.date}
                  </span>

                  <h3 className="font-heading font-bold text-xs sm:text-sm text-[#18233A] group-hover:text-[#F26522] transition-colors line-clamp-2 mb-1">
                    {news.title}
                  </h3>

                  <p className="text-[11px] text-[#526077] line-clamp-2 leading-relaxed">
                    {news.excerpt}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#EEE5D7] mt-2 flex items-center justify-between text-xs font-heading font-bold text-[#F26522]">
                  <span>Chi tiết</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: GALLERY */}
        {activeTab === 'gallery' && (
          <div className="rounded-2xl border border-[#E8EDF2] bg-[#FAF7F1] p-3.5 max-h-[380px] lg:max-h-[400px] flex flex-col justify-between">
            {/* Filter pills */}
            <div className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-[#EEE5D7]">
              {[
                { id: 'all', label: 'Tất cả' },
                { id: 'runner', label: 'Runner' },
                { id: 'family', label: 'Gia đình' },
                { id: 'bitis', label: 'Di sản Biti’s' },
                { id: 'route', label: 'Cung đường Sala' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setGalleryFilter(cat.id)}
                  className={`px-2.5 py-0.5 rounded-lg text-xs font-heading font-semibold transition-all cursor-pointer ${
                    galleryFilter === cat.id
                      ? 'bg-[#18233A] text-white'
                      : 'bg-white text-[#526077] hover:text-[#18233A] border border-[#EEE5D7]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Photos Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 py-2.5 overflow-y-auto max-h-[260px]">
              {filteredPhotos.slice(0, 6).map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className="group relative rounded-xl overflow-hidden aspect-square bg-slate-100 cursor-pointer shadow-xs"
                >
                  <img
                    src={photo.imageUrl}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-end text-white text-[10px]">
                    <span className="font-bold line-clamp-1">{photo.title}</span>
                    <span className="text-[9px] text-white/70">{photo.tag}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[#EEE5D7] flex items-center justify-between text-[11px] text-[#526077]">
              <span>Tất cả VĐV có thể tra cứu ảnh thi đấu theo số BIB miễn phí ngay sau giải.</span>
              <span className="font-bold text-[#F26522]">#BuocChamBuoc #Bitis45Nam</span>
            </div>
          </div>
        )}

      </div>

      {/* News Detail Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#18233A]/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 max-h-[85vh] overflow-y-auto shadow-2xl border border-[#E8EDF2]">
            <div className="flex items-center justify-between pb-3 border-b border-[#EEE5D7]">
              <span className="text-xs font-mono font-bold text-[#005EB8]">{newsDateFormat(selectedNews.date)} · {selectedNews.category}</span>
              <button onClick={() => setSelectedNews(null)} className="p-1 text-[#8C9BAE] hover:text-[#18233A]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <h3 className="font-heading font-black text-xl text-[#18233A] mt-3 mb-2">{selectedNews.title}</h3>
            <img src={selectedNews.image} alt={selectedNews.title} className="w-full h-52 object-cover rounded-xl my-3" />
            <p className="text-sm text-[#526077] leading-relaxed mb-4">{selectedNews.content || selectedNews.excerpt}</p>
            <button
              onClick={() => setSelectedNews(null)}
              className="w-full py-2.5 rounded-xl bg-[#18233A] text-white font-heading font-bold text-xs uppercase"
            >
              Đóng bài viết
            </button>
          </div>
        </div>
      )}

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#18233A]/80 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl">
            <div className="relative h-[380px] bg-black">
              <img src={selectedPhoto.imageUrl} alt={selectedPhoto.caption} className="w-full h-full object-contain" />
              <button onClick={() => setSelectedPhoto(null)} className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 flex items-center justify-between text-xs text-[#526077]">
              <div>
                <span className="font-bold text-[#18233A] block">{selectedPhoto.title}</span>
                <span>{selectedPhoto.caption}</span>
              </div>
              <button onClick={() => setSelectedPhoto(null)} className="px-4 py-2 rounded-lg bg-[#F26522] text-white font-bold">
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

function newsDateFormat(d: string) {
  return d;
}
