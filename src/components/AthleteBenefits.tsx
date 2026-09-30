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
        return <Tag className="w-6 h-6 text-orange-500" />;
      case 'shirt':
        return <Shirt className="w-6 h-6 text-amber-500" />;
      case 'medal':
        return <Award className="w-6 h-6 text-orange-600" />;
      case 'shield':
        return <Shield className="w-6 h-6 text-emerald-600" />;
      case 'droplet':
        return <Droplets className="w-6 h-6 text-sky-500" />;
      case 'package':
        return <Package className="w-6 h-6 text-purple-600" />;
      case 'camera':
        return <Camera className="w-6 h-6 text-rose-500" />;
      case 'award':
        return <FileCheck className="w-6 h-6 text-indigo-600" />;
      case 'gift':
        return <Gift className="w-6 h-6 text-amber-600" />;
      default:
        return <Sparkles className="w-6 h-6 text-orange-500" />;
    }
  };

  return (
    <section id="benefits" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-heading font-black tracking-widest text-orange-600 uppercase mb-2 inline-block">
            VẬT PHẨM & QUYỀN LỢI
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-slate-900 uppercase tracking-tight">
            TRỌN BỘ RACE KIT VẬN ĐỘNG VIÊN
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Mỗi vận động viên đều được trang bị đầy đủ vật phẩm thi đấu độc quyền và sự chăm sóc y tế, tiếp sức toàn diện.
          </p>
        </div>

        {/* 9 Athlete Perks Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ATHLETE_BENEFITS.map((item, index) => (
            <div
              key={index}
              className="group p-6 rounded-3xl bg-slate-50 border border-orange-100 hover:border-orange-400 hover:bg-white hover:shadow-xl transition-all duration-300 flex items-start gap-4"
            >
              <div className="p-3.5 rounded-2xl bg-white group-hover:bg-orange-50 border border-orange-200/60 group-hover:border-orange-300 transition-colors shrink-0 shadow-xs">
                {getIcon(item.icon)}
              </div>
              <div>
                <h3 className="font-heading font-black text-lg text-slate-900 group-hover:text-orange-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Highlight Medal & Shirt Showcase Banner */}
        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white shadow-xl shadow-orange-500/25 border-2 border-amber-300 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-mono font-black text-amber-200 uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-md">
              PHIÊN BẢN GIỚI HẠN 45 NĂM
            </span>
            <h4 className="font-heading font-black text-xl sm:text-2xl text-white">
              Huy Chương Finisher & Áo Chạy Độc Bản
            </h4>
            <p className="text-xs sm:text-sm text-amber-50 max-w-xl">
              Được thiết kế tinh xảo từ hình tượng chiếc đế giày uốn lượn vượt thời gian, khắc họa tinh thần bền bỉ của người Việt suốt 45 năm qua.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-xl bg-white/20 text-xs font-bold text-white border border-white/40 backdrop-blur-xs">
              Công nghệ dệt Air-Breeze
            </div>
            <div className="px-4 py-2.5 rounded-xl bg-white text-xs font-black text-orange-600 shadow-md">
              Huy chương đúc nổi 3D sắc nét
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
