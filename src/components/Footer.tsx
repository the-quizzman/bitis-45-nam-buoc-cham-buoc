import React from 'react';
import { Mail, MapPin, ArrowUp, ArrowRight, ShieldCheck } from 'lucide-react';
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

          {/* KẾT NỐI & Compact CTA (~2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="font-heading font-bold text-[11px] uppercase tracking-widest text-slate-200">
              KẾT NỐI
            </h4>

            {/* Social channels: SVG icon buttons only, no text */}
            <div className="flex items-center gap-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                title="Facebook"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors flex items-center justify-center cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                title="Instagram"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors flex items-center justify-center cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                title="TikTok"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors flex items-center justify-center cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                title="YouTube"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors flex items-center justify-center cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" clipRule="evenodd" />
                </svg>
              </a>
            </div>

            {/* Compact CTA */}
            <div className="pt-1">
              <button
                onClick={onOpenRegister}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F26522] hover:bg-[#D95314] text-white font-heading font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs active:scale-95 whitespace-nowrap"
              >
                <span>Đăng ký tham gia</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* RIGHT: THÔNG TIN DỰ ÁN (Xác minh đề án như cũ, ~3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-[11px] uppercase tracking-widest text-slate-200">
              THÔNG TIN DỰ ÁN
            </h4>
            <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-[11px] text-slate-300/85 leading-relaxed shadow-inner">
              <div className="flex items-center gap-1.5 font-bold text-emerald-400 mb-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-[10px] uppercase tracking-wider font-heading text-emerald-400">
                  Xác minh đề án
                </span>
              </div>
              <p>
                Website prototype cho đề án Giải chạy Kỷ niệm 45 năm Biti's. Các dữ liệu về biểu phí, lịch trình và nhà tài trợ phục vụ mục đích minh họa tương tác.
              </p>
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
