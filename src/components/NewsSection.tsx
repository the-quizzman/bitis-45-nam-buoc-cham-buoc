import React, { useState } from 'react';
import { NEWS_LIST } from '../data/mockData';
import { NewsItem } from '../types';
import { Newspaper, Calendar, Clock, ArrowRight, X, Sparkles } from 'lucide-react';

export const NewsSection: React.FC = () => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');

  const categories = ['Tất cả', 'Sự Kiện', 'Cộng Đồng', 'Cung Đường', 'Kinh Nghiệm'];

  const filteredNews =
    selectedCategory === 'Tất cả'
      ? NEWS_LIST
      : NEWS_LIST.filter((n) => n.category === selectedCategory);

  return (
    <section id="news" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-heading font-black tracking-widest text-orange-600 uppercase mb-2 inline-block">
            TIN TỨC & CÂU CHUYỆN RUNNER
          </span>
          <h2 className="text-balance font-heading font-black text-3xl sm:text-5xl text-slate-900 uppercase tracking-tight">
            BƯỚC CHẠY MỚI NHẤT
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Cập nhật những thông tin nhanh chóng, câu chuyện truyền cảm hứng và cẩm nang chuẩn bị cho giải chạy.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25'
                  : 'bg-white text-slate-600 hover:bg-orange-50 hover:text-orange-600 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredNews.map((news) => (
            <div
              key={news.id}
              onClick={() => setSelectedNews(news)}
              className="group bg-white rounded-3xl border border-orange-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 hover:border-orange-300"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[11px] font-heading font-black uppercase tracking-wider shadow">
                    {news.category}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-3 text-[11px] text-neutral-400 font-semibold mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {news.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {news.readTime}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-base text-neutral-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                    {news.title}
                  </h3>

                  <p className="text-xs text-neutral-600 mt-2 line-clamp-3 leading-relaxed">
                    {news.summary}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-stone-100 mt-2 flex items-center justify-between text-xs font-bold text-red-600">
                <span>Đọc bài viết</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Article Detail Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto text-neutral-900">
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-neutral-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-xs font-bold uppercase">
              {selectedNews.category}
            </span>

            <h3 className="font-heading font-black text-2xl sm:text-3xl mt-3 mb-2 leading-tight">
              {selectedNews.title}
            </h3>

            <div className="flex items-center gap-3 text-xs text-neutral-400 mb-4 pb-4 border-b border-stone-100">
              <span>{selectedNews.date}</span>
              <span>•</span>
              <span>{selectedNews.readTime}</span>
              <span>•</span>
              <span>Ban Biên Tập Biti's 45 Năm</span>
            </div>

            <div className="rounded-2xl overflow-hidden mb-6 h-64 bg-stone-100">
              <img
                src={selectedNews.image}
                alt={selectedNews.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 text-sm text-neutral-700 leading-relaxed">
              <p className="font-bold text-neutral-900 text-base">
                {selectedNews.summary}
              </p>
              <p>{selectedNews.content}</p>
              <p>
                Giải chạy hứa hẹn sẽ mang đến những khoảnh khắc cảm xúc thăng hoa không thể nào quên cho cộng đồng runner và gia đình tại Khu đô thị Sala vào ngày 07/03/2027 tới đây.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setSelectedNews(null)}
                className="px-6 py-2.5 bg-neutral-900 text-white font-bold text-xs uppercase rounded-xl hover:bg-neutral-800 transition-all cursor-pointer"
              >
                Đóng bài viết
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
