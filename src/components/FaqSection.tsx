import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, AlertCircle } from 'lucide-react';
import { FAQ_LIST } from '../data/mockData';

export const FaqSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'register' | 'distance' | 'racekit' | 'raceday'>('all');
  const [expandedId, setExpandedId] = useState<string | null>('reg-1');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { key: 'all', label: 'TẤT CẢ CÂU HỎI' },
    { key: 'register', label: 'ĐĂNG KÝ' },
    { key: 'distance', label: 'CỰ LY THI ĐẤU' },
    { key: 'racekit', label: 'NHẬN RACE KIT' },
    { key: 'raceday', label: 'NGÀY CHẠY (RACE DAY)' },
  ];

  const filteredFaqs = FAQ_LIST.filter((faq) => {
    const matchesCategory =
      activeCategory === 'all' || faq.category === activeCategory;
    const matchesQuery =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-heading font-black tracking-widest text-orange-600 uppercase mb-2 inline-block">
            GIẢI ĐÁP THẮC MẮC
          </span>
          <h2 className="text-balance font-heading font-black text-3xl sm:text-5xl text-slate-900 uppercase tracking-tight">
            CÂU HỎI THƯỜNG GẶP (FAQ)
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Tổng hợp mọi thông tin cần biết để bạn và gia đình chuẩn bị sẵn sàng cho giải chạy.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative mb-6">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm kiếm câu hỏi (ví dụ: cự ly, nhận hộ, gửi đồ, đổi thông tin...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border-2 border-orange-100 focus:border-orange-500 focus:outline-none text-sm text-slate-900 transition-colors shadow-xs"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat.key
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25'
                  : 'bg-white text-slate-700 hover:bg-orange-50 hover:text-orange-600 border border-orange-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              Không tìm thấy câu hỏi phù hợp với từ khóa của bạn.
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = expandedId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen
                      ? 'bg-orange-50/40 border-orange-300 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-orange-200'
                  }`}
                >
                  <button
                    onClick={() => toggleExpand(faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-heading font-bold text-sm sm:text-base text-slate-900">
                      {faq.question}
                    </span>
                    <div
                      className={`p-1.5 rounded-full shrink-0 transition-transform ${
                        isOpen ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-stone-100 pt-3">
                      <p>{faq.answer}</p>
                      {faq.isOfficialPending && (
                        <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>Thông tin chi tiết sẽ được Ban Tổ chức cập nhật chính thức.</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
};
