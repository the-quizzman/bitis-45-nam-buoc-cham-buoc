import React from 'react';
import { Mail, MapPin, ArrowUp, ArrowRight } from 'lucide-react';
import { SectionTab } from '../types';

interface FooterProps {
  onOpenRegister: () => void;
  onOpenLookup: () => void;
  onNavigate: (tabOrHash: string) => void;
  onSelectTab?: (tab: SectionTab) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenRegister,
  onOpenLookup,
  onNavigate,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#18233A] text-white pt-14 pb-8 border-t border-[#EEE5D7]/20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= LAYER 1: MAIN FOOTER (12-COL GRID) ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10">
          
          {/* LEFT: Brand & Essential Contact (~5 cols) */}
          <div className="lg:col-span-5 space-y-3.5">
            {/* Logo & Event Tagline */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#005EB8] flex items-center justify-center font-heading font-black text-sm text-white shadow-xs">
                45
              </div>
              <div>
                <span className="font-heading font-black text-base tracking-tight text-white block leading-none">
                  BITI’S 45 YEARS
                </span>
                <span className="text-[10px] font-bold text-[#F26522] uppercase tracking-widest mt-1 block">
                  BƯỚC CHẠM BƯỚC
                </span>
              </div>
            </div>

            {/* One short sentence only */}
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm">
              Giải chạy kỷ niệm 45 năm Biti’s.
              <br />
              Ghi dấu hiện tại · Tiếp bước tương lai.
            </p>

            {/* Essential Contact Only (No hotline placeholder) */}
            <div className="text-xs text-slate-400 space-y-1.5 pt-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#F26522] shrink-0" />
                <span>KĐT Sala · TP. Thủ Đức · TP.HCM</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#F26522] shrink-0" />
                <span>buocchambuoc.45years@bitis.vn</span>
              </div>
            </div>
          </div>

          {/* CENTER: Compact Navigation (~4 cols, 2 groups) */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-6 sm:gap-8">
            
            {/* Group 1: THÔNG TIN */}
            <div className="space-y-3">
              <h4 className="font-heading font-bold text-[11px] uppercase tracking-widest text-slate-200">
                THÔNG TIN
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <button
                    onClick={() => onNavigate('#heritage')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Di sản 45 năm
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('#distances')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Cự ly thi đấu
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('#route-schedule')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Cung đường
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('#benefits')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Quyền lợi VĐV
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('#news-gallery')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Tin tức
                  </button>
                </li>
              </ul>
            </div>

            {/* Group 2: HỖ TRỢ */}
            <div className="space-y-3">
              <h4 className="font-heading font-bold text-[11px] uppercase tracking-widest text-slate-200">
                HỖ TRỢ
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <button
                    onClick={onOpenRegister}
                    className="hover:text-[#F26522] text-slate-300 transition-colors cursor-pointer text-left font-medium"
                  >
                    Đăng ký tham gia
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenLookup}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Tra cứu BIB
                  </button>
                </li>
                <li>
                  <span className="text-slate-400">
                    Điều lệ giải
                  </span>
                </li>
                <li>
                  <span className="text-slate-400">
                    Chính sách bảo mật
                  </span>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('#faq-sponsors')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    FAQ
                  </button>
                </li>
              </ul>
            </div>

          </div>

          {/* RIGHT: KẾT NỐI & Compact CTA (~3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="font-heading font-bold text-[11px] uppercase tracking-widest text-slate-200">
              KẾT NỐI
            </h4>

            {/* Simple social links */}
            <div className="flex flex-wrap gap-2">
              {['Facebook', 'Instagram', 'TikTok', 'YouTube'].map((channel) => (
                <span
                  key={channel}
                  className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-xs text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                >
                  {channel}
                </span>
              ))}
            </div>

            {/* Compact CTA */}
            <div className="pt-2">
              <button
                onClick={onOpenRegister}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#F26522] hover:bg-[#D95314] text-white font-heading font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <span>Đăng ký tham gia</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* ================= LAYER 2: SUBTLE CAMPAIGN LINE ================= */}
        <div className="py-4 border-t border-b border-white/10 text-center">
          <p className="text-xs sm:text-sm text-slate-400/80 font-serif italic tracking-wide">
            “45 năm Biti’s · Từ những bước chân đầu tiên đến những bước chân tiếp nối.”
          </p>
        </div>

        {/* ================= LAYER 3: SLIM BOTTOM BAR ================= */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026–2027 Biti’s Vietnam.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 transition-colors cursor-pointer">
              Điều khoản
            </span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">
              Quyền riêng tư
            </span>
          </div>

          <div>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Lên đầu trang"
              aria-label="Lên đầu trang"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
