import React, { useState } from 'react';
import { TIMELINE_MILESTONES } from '../data/mockData';
import { TimelineMilestone } from '../types';
import { ChevronRight, X, ArrowUpRight } from 'lucide-react';

export const HistoryTimeline: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<TimelineMilestone | null>(null);
  const [activeTab, setActiveTab] = useState<number>(0);

  const milestoneImages: Record<string, { url: string; caption: string; source: string }> = {
    '1982': {
      url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80',
      caption: 'Xưởng sản xuất dép cao su thủ công Vạn Thành – Bình Tiên khởi nghiệp với 20 công nhân kiên trì.',
      source: 'Tư liệu lịch sử Biti’s 1982',
    },
    '2000': {
      url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80',
      caption: 'Thước phim TVC huyền thoại “Nâng niu bàn chân Việt” phát sóng trên truyền hình quốc gia.',
      source: 'Chiến dịch truyền thông Biti’s 2000',
    },
    '2016': {
      url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
      caption: 'Siêu phẩm Biti’s Hunter ra đời làm bùng nổ làn sóng giày sneaker của thế hệ trẻ Việt Nam.',
      source: 'Bộ sưu tập Biti’s Hunter 2016',
    },
    '2017': {
      url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80',
      caption: 'Hiện tượng âm nhạc & truyền thông “Đi để trở về” truyền cảm hứng dịch chuyển và tình cảm gia đình.',
      source: 'Chiến dịch “Đi để trở về” – Biti’s Hunter',
    },
    '2020–2021': {
      url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80',
      caption: 'Các đại tổ hợp nhà máy sản xuất công nghệ cao tại Biên Hòa và Trà Vinh với hơn 10.000 nhân sự.',
      source: 'Hạ tầng sản xuất Biti’s hiện đại',
    },
    '2024': {
      url: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=900&q=80',
      caption: 'Kỷ nguyên thời trang cấp tiến & cam kết Net Zero, phát triển bền vững cùng các sản phẩm tuần hoàn.',
      source: 'Chiến lược phát triển ESG Biti’s',
    },
  };

  return (
    <section id="story" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-heading font-black tracking-widest text-orange-600 uppercase mb-2 inline-block">
            HÀNH TRÌNH 45 NĂM (1982 – 2027)
          </span>

          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 uppercase tracking-tight">
            NHỮNG BƯỚC CHÂN ĐƯỢC TIẾP NỐI
          </h2>

          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            Từ xưởng sản xuất thủ công nhỏ ban đầu đến thương hiệu quốc gia đồng hành cùng hàng chục triệu người Việt trên từng dặm đường.
          </p>
        </div>

        {/* Horizontal Desktop Tabs / Timeline Selector */}
        <div className="hidden lg:grid grid-cols-6 gap-3 mb-8">
          {TIMELINE_MILESTONES.map((item, index) => {
            const isActive = activeTab === index;
            return (
              <button
                key={item.year}
                onClick={() => setActiveTab(index)}
                className={`p-3.5 rounded-xl text-left transition-all border cursor-pointer relative ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-orange-50/70 hover:border-orange-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`font-heading font-black text-lg tracking-tight ${
                      isActive ? 'text-white' : 'text-orange-600'
                    }`}
                  >
                    {item.year}
                  </span>
                </div>
                <div
                  className={`text-xs font-bold line-clamp-1 ${
                    isActive ? 'text-slate-300' : 'text-slate-800'
                  }`}
                >
                  {item.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Featured Milestone Card */}
        {(() => {
          const current = TIMELINE_MILESTONES[activeTab];
          const imgData = milestoneImages[current.year] || milestoneImages['1982'];
          return (
            <div className="hidden lg:block bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm mb-12">
              <div className="grid grid-cols-12 items-stretch">
                {/* Visual */}
                <div className="col-span-5 relative min-h-[340px] flex flex-col justify-end overflow-hidden bg-slate-900">
                  <img
                    src={imgData.url}
                    alt={current.title}
                    className="absolute inset-0 w-full h-full object-cover filter contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="relative z-10 p-6 text-white">
                    <span className="px-2 py-0.5 bg-orange-600 rounded text-[11px] font-bold tracking-wider uppercase">
                      {current.tag}
                    </span>
                    <div className="font-heading font-black text-3xl mt-2 text-white">
                      {current.year}
                    </div>
                    <p className="text-xs text-slate-200 mt-1 line-clamp-2 italic">
                      "{imgData.caption}"
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="col-span-7 p-8 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">
                      {current.subtitle}
                    </div>
                    <h3 className="font-heading font-black text-2xl text-slate-900 mb-3">
                      {current.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {current.description}
                    </p>
                    <p className="text-slate-500 text-xs leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                      {current.extendedStory}
                    </p>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-slate-100 mt-4">
                    <span className="text-xs font-semibold text-slate-500">
                      Điểm nhấn: <strong className="text-slate-800">{current.highlight}</strong>
                    </span>
                    <button
                      onClick={() => setSelectedMilestone(current)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700 cursor-pointer"
                    >
                      <span>Xem tư liệu chi tiết</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Mobile View: Vertical list */}
        <div className="lg:hidden space-y-4">
          {TIMELINE_MILESTONES.map((item) => (
            <div
              key={item.year}
              onClick={() => setSelectedMilestone(item)}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs cursor-pointer hover:border-orange-300 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-heading font-black text-xl text-orange-600">
                  {item.year}
                </span>
                <span className="text-[11px] font-bold text-slate-400">
                  {item.tag}
                </span>
              </div>
              <h3 className="font-heading font-bold text-base text-slate-900 mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 line-clamp-2">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* Milestone Modal */}
      {selectedMilestone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedMilestone(null)}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-xs font-bold text-orange-600 uppercase mb-1">
              Mốc son {selectedMilestone.year}
            </div>
            <h3 className="font-heading font-black text-2xl text-slate-900 mb-3">
              {selectedMilestone.title}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              {selectedMilestone.description}
            </p>
            <p className="text-slate-500 text-xs leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
              {selectedMilestone.extendedStory}
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
              Điểm nhấn: <strong className="text-slate-800">{selectedMilestone.highlight}</strong>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
