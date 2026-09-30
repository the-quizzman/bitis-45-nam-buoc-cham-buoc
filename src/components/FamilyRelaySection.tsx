import React from 'react';
import { Users, Heart, ArrowRight, Sparkles, CheckCircle2, Flame } from 'lucide-react';

interface FamilyRelaySectionProps {
  onRegisterFamily: () => void;
}

export const FamilyRelaySection: React.FC<FamilyRelaySectionProps> = ({ onRegisterFamily }) => {
  const members = [
    {
      leg: 'CHẶNG 1',
      title: 'Thành Viên 1',
      role: 'Thế Hệ Ông / Bà',
      desc: 'Mở màn chặng đầu tiên với những bước chân vững chãi đầy kinh nghiệm và sự ung dung, mở ra chặng đường tiếp sức.',
      tag: 'Khởi đầu vững chắc',
      badgeColor: 'bg-amber-400 text-amber-950',
      borderColor: 'border-amber-300 hover:border-amber-500',
      accentColor: 'text-amber-700',
    },
    {
      leg: 'CHẶNG 2',
      title: 'Thành Viên 2',
      role: 'Thế Hệ Cha / Mẹ (Đội Trưởng)',
      desc: 'Tiếp nhận gậy chạy, giữ nhịp tốc độ bền bỉ và bản lĩnh chở che, truyền ngọn lửa nhiệt huyết cho thế hệ sau.',
      tag: 'Trụ cột nhịp nhàng',
      badgeColor: 'bg-orange-500 text-white',
      borderColor: 'border-orange-300 hover:border-orange-500',
      accentColor: 'text-orange-700',
    },
    {
      leg: 'CHẶNG 3 & ĐÍCH',
      title: 'Thành Viên 3',
      role: 'Thế Hệ Con / Cháu',
      desc: 'Chặng nước rút bứt tốc đầy năng lượng trẻ trung. Cả ba thế hệ cùng nắm tay nhau băng qua vạch đích rạng rỡ.',
      tag: 'Chạm đích tự hào',
      badgeColor: 'bg-emerald-500 text-white',
      borderColor: 'border-emerald-300 hover:border-emerald-500',
      accentColor: 'text-emerald-700',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-amber-50/70 via-orange-50/40 to-sky-50/50 text-slate-900 relative overflow-hidden">
      {/* Dynamic Background Glows matching KV */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-amber-300/30 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-orange-400/20 rounded-full blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Concept Top Badge */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-black uppercase tracking-widest mb-4 shadow-md shadow-orange-500/20">
            <Heart className="w-3.5 h-3.5 text-amber-200" />
            HẠNG MỤC LINH HỒN CỦA GIẢI CHẠY 45 NĂM
          </div>

          <h2 className="text-balance font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-slate-900 uppercase tracking-tight leading-tight">
            BƯỚC CỦA MỘT NGƯỜI – <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500">
              HÀNH TRÌNH CỦA CẢ GIA ĐÌNH 3 THẾ HỆ
            </span>
          </h2>

          <div className="w-24 h-1.5 bg-gradient-to-r from-amber-400 via-orange-500 to-emerald-500 mx-auto mt-4 rounded-full" />

          <p className="mt-6 text-slate-700 text-base sm:text-xl font-normal leading-relaxed max-w-3xl mx-auto text-balance bg-white/60 p-4 rounded-2xl border border-orange-100 shadow-xs">
            Gia đình tham gia theo hình thức <strong>chạy tiếp sức 3 thế hệ (Family Relay)</strong>: Ông bà – Cha mẹ – Con cháu. Mỗi thế hệ đóng góp một chặng đường để cùng nhau hoàn thành đường đua, lưu giữ khoảnh khắc thiêng liêng và niềm tự hào truyền đời cùng Biti’s.
          </p>
        </div>

        {/* Relay baton visual flow - 3 members */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {members.map((member, idx) => (
              <div
                key={member.leg}
                className={`relative p-8 rounded-3xl bg-white border-2 ${member.borderColor} transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between group`}
              >
                {/* Arrow connector between cards on desktop */}
                {idx < 2 && (
                  <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white items-center justify-center shadow-md">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-heading font-black tracking-widest px-3 py-1 rounded-full uppercase ${member.badgeColor} shadow-xs`}>
                      {member.leg}
                    </span>
                    <span className="text-xs font-mono font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                      THẾ HỆ #{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-heading font-black text-2xl text-slate-900 mt-1">
                    {member.title}
                  </h3>
                  <div className={`text-sm font-bold ${member.accentColor} mb-3`}>
                    Đại diện: {member.role}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {member.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-500">
                    {member.tag}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
              </div>
            ))}
          </div>

          {/* Về Đích Final Banner */}
          <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white shadow-lg flex items-center justify-center gap-3 text-center">
            <Flame className="w-5 h-5 text-amber-200" />
            <span className="font-heading font-black text-base sm:text-lg uppercase tracking-wider text-balance">
              VỀ ĐÍCH: BA THẾ HỆ CÙNG NẮM TAY CHẠM CỔNG CHUNG CUỘC & NHẬN BỘ HUY CHƯƠNG HOÀN THÀNH KỶ NIỆM 45 NĂM!
            </span>
            <Flame className="w-5 h-5 text-amber-200" />
          </div>
        </div>

        {/* Benefits & Family Highlight Box */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center bg-white rounded-3xl p-8 border-2 border-orange-200 shadow-xl">
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-heading font-black text-2xl text-slate-900 text-balance">
              Đặc quyền riêng cho Đội Gia Đình 3 Thế Hệ:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>3 Áo sự kiện với màu sắc phân định theo từng thế hệ</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>Mỗi thành viên đều nhận Huy chương hoàn thành chính thức 45 năm Biti's</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>Khung ảnh gia đình kỷ niệm in trực tiếp tại vạch đích</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>Cơ hội nhận giải thưởng đặc biệt: "Gia Đình 3 Thế Hệ Đẹp Nhất"</span>
              </div>
            </div>
            <div className="text-xs text-slate-500 italic">
              * Biểu phí gói gia đình sẽ được Ban Tổ chức công bố chính thức cùng đợt mở bán.
            </div>
          </div>

          {/* Big CTA Button */}
          <div className="flex flex-col items-center justify-center p-4">
            <button
              onClick={onRegisterFamily}
              className="w-full group py-5 px-8 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-heading font-black text-sm sm:text-base tracking-wider uppercase rounded-2xl shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <Users className="w-5 h-5" />
              <span>ĐĂNG KÝ ĐỘI GIA ĐÌNH</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </button>
            <span className="mt-3 text-xs text-slate-600 font-bold">
              3 thành viên • 3 thế hệ: Ông bà, cha mẹ và con cháu
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
