import React, { useState } from 'react';
import { ArrowRight, Clock, Users, Heart, CheckCircle2, ShieldCheck } from 'lucide-react';
import { DistanceType } from '../types';

interface RaceDistancesProps {
  onSelectDistance: (distance: DistanceType) => void;
  onSelectFamily: () => void;
}

export const RaceDistances: React.FC<RaceDistancesProps> = ({
  onSelectDistance,
  onSelectFamily,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'solo' | 'family'>('all');

  const distances = [
    {
      distance: '5KM' as DistanceType,
      subtitle: 'Khởi Bước Đam Mê',
      target: 'Người mới bắt đầu, gia đình và nhóm bạn trẻ',
      startTime: '05:25 AM',
      cutOffTime: '07:30 AM (2h05)',
      description: 'Trải nghiệm không khí giải chạy cộng đồng sôi nổi, mặt đường phẳng bao quanh công viên Sala.',
      benefits: [
        'Áo sự kiện Biti’s 45 năm độc quyền',
        'Số BIB & Chip timing điện tử',
        'Huy chương hoàn thành (Finisher Medal)',
        'Trạm tiếp nước & bảo hiểm đường đua',
      ],
    },
    {
      distance: '10KM' as DistanceType,
      subtitle: 'Bứt Phá Giới Hạn',
      target: 'Người yêu thích tốc độ và muốn thử thách sức bền',
      startTime: '05:10 AM',
      cutOffTime: '08:00 AM (2h50)',
      description: 'Chinh phục cung đường ven sông Sài Gòn đón bình minh, nâng cao thành tích cá nhân.',
      benefits: [
        'Áo sự kiện Biti’s 45 năm cao cấp',
        'Số BIB & Chip timing điện tử',
        'Huy chương đúc nổi kỷ niệm 45 năm',
        'Tiếp nước Pocari & gel năng lượng',
      ],
    },
    {
      distance: '21KM' as DistanceType,
      subtitle: 'Hành Trình Tự Hào (Half Marathon)',
      target: 'Chân chạy đường dài, rèn luyện ý chí bền bỉ',
      startTime: '04:30 AM',
      cutOffTime: '08:00 AM (3h30)',
      description: 'Cung đường 2 vòng Sala kiểm chứng ý chí kiên định và phong độ đỉnh cao của các runner.',
      benefits: [
        'Áo thi đấu + Áo Finisher 21K độc quyền',
        'Huy chương kỷ niệm 45 năm khắc tên',
        'Đội Pacer dẫn tốc độ chuyên nghiệp',
        'Khu phục hồi cơ bắp & y tế chuyên sâu',
      ],
    },
  ];

  const familyMembers = [
    {
      leg: 'Chặng 1',
      generation: 'Thế Hệ Ông / Bà',
      desc: 'Mở màn chặng đầu tiên với những bước chân vững chãi đầy kinh nghiệm và ung dung.',
    },
    {
      leg: 'Chặng 2',
      generation: 'Thế Hệ Cha / Mẹ',
      desc: 'Tiếp nhận gậy chạy, giữ nhịp tốc độ bền bỉ và truyền ngọn lửa cho thế hệ sau.',
    },
    {
      leg: 'Chặng 3 & Đích',
      generation: 'Thế Hệ Con / Cháu',
      desc: 'Chặng nước rút bứt tốc. Cả ba thế hệ cùng nắm tay nhau băng qua vạch đích rạng rỡ.',
    },
  ];

  return (
    <section id="distances" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-heading font-black tracking-widest text-orange-600 uppercase mb-2 inline-block">
            CỰ LY & THỂ THỨC THI ĐẤU
          </span>

          <h2 className="font-heading font-black text-3xl sm:text-5xl text-slate-900 uppercase tracking-tight">
            CHỌN BƯỚC CHẠY CỦA BẠN
          </h2>

          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Tùy chọn đăng ký <strong>Cá nhân</strong> (5KM, 10KM, 21KM) hoặc <strong>Tiếp sức Gia đình 3 thế hệ</strong> (Family Relay).
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                filterType === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tất cả cự ly
            </button>
            <button
              onClick={() => setFilterType('solo')}
              className={`px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                filterType === 'solo'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cá nhân (5K • 10K • 21K)
            </button>
            <button
              onClick={() => setFilterType('family')}
              className={`px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                filterType === 'family'
                  ? 'bg-orange-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Gia đình 3 thế hệ
            </button>
          </div>
        </div>

        {/* 1. SOLO DISTANCES (5K, 10K, 21K) */}
        {(filterType === 'all' || filterType === 'solo') && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-12">
            {distances.map((item) => (
              <div
                key={item.distance}
                className="group relative rounded-2xl bg-white border border-slate-200 hover:border-orange-400 p-7 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Distance header */}
                  <div className="flex items-baseline justify-between mb-2">
                    <div className="font-heading font-black text-5xl text-slate-900 tracking-tight group-hover:text-orange-600 transition-colors">
                      {item.distance}
                    </div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                      {item.startTime}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-slate-800 mb-1">
                    {item.subtitle}
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">
                    {item.target}
                  </p>

                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700 mb-5">
                    <Clock className="w-4 h-4 text-orange-500 shrink-0" />
                    <span>Thời gian đóng đường (COT): <strong>{item.cutOffTime}</strong></span>
                  </div>

                  <p className="text-xs text-slate-600 mb-5 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="space-y-2 border-t border-slate-100 pt-4 mb-6">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Quyền lợi cự ly
                    </div>
                    {item.benefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onSelectDistance(item.distance)}
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-orange-600 text-white font-heading font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Đăng ký {item.distance}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* 2. FAMILY RELAY (TIẾP SỨC 3 THẾ HỆ) */}
        {(filterType === 'all' || filterType === 'family') && (
          <div className="rounded-2xl bg-gradient-to-br from-amber-50/70 via-orange-50/40 to-white border-2 border-orange-200 p-8 sm:p-10 shadow-sm mb-12">
            <div className="max-w-3xl mb-8">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 uppercase tracking-wide mb-2">
                <Heart className="w-4 h-4 text-orange-500 fill-orange-500" />
                <span>Hạng mục tâm điểm kỷ niệm 45 năm</span>
              </div>
              <h3 className="font-heading font-black text-2xl sm:text-4xl text-slate-900 uppercase tracking-tight">
                TIẾP SỨC GIA ĐÌNH 3 THẾ HỆ (FAMILY RELAY)
              </h3>
              <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
                Ông bà – Cha mẹ – Con cháu cùng nhau trao gậy tiếp sức trên đường chạy Sala. Mỗi thế hệ góp một chặng đường để cùng nhau nắm tay qua vạch đích, lưu giữ khoảnh khắc kết nối thiêng liêng.
              </p>
            </div>

            {/* 3 Legs flow */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {familyMembers.map((member) => (
                <div
                  key={member.leg}
                  className="p-5 rounded-xl bg-white border border-orange-100 shadow-2xs"
                >
                  <div className="text-xs font-mono font-bold text-orange-600 mb-1">
                    {member.leg}
                  </div>
                  <div className="font-heading font-black text-base text-slate-900 mb-2">
                    {member.generation}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {member.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-orange-200/60">
              <div className="text-xs text-slate-600 flex items-center gap-2">
                <Users className="w-4 h-4 text-orange-500" />
                <span>Mỗi đội gồm 3 thành viên đại diện 3 thế hệ trong gia đình.</span>
              </div>

              <button
                onClick={onSelectFamily}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-heading font-black text-xs uppercase tracking-wider shadow-md shadow-orange-500/20 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>ĐĂNG KÝ GÓI GIA ĐÌNH 3 THẾ HỆ</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* 3. RULES & ELIGIBILITY SUMMARY */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-slate-600">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <span className="font-bold text-slate-900 block text-sm">Điều kiện tham gia đơn giản & an toàn</span>
              <span>Đủ điều kiện sức khỏe thể thao, tuân thủ điều lệ giải của Ban Tổ chức. Mọi cự ly đều được trang bị trọn bộ Race Kit và bảo hiểm sự kiện.</span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="font-semibold text-slate-500">Hỗ trợ đăng ký:</span>
            <span className="font-mono font-bold text-slate-800">buocchambuoc.45years@bitis.vn</span>
          </div>
        </div>

      </div>
    </section>
  );
};
