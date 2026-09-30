import React from 'react';
import { SectionTab } from '../types';
import { ArrowLeft, ArrowRight, Layers, Sparkles } from 'lucide-react';

interface SectionPaginationBarProps {
  activeTab: SectionTab;
  setActiveTab: (tab: SectionTab) => void;
}

export const TAB_CONFIG: {
  id: SectionTab;
  title: string;
  shortTitle: string;
  icon: string;
  badge: string;
  color: string;
}[] = [
  {
    id: 'heritage',
    title: 'Trang Chủ & Di Sản 45 Năm',
    shortTitle: 'Di Sản & Big Idea',
    icon: '🏛️',
    badge: '1982 – 2027',
    color: 'from-orange-500 via-amber-500 to-orange-600',
  },
  {
    id: 'distances',
    title: 'Cự Ly & Tiếp Sức 3 Thế Hệ',
    shortTitle: 'Cự Ly & Gia Đình',
    icon: '🏃',
    badge: '5K • 10K • 21K • Family',
    color: 'from-amber-500 via-orange-500 to-emerald-500',
  },
  {
    id: 'route',
    title: 'Cung Đường Sala & Lịch Trình',
    shortTitle: 'Cung Đường & Lịch Trình',
    icon: '🗺️',
    badge: 'Chuẩn UEH Sala',
    color: 'from-sky-500 to-blue-600',
  },
  {
    id: 'benefits',
    title: 'Quyền Lợi & Kỷ Vật Vận Động Viên',
    shortTitle: 'Quyền Lợi VĐV',
    icon: '🎖️',
    badge: 'Huy Chương & Áo PR SPORT',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'news',
    title: 'Bản Tin Sự Kiện & Thư Viện Ảnh',
    shortTitle: 'Tin Tức & Gallery',
    icon: '📰',
    badge: 'Khoảnh Khắc Runner',
    color: 'from-orange-500 to-amber-500',
  },
  {
    id: 'sponsors-faq',
    title: 'Nhà Tài Trợ Đối Tác & Hỏi Đáp FAQ',
    shortTitle: 'Đối Tác & FAQ',
    icon: '🤝',
    badge: 'Hỗ Trợ & Đối Tác',
    color: 'from-[#005BAC] to-sky-600',
  },
];

export const SectionPaginationBar: React.FC<SectionPaginationBarProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const currentIndex = TAB_CONFIG.findIndex((t) => t.id === activeTab);

  return (
    <div className="pt-20 pb-4 bg-gradient-to-r from-sky-50/90 via-white to-amber-50/80 border-b border-orange-200/80 shadow-xs text-slate-800 relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Control Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3">
          {/* Breadcrumb & Current page title */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-white text-orange-700 border border-orange-200 shadow-xs">
              {activeTab === 'all'
                ? 'CHẾ ĐỘ XEM LIÊN TỤC'
                : `TRANG ${currentIndex + 1} / ${TAB_CONFIG.length}`}
            </span>
            <h1 className="text-sm sm:text-base font-heading font-black text-slate-900 uppercase tracking-wide">
              {activeTab === 'all'
                ? 'Toàn bộ nội dung sự kiện (All-in-one)'
                : TAB_CONFIG[currentIndex]?.title}
            </h1>
          </div>

          {/* Toggle All vs Paginated */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveTab(activeTab === 'all' ? 'heritage' : 'all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black shadow-md shadow-orange-500/20'
                  : 'bg-white hover:bg-orange-50 text-slate-700 border border-orange-200 shadow-xs'
              }`}
              title="Xem tất cả các mục trên một trang dài"
            >
              <Layers className="w-3.5 h-3.5 text-orange-500" />
              <span>{activeTab === 'all' ? 'Đang xem toàn bộ' : 'Xem toàn bộ một trang'}</span>
            </button>
          </div>
        </div>

        {/* Tab Pagination Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2">
          {TAB_CONFIG.map((t, idx) => {
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTab(t.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 border-orange-500 text-white shadow-md shadow-orange-500/25 ring-2 ring-orange-300'
                    : 'bg-white/90 border-orange-100/80 text-slate-600 hover:bg-orange-50/60 hover:text-orange-600 hover:border-orange-200 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-base">{t.icon}</span>
                  <span
                    className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      isActive ? 'bg-white/20 text-white' : 'bg-orange-100/80 text-orange-700'
                    }`}
                  >
                    P{idx + 1}
                  </span>
                </div>
                <div
                  className={`text-xs font-heading font-bold truncate ${
                    isActive ? 'text-white font-black' : 'text-slate-800'
                  }`}
                >
                  {t.shortTitle}
                </div>
                <div
                  className={`text-[10px] truncate mt-0.5 ${
                    isActive ? 'text-amber-100' : 'text-slate-500'
                  }`}
                >
                  {t.badge}
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export const BottomPageNavigation: React.FC<SectionPaginationBarProps> = ({
  activeTab,
  setActiveTab,
}) => {
  if (activeTab === 'all') return null;

  const currentIndex = TAB_CONFIG.findIndex((t) => t.id === activeTab);
  const prevTab = currentIndex > 0 ? TAB_CONFIG[currentIndex - 1] : null;
  const nextTab = currentIndex < TAB_CONFIG.length - 1 ? TAB_CONFIG[currentIndex + 1] : null;

  const handleNav = (tabId: SectionTab) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="py-12 bg-gradient-to-r from-sky-50/80 via-white to-amber-50/80 border-t border-orange-200/80 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Previous Page Button */}
          {prevTab ? (
            <button
              onClick={() => handleNav(prevTab.id)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-white hover:bg-orange-50 text-slate-700 hover:text-orange-600 border-2 border-orange-200 transition-all cursor-pointer group shadow-sm"
            >
              <ArrowLeft className="w-4 h-4 text-orange-500 group-hover:-translate-x-1 transition-transform" />
              <div className="text-left">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Trang trước (P{currentIndex})</span>
                <span className="font-heading font-bold text-xs uppercase">{prevTab.shortTitle}</span>
              </div>
            </button>
          ) : (
            <div className="hidden sm:block" />
          )}

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {TAB_CONFIG.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => handleNav(t.id)}
                className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                  activeTab === t.id
                    ? 'w-8 bg-gradient-to-r from-orange-500 to-amber-500 shadow-md shadow-orange-500/40'
                    : 'bg-slate-300 hover:bg-slate-400'
                }`}
                title={t.shortTitle}
              />
            ))}
          </div>

          {/* Next Page Button */}
          {nextTab ? (
            <button
              onClick={() => handleNav(nextTab.id)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/25 transition-all cursor-pointer group"
            >
              <div className="text-right">
                <span className="text-[10px] font-mono text-amber-100 block uppercase">Trang tiếp theo (P{currentIndex + 2})</span>
                <span className="font-heading font-black text-xs uppercase">{nextTab.shortTitle}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-200 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <button
              onClick={() => handleNav('heritage')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white font-bold text-xs uppercase shadow-md cursor-pointer"
            >
              <span>VỀ ĐẦU TRANG CHỦ</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
