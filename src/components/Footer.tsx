import React from 'react';
import { Phone, Mail, MapPin, Heart, ShieldCheck, ArrowUp } from 'lucide-react';
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
    <footer className="bg-gradient-to-b from-[#063360] to-[#04203E] text-white pt-16 pb-12 border-t-4 border-orange-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-sky-900/60">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 flex items-center justify-center font-heading font-black text-xl text-white shadow-md shadow-orange-500/30">
                45
              </div>
              <div>
                <span className="font-heading font-black text-xl tracking-tight text-white block leading-none">
                  BITI’S 45 YEARS
                </span>
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest mt-1 block">
                  BƯỚC CHẠM BƯỚC
                </span>
              </div>
            </div>

            <p className="text-sky-100/80 text-xs sm:text-sm leading-relaxed">
              Chiến dịch & Giải chạy Kỷ niệm 45 năm thành lập Biti's (1982 – 2027).
              Thông điệp truyền cảm hứng kết nối thế hệ: <em>“Ghi dấu hiện tại – Tiếp bước tương lai”</em>.
            </p>

            <div className="text-xs text-sky-200/80 space-y-1.5 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Khu đô thị Sala, TP. Thủ Đức, TP. Hồ Chí Minh</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Hotline: 1900 XXXX (Sẽ công bố khi mở cổng)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Email: buocchambuoc.45years@bitis.vn (Placeholder)</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-amber-300">
              CÁC MỤC CHÍNH
            </h4>
            <ul className="space-y-2 text-xs text-sky-100/70">
              <li>
                <button
                  onClick={() => onNavigate('#heritage')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Di sản 45 năm & Thông điệp
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('#distances')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Cự ly thi đấu & Tiếp sức 3 thế hệ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('#route-schedule')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Cung đường Sala & Lịch trình Expo
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('#benefits')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Quyền lợi VĐV & Bộ Race Kit
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('#news-gallery')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Tin tức & Thư viện ảnh runner
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('#faq-sponsors')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Hỏi đáp (FAQ) & Đối tác đồng hành
                </button>
              </li>
            </ul>
          </div>

          {/* Registration & Services */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-amber-300">
              DỊCH VỤ VẬN ĐỘNG VIÊN
            </h4>
            <ul className="space-y-2 text-xs text-sky-100/70">
              <li>
                <button
                  onClick={onOpenRegister}
                  className="hover:text-white font-bold text-amber-300 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>→ Đăng ký tham gia ngay</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenLookup}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Tra cứu thông tin đăng ký (BIB & QR)
                </button>
              </li>
              <li>
                <span className="text-sky-300/50">
                  Điều lệ giải chạy (Sẽ cập nhật)
                </span>
              </li>
              <li>
                <span className="text-sky-300/50">
                  Chính sách bảo mật thông tin runner
                </span>
              </li>
              <li>
                <span className="text-sky-300/50">
                  Cam kết miễn trừ trách nhiệm y tế
                </span>
              </li>
            </ul>

            <div className="pt-3">
              <span className="text-[11px] font-bold text-sky-100/90 block mb-2">
                KÊNH TRUYỀN THÔNG:
              </span>
              <div className="flex items-center gap-2 text-xs">
                {['Facebook', 'Instagram', 'TikTok', 'YouTube'].map((social) => (
                  <span
                    key={social}
                    className="px-2.5 py-1 rounded-lg bg-sky-950/80 border border-sky-800 text-sky-200 text-[10px] font-semibold"
                  >
                    {social}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Academic / Proposal Disclaimer */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-sky-200/80">
              THÔNG TIN DỰ ÁN
            </h4>
            <div className="p-3.5 rounded-2xl bg-sky-950/80 border border-sky-800 text-[11px] text-sky-100/80 leading-relaxed shadow-inner">
              <ShieldCheck className="w-4 h-4 text-emerald-400 mb-1" />
              Website prototype cho đề án Giải chạy Kỷ niệm 45 năm Biti's. Các dữ liệu về biểu phí, lịch trình và nhà tài trợ phục vụ mục đích minh họa tương tác.
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sky-200/60">
          <div>
            © 2026 – 2027 Biti's Vietnam. Bản quyền thuộc về thương hiệu Biti’s.
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-sky-100/80">
              BƯỚC CHẠM BƯỚC – Ghi dấu hiện tại, Tiếp bước tương lai
            </span>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-sky-950/80 hover:bg-sky-900 border border-sky-800 text-sky-200 hover:text-white transition-colors cursor-pointer"
              title="Lên đầu trang"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
