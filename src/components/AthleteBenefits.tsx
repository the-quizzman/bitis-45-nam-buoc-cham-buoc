import React from 'react';
import {
  Award,
  Shirt,
  Shield,
  Droplets,
  Package,
  Camera,
  FileCheck,
  Gift,
  Tag,
  Sparkles,
} from 'lucide-react';
import { ATHLETE_BENEFITS } from '../data/mockData';

export const AthleteBenefits: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'bib':
        return <Tag className="w-4 h-4 text-[#F26522]" />;
      case 'shirt':
        return <Shirt className="w-4 h-4 text-[#005EB8]" />;
      case 'medal':
        return <Award className="w-4 h-4 text-[#F26522]" />;
      case 'shield':
        return <Shield className="w-4 h-4 text-[#005EB8]" />;
      case 'droplet':
        return <Droplets className="w-4 h-4 text-[#005EB8]" />;
      case 'package':
        return <Package className="w-4 h-4 text-[#F26522]" />;
      case 'camera':
        return <Camera className="w-4 h-4 text-[#005EB8]" />;
      case 'award':
        return <FileCheck className="w-4 h-4 text-[#005EB8]" />;
      case 'gift':
        return <Gift className="w-4 h-4 text-[#F26522]" />;
      default:
        return <Award className="w-4 h-4 text-[#F26522]" />;
    }
  };

  // Select 6 most essential perks for crisp 2x3 grid
  const primaryPerks = ATHLETE_BENEFITS.slice(0, 6);

  return (
    <section
      id="benefits"
      className="relative min-h-[calc(100vh-76px)] lg:h-[calc(100vh-76px)] py-12 lg:py-0 flex flex-col justify-center bg-[#FAF7F1] text-[#18233A] overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-6 lg:mb-8">
          <span className="text-xs font-heading font-bold uppercase tracking-widest text-[#F26522] mb-1.5 block">
            VẬT PHẨM & ĐẶC QUYỀN
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#18233A] leading-tight">
            Trọn bộ Race Kit vận động viên
          </h2>
          <p className="mt-1.5 text-[#526077] text-xs sm:text-sm lg:text-base leading-relaxed">
            Mỗi vận động viên đều được trang bị trọn gói vật phẩm thi đấu độc quyền Biti's 45 năm và sự chăm sóc y tế, tiếp sức chuyên nghiệp.
          </p>
        </div>

        {/* 12-Column Balanced Editorial Layout (Fits 100% in 1 Viewport) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          
          {/* LEFT: Featured Hero Box - Áo & Huy chương (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl bg-[#18233A] text-white p-6 sm:p-7 flex flex-col justify-between shadow-md">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#F26522] bg-white/10 px-2.5 py-1 rounded">
                  PHIÊN BẢN GIỚI HẠN
                </span>
                <span className="text-xs font-mono text-white/60">EST. 1982 - 2027</span>
              </div>

              <h3 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight mb-2.5">
                Huy Chương 3D & Áo Chạy Air-Breeze
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                Huy chương kim loại đúc nổi 3D lấy cảm hứng từ đế giày uốn lượn vượt thời gian. Áo thi đấu công nghệ Air-Breeze thấm hút siêu tốc giúp runner bứt phá phong độ.
              </p>
            </div>

            <div className="pt-4 border-t border-white/15 space-y-2">
              <div className="flex items-center justify-between text-xs py-1">
                <span className="text-slate-300">Công nghệ dệt</span>
                <span className="font-bold text-white">Air-Breeze sợi tái chế</span>
              </div>
              <div className="flex items-center justify-between text-xs py-1">
                <span className="text-slate-300">Chất liệu huy chương</span>
                <span className="font-bold text-[#F26522]">Hợp kim đúc nổi mạ vàng</span>
              </div>
              <div className="flex items-center justify-between text-xs py-1">
                <span className="text-slate-300">Khắc tên Finisher</span>
                <span className="font-bold text-white">Miễn phí tại vạch đích</span>
              </div>
            </div>
          </div>

          {/* RIGHT: 6 Core Perks Grid (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {primaryPerks.map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-white border border-[#EEE5D7] hover:border-[#F26522]/40 transition-all flex items-start gap-3 shadow-[0_2px_8px_rgba(24,35,58,0.02)]"
              >
                <div className="p-2.5 rounded-lg bg-[#FAF7F1] border border-[#EEE5D7] shrink-0">
                  {getIcon(item.icon)}
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xs sm:text-sm text-[#18233A]">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[#526077] mt-1 leading-relaxed line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-5 p-3.5 rounded-xl bg-white border border-[#EEE5D7] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#526077]">
          <span className="text-center sm:text-left">
            VĐV nhận trọn bộ Race Kit tại Expo Sala trong 2 ngày <strong>05 & 06/03/2027</strong>.
          </span>
          <span className="font-heading font-bold text-[#005EB8] shrink-0">
            Cam kết 100% VĐV về đích đúng cut-off nhận Huy chương Finisher
          </span>
        </div>

      </div>
    </section>
  );
};
