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
  CheckCircle2,
} from 'lucide-react';
import { ATHLETE_BENEFITS } from '../data/mockData';

export const AthleteBenefits: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'bib':
        return <Tag className="w-5 h-5 text-[#F26522]" />;
      case 'shirt':
        return <Shirt className="w-5 h-5 text-[#005EB8]" />;
      case 'medal':
        return <Award className="w-5 h-5 text-[#F26522]" />;
      case 'shield':
        return <Shield className="w-5 h-5 text-[#005EB8]" />;
      case 'droplet':
        return <Droplets className="w-5 h-5 text-[#005EB8]" />;
      case 'package':
        return <Package className="w-5 h-5 text-[#F26522]" />;
      case 'camera':
        return <Camera className="w-5 h-5 text-[#005EB8]" />;
      case 'award':
        return <FileCheck className="w-5 h-5 text-[#005EB8]" />;
      case 'gift':
        return <Gift className="w-5 h-5 text-[#F26522]" />;
      default:
        return <Award className="w-5 h-5 text-[#F26522]" />;
    }
  };

  return (
    <section id="benefits" className="py-24 sm:py-32 bg-white text-[#18233A] relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-heading font-bold uppercase tracking-widest text-[#F26522] mb-3 block">
            VẬT PHẨM & ĐẶC QUYỀN
          </span>
          <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-[#18233A] leading-tight">
            Trọn bộ Race Kit vận động viên
          </h2>
          <p className="mt-4 text-[#526077] text-base sm:text-lg leading-relaxed">
            Mỗi vận động viên đều được trang bị trọn gói vật phẩm thi đấu độc quyền Biti's 45 năm và sự chăm sóc y tế, tiếp sức chuyên nghiệp trên từng km.
          </p>
        </div>

        {/* 9 Athlete Perks Cards Grid (Restrained, elegant editorial styling) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ATHLETE_BENEFITS.map((item, index) => (
            <div
              key={index}
              className="p-7 rounded-2xl bg-[#FAF7F1] border border-[#EEE5D7] hover:border-[#F26522]/40 hover:bg-white transition-all duration-300 flex items-start gap-4 shadow-[0_2px_10px_rgba(24,35,58,0.02)]"
            >
              <div className="p-3 rounded-xl bg-white border border-[#EEE5D7] shrink-0 shadow-xs">
                {getIcon(item.icon)}
              </div>
              <div>
                <h3 className="font-heading font-bold text-base sm:text-lg text-[#18233A]">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#526077] mt-1.5 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Highlight Finisher Medal & Exclusive Race Shirt Box (Deep ink contrast) */}
        <div className="mt-12 p-8 sm:p-12 rounded-[24px] bg-[#18233A] text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-block text-[11px] font-mono font-bold tracking-widest uppercase text-[#F26522] bg-white/10 px-3 py-1 rounded-md">
              KỶ NIỆM 45 NĂM ĐỘC QUYỀN
            </span>
            <h4 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
              Huy Chương Đúc Nổi & Áo Chạy Air-Breeze
            </h4>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Mặt trước huy chương khắc họa hình tượng đế giày uốn lượn vượt thời gian từ 1982. Áo chạy thể thao công nghệ dệt siêu thoáng khí hỗ trợ vận động viên bứt phá thành tích cao nhất.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
            <div className="px-5 py-3 rounded-xl bg-white/10 border border-white/15 text-xs font-mono font-bold text-white text-center">
              Dệt tản nhiệt Air-Breeze
            </div>
            <div className="px-5 py-3 rounded-xl bg-[#F26522] text-xs font-heading font-bold uppercase tracking-wider text-white text-center shadow-md">
              Huy chương đúc 3D
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
