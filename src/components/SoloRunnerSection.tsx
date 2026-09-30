import React from 'react';
import { UserCheck, Compass, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface SoloRunnerSectionProps {
  onRegisterClick: () => void;
}

export const SoloRunnerSection: React.FC<SoloRunnerSectionProps> = ({ onRegisterClick }) => {
  return (
    <section className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-stone-50 border border-stone-200 p-8 sm:p-12 relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-800 text-xs font-black uppercase tracking-wider shadow-xs">
                <UserCheck className="w-3.5 h-3.5 text-orange-600" />
                VẬN ĐỘNG VIÊN TỰ DO & CỘNG ĐỒNG
              </div>

              <h3 className="text-balance font-heading font-black text-2xl sm:text-4xl text-slate-900 uppercase tracking-tight leading-tight">
                MỘT BƯỚC CỦA RIÊNG MÌNH, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500">MỘT PHẦN CỦA HÀNH TRÌNH CHUNG</span>
              </h3>

              <p className="text-slate-600 text-base leading-relaxed">
                Dành cho tất cả những cá nhân yêu thích thể thao, muốn thử thách giới hạn của bản thân 
                hoặc đơn giản là muốn hòa mình vào ngày hội lớn 45 năm của Biti’s. Dù bạn chạy một mình, 
                trên từng mét đường bạn luôn có hàng ngàn người bạn đồng hành cổ vũ.
              </p>

              {/* 4 Feature Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-orange-100 shadow-xs">
                  <div className="font-heading font-bold text-sm text-slate-900 mb-1 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Điều kiện tham gia
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Đủ sức khỏe chạy bộ, cam kết tuân thủ điều lệ giải và quy định an toàn của Ban Tổ chức.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-orange-100 shadow-xs">
                  <div className="font-heading font-bold text-sm text-slate-900 mb-1 flex items-center gap-2">
                    <Compass className="w-4 h-4 text-orange-500" />
                    Cự ly lựa chọn
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Tùy chọn linh hoạt 5KM (trải nghiệm), 10KM (tốc độ) hoặc 21KM (chinh phục bền bỉ).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-orange-100 shadow-xs">
                  <div className="font-heading font-bold text-sm text-slate-900 mb-1 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    Quyền lợi đầy đủ
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Trọn bộ Race Kit, áo đấu Biti’s 45 năm, huy chương Finisher, trạm tiếp sức và ảnh race miễn phí.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-orange-100 shadow-xs">
                  <div className="font-heading font-bold text-sm text-slate-900 mb-1 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#005BAC]" />
                    Cách thức đăng ký
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Chỉ 3 phút điền form trực tuyến, nhận ngay mã xác nhận và mã QR điện tử lưu về điện thoại.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Card / CTA */}
            <div className="lg:col-span-5 flex flex-col justify-center items-center p-6 sm:p-8 bg-gradient-to-br from-orange-50 via-white to-amber-50 rounded-3xl border-2 border-orange-200 shadow-xl text-center">
              <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4 shadow-sm">
                <Sparkles className="w-8 h-8" />
              </div>

              <h4 className="font-heading font-black text-xl text-slate-900 mb-2 uppercase">
                Sẵn sàng ghi dấu ấn của bạn?
              </h4>
              <p className="text-xs text-slate-600 mb-6 max-w-xs leading-relaxed">
                Mỗi bước chân hôm nay là một viên gạch kết nối tình yêu thể thao và niềm tự hào di sản Việt Nam.
              </p>

              <button
                onClick={onRegisterClick}
                className="w-full py-4 px-6 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-heading font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-orange-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>ĐĂNG KÝ NGAY</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <span className="text-[11px] text-slate-500 mt-3 font-medium">
                Xác nhận tức thì • Hỗ trợ tra cứu trực tuyến
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
