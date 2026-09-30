import React from 'react';
import { ArrowRight, Shield } from 'lucide-react';
import { DistanceType } from '../types';

interface RaceDistancesProps {
  onSelectDistance: (distance: DistanceType) => void;
  onSelectFamily: () => void;
}

export const RaceDistances: React.FC<RaceDistancesProps> = ({
  onSelectDistance,
  onSelectFamily,
}) => {
  const raceCards = [
    {
      id: '5KM' as DistanceType,
      distance: '5KM',
      badge: 'CÁ NHÂN',
      title: 'Khởi Bước Đam Mê',
      level: 'Người mới bắt đầu & Nhóm bạn',
      desc: 'Cung đường bằng phẳng quanh công viên Sala rợp bóng cây xanh, lý tưởng để làm quen với nhịp chạy và tận hưởng không khí lễ hội.',
      start: '05:25 AM',
      cutoff: '2h05 (07:30 AM)',
      accentColor: 'border-[#005EB8]/30 hover:border-[#005EB8]',
      badgeColor: 'bg-[#F3F7FA] text-[#005EB8]',
      isFamily: false,
    },
    {
      id: '10KM' as DistanceType,
      distance: '10KM',
      badge: 'CÁ NHÂN',
      title: 'Bứt Phá Giới Hạn',
      level: 'Runner phong trào & Tốc độ',
      desc: 'Sải bước ven sông Sài Gòn đón ánh bình minh thành phố, cung đường chuẩn xác để thiết lập kỷ lục cá nhân (PB) và rèn luyện thể lực.',
      start: '05:10 AM',
      cutoff: '2h50 (08:00 AM)',
      accentColor: 'border-amber-400/50 hover:border-amber-500',
      badgeColor: 'bg-amber-50 text-amber-800',
      isFamily: false,
    },
    {
      id: '21KM' as DistanceType,
      distance: '21KM',
      badge: 'HALF MARATHON',
      title: 'Hành Trình Tự Hào',
      level: 'Chân chạy bền bỉ & Bán marathon',
      desc: 'Chinh phục 21km qua những đại lộ đẹp nhất Thủ Thiêm. Thử thách ý chí kiên định và phong độ đỉnh cao của mỗi chân chạy đường dài.',
      start: '04:30 AM',
      cutoff: '3h30 (08:00 AM)',
      accentColor: 'border-[#18233A]/30 hover:border-[#18233A]',
      badgeColor: 'bg-[#18233A]/5 text-[#18233A]',
      isFamily: false,
    },
    {
      id: 'family',
      distance: 'TIẾP SỨC',
      badge: '3 THẾ HỆ',
      title: 'Gắn Kết Gia Đình',
      level: 'Ông/Bà · Cha/Mẹ · Con/Cháu',
      desc: 'Mỗi thế hệ chạy một chặng và cùng nắm tay nhau băng qua vạch đích rạng rỡ. Biểu tượng truyền cảm hứng tiếp nối 45 năm di sản Việt.',
      start: '05:40 AM',
      cutoff: '2h15 (07:55 AM)',
      accentColor: 'border-[#F26522] hover:border-[#D95314] bg-[#FFF8F3]',
      badgeColor: 'bg-[#F26522] text-white',
      isFamily: true,
    },
  ];

  return (
    <section
      id="distances"
      className="relative min-h-[calc(100vh-76px)] lg:h-[calc(100vh-76px)] lg:max-h-[calc(100vh-76px)] py-6 lg:py-0 flex flex-col justify-center bg-[#FAF7F1] text-[#18233A] overflow-hidden"
    >
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-2.5 lg:mb-3.5">
          <span className="text-[11px] font-heading font-bold uppercase tracking-widest text-[#F26522] mb-1 block">
            CỰ LY THI ĐẤU
          </span>
          <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-[#18233A] leading-tight">
            Chọn bước chạy của bạn
          </h2>
          <p className="mt-0.5 text-[#526077] text-xs sm:text-sm leading-relaxed line-clamp-1">
            Từ trải nghiệm 5KM năng động, thử thách tốc độ 10KM, hành trình bền bỉ 21KM đến chặng tiếp sức gia đình 3 thế hệ độc bản.
          </p>
        </div>

        {/* 4 Large Editorial Tiles in 1 Single Horizontal Row on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-3.5 items-stretch">
          {raceCards.map((tile) => (
            <div
              key={tile.id}
              className={`rounded-xl p-3.5 sm:p-4 flex flex-col justify-between border transition-all duration-300 shadow-[0_2px_8px_rgba(24,35,58,0.03)] hover:shadow-md ${
                tile.isFamily
                  ? 'bg-white border-[#F26522]/50 relative overflow-hidden'
                  : 'bg-white border-[#EEE5D7] hover:border-[#18233A]/40'
              }`}
            >
              {/* Tile Top */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[9px] font-heading font-bold uppercase tracking-wider px-2 py-0.5 rounded ${tile.badgeColor}`}>
                    {tile.badge}
                  </span>
                  <span className="text-[10px] font-mono font-semibold text-[#8C9BAE]">
                    SALA 2027
                  </span>
                </div>

                <h3 className="font-heading font-black text-2xl lg:text-3xl text-[#18233A] tracking-tighter leading-none mb-1">
                  {tile.distance}
                </h3>

                <h4 className="font-heading font-bold text-xs sm:text-sm text-[#18233A] mb-0.5">
                  {tile.title}
                </h4>

                <div className="text-[10px] sm:text-[11px] font-semibold text-[#005EB8] mb-1.5">
                  {tile.level}
                </div>

                <p className="text-[11px] text-[#526077] leading-relaxed mb-2.5 line-clamp-2">
                  {tile.desc}
                </p>
              </div>

              {/* Tile Bottom Specs & CTA */}
              <div className="pt-2.5 border-t border-[#EEE5D7]">
                <div className="flex items-center justify-between text-xs text-[#526077] mb-2">
                  <div>
                    <span className="block text-[8px] sm:text-[9px] uppercase font-bold text-[#8C9BAE]">Xuất phát</span>
                    <span className="font-mono font-bold text-[#18233A] text-[11px] sm:text-xs">{tile.start}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[8px] sm:text-[9px] uppercase font-bold text-[#8C9BAE]">Giới hạn</span>
                    <span className="font-mono font-bold text-[#18233A] text-[11px] sm:text-xs">{tile.cutoff}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (tile.isFamily) {
                      onSelectFamily();
                    } else {
                      onSelectDistance(tile.id as DistanceType);
                    }
                  }}
                  className={`w-full py-1.5 sm:py-2 px-3 rounded-lg font-heading font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    tile.isFamily
                      ? 'bg-[#F26522] hover:bg-[#D95314] text-white shadow-xs'
                      : 'bg-[#18233A] hover:bg-[#253658] text-white'
                  }`}
                >
                  <span>Đăng ký {tile.distance}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Supporting Note */}
        <div className="mt-2.5 lg:mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-2 sm:p-2.5 rounded-xl bg-white border border-[#EEE5D7] text-[11px] text-[#526077]">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-[#005EB8] shrink-0" />
            <span>Mỗi suất đăng ký bao gồm trọn bộ Race Kit độc quyền Biti's, Chip timing điện tử và bảo hiểm thi đấu.</span>
          </div>
          <span className="font-mono font-bold text-[#F26522] shrink-0 text-xs">
            Hạn chót: 20.02.2027
          </span>
        </div>

      </div>
    </section>
  );
};
