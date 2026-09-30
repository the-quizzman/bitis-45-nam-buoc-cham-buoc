import React from 'react';
import { Calendar, MapPin, Sparkles, ArrowRight, Users, ChevronRight } from 'lucide-react';

interface HeroProps {
  onRegisterClick: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRegisterClick, onExploreClick }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] pt-28 pb-16 flex items-center overflow-hidden bg-gradient-to-b from-[#E0F2FE]/80 via-[#FFFBEB]/40 to-[#F8FAFC] text-slate-900"
    >
      {/* Dynamic Sunlit Sky & Energy Ribbon Ambient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Morning Sun Glow Flare */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-amber-300/35 rounded-full blur-[140px]" />
        <div className="absolute top-1/4 -right-28 w-[550px] h-[550px] bg-orange-400/20 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 left-1/3 w-[700px] h-72 bg-emerald-400/15 rounded-full blur-[140px]" />

        {/* Dynamic Curved Vector Energy Ribbons */}
        <svg
          className="absolute inset-0 w-full h-full opacity-45"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M -100 700 C 300 850 700 600 1200 800 C 1350 850 1550 750 1600 700"
            stroke="#22C55E"
            strokeWidth="28"
            strokeLinecap="round"
            strokeOpacity="0.35"
          />
          <path
            d="M -100 620 C 320 720 680 520 1150 700 C 1320 760 1520 660 1600 620"
            stroke="#FBBF24"
            strokeWidth="40"
            strokeLinecap="round"
            strokeOpacity="0.45"
          />
          <path
            d="M -80 540 C 350 630 650 440 1100 620 C 1300 700 1500 580 1600 540"
            stroke="#FF6B00"
            strokeWidth="36"
            strokeLinecap="round"
            strokeOpacity="0.4"
          />
        </svg>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F8FAFC] to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Core Hero Typography & CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Single Elegant Brand Badge */}
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-white/95 border border-orange-200/80 text-[#005BAC] text-xs font-bold tracking-wide shadow-xs">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span>KỶ NIỆM 45 NĂM BITI'S (1982 – 2027)</span>
            </div>

            {/* Giant Title: BƯỚC chạm BƯỚC */}
            <div>
              <div className="text-xs sm:text-sm font-bold tracking-widest uppercase text-slate-500 mb-1">
                GIẢI CHẠY THỂ THAO VÀ DI SẢN GIA ĐÌNH
              </div>

              <h1 className="text-balance font-heading font-black text-5xl sm:text-7xl xl:text-8xl uppercase tracking-tighter leading-[0.92] text-slate-900">
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-orange-600 via-amber-600 to-orange-500">
                  BƯỚC
                </span>{' '}
                <span
                  style={{ fontFamily: 'Montserrat' }}
                  className="text-amber-500 italic text-4xl sm:text-6xl xl:text-7xl mx-1 font-bold inline-block transform -rotate-3"
                >
                  chạm
                </span>{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-orange-600 via-amber-600 to-orange-500">
                  BƯỚC
                </span>
              </h1>

              {/* Tagline */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex h-2.5 w-24 rounded-full overflow-hidden shrink-0">
                  <span className="w-1/4 bg-[#FFE600]" />
                  <span className="w-1/4 bg-[#FF6B00]" />
                  <span className="w-1/4 bg-[#EF4444]" />
                  <span className="w-1/4 bg-[#22C55E]" />
                </div>
                <p className="font-heading text-base sm:text-xl font-bold uppercase text-slate-800 tracking-wide">
                  Ghi dấu hiện tại, tiếp bước tương lai
                </p>
              </div>
            </div>

            {/* Story Hook */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              45 năm – từ những bước chân kiên trì đầu tiên năm 1982 đến triệu bước chân tiếp nối của thế hệ hôm nay. Cùng gia đình, bạn bè sải bước để kết nối yêu thương, chạm vào tự hào và hướng đến tương lai bền vững.
            </p>

            {/* Event Key Info Bar: Date & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/90 border border-slate-200/80 shadow-xs">
                <div className="p-2.5 rounded-xl bg-orange-50 text-orange-600 shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-500 uppercase">Thời gian diễn ra</div>
                  <div className="text-base font-heading font-black text-slate-900">Chủ nhật, 07.03.2027</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/90 border border-slate-200/80 shadow-xs">
                <div className="p-2.5 rounded-xl bg-sky-50 text-[#005BAC] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-500 uppercase">Địa điểm thi đấu</div>
                  <div className="text-base font-heading font-black text-slate-900">KĐT Sala, TP. Thủ Đức, TP.HCM</div>
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={onRegisterClick}
                className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-heading font-extrabold text-sm tracking-wider uppercase rounded-xl shadow-lg shadow-orange-500/25 active:scale-95 transition-all cursor-pointer"
              >
                <span>ĐĂNG KÝ THAM GIA</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white hover:bg-slate-50 text-slate-700 hover:text-orange-600 font-heading font-bold text-sm tracking-wide uppercase rounded-xl border border-slate-200 transition-all cursor-pointer shadow-xs"
              >
                <span>Xem cự ly & sơ đồ</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Streamlined Distances Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600">
              <span className="text-slate-500">Cự ly thi đấu:</span>
              <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 font-bold text-slate-800">5KM</span>
              <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 font-bold text-slate-800">10KM</span>
              <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 font-bold text-slate-800">21KM</span>
              <span className="px-2.5 py-1 rounded-md bg-orange-50 border border-orange-200 font-bold text-orange-700">
                Tiếp sức gia đình 3 thế hệ
              </span>
            </div>

          </div>

          {/* Right Column: Visual Poster Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Soft ambient glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-orange-400/30 via-amber-300/30 to-sky-300/30 rounded-3xl blur-xl opacity-60 pointer-events-none" />

              {/* Main Poster Showcase Frame */}
              <div className="relative rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-xl">
                
                <div className="relative h-[440px] sm:h-[480px] w-full overflow-hidden bg-gradient-to-b from-sky-400 via-sky-200 to-amber-100 flex flex-col justify-between p-6">
                  
                  {/* Sky, Sun & Sala skyline silhouette */}
                  <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
                    <div className="absolute top-6 left-8 w-32 h-10 bg-white/70 rounded-full blur-xs" />
                    <div className="absolute top-12 right-12 w-48 h-14 bg-white/80 rounded-full blur-xs" />
                    <div className="absolute -top-10 -right-10 w-44 h-44 bg-amber-200/90 rounded-full blur-xl" />
                    
                    {/* Ba Son Bridge Silhouette */}
                    <svg
                      className="absolute bottom-24 left-0 right-0 w-full h-32 opacity-30"
                      viewBox="0 0 400 120"
                      preserveAspectRatio="none"
                    >
                      <rect x="240" y="20" width="18" height="90" fill="#0369A1" />
                      <polygon points="249,10 240,20 258,20" fill="#0369A1" />
                      <rect x="225" y="45" width="12" height="65" fill="#0284C7" />
                      <rect x="262" y="50" width="16" height="60" fill="#0284C7" />
                      <polygon points="340,30 336,110 344,110" fill="#64748B" />
                      <line x1="340" y1="35" x2="310" y2="100" stroke="#64748B" strokeWidth="1.5" />
                      <line x1="340" y1="45" x2="295" y2="100" stroke="#64748B" strokeWidth="1.5" />
                      <line x1="340" y1="35" x2="370" y2="100" stroke="#64748B" strokeWidth="1.5" />
                      <line x1="340" y1="45" x2="385" y2="100" stroke="#64748B" strokeWidth="1.5" />
                    </svg>
                  </div>

                  {/* Top Bar inside Poster */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl shadow-xs border border-white/80 flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#005BAC] flex items-center justify-center text-white font-heading font-black text-xs">
                        45
                      </div>
                      <div>
                        <span className="font-heading font-black text-xs text-[#005BAC] block leading-none">
                          BITI'S
                        </span>
                        <span className="text-[8px] font-bold text-orange-600 block mt-0.5 uppercase">
                          BƯỚC CHẠM BƯỚC
                        </span>
                      </div>
                    </div>

                    <div className="bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-mono font-bold px-3 py-1 rounded-lg">
                      07.03.2027
                    </div>
                  </div>

                  {/* Central Visual Graphic inside Poster */}
                  <div className="relative z-10 my-auto text-center py-4">
                    <div className="font-heading font-black text-4xl sm:text-5xl text-white tracking-tighter uppercase filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
                      BƯỚC <span className="text-amber-300 italic">chạm</span> BƯỚC
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 mt-2 bg-white/70 backdrop-blur-xs inline-block px-3.5 py-1 rounded-full border border-white/60">
                      Ghi dấu hiện tại, tiếp bước tương lai
                    </p>
                  </div>

                  {/* Bottom Footer inside Poster */}
                  <div className="relative z-10 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-white/80 shadow-xs flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-700">
                      <Users className="w-4 h-4 text-orange-500" />
                      <span className="font-bold">Gia đình 3 thế hệ & Cá nhân</span>
                    </div>
                    <span className="text-[11px] font-bold text-[#005BAC]">KĐT Sala, TP.HCM</span>
                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
