import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { FlipCountdown } from './FlipCountdown';

interface HeroProps {
  onRegisterClick: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRegisterClick, onExploreClick }) => {
  // Target: March 7, 2027 04:30:00 (Asia/Ho_Chi_Minh)
  const targetTime = new Date('2027-03-07T04:30:00+07:00').getTime();

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetTime]);

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-76px)] lg:h-[calc(100vh-76px)] lg:max-h-[calc(100vh-76px)] py-6 lg:py-0 flex items-center bg-[#FAF7F1] text-[#18233A] overflow-hidden"
    >
      {/* Subtle Editorial Grid Lines Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="max-w-[1400px] mx-auto h-full px-4 sm:px-6 lg:px-8 grid grid-cols-12 gap-8">
          <div className="col-span-7 border-r border-[#EEE5D7]/80 h-full hidden lg:block" />
          <div className="col-span-5 h-full hidden lg:block" />
        </div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: ~58% (7 cols on 12-col grid) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Small Anniversary Eyebrow */}
            <div className="flex items-center gap-2 mb-1.5 lg:mb-2">
              <span className="w-2 h-2 rounded-full bg-[#F26522]" />
              <span className="text-xs font-heading font-bold uppercase tracking-widest text-[#005EB8]">
                KỶ NIỆM 45 NĂM BITI’S · 1982–2027
              </span>
            </div>

            {/* Large Campaign Headline: BƯỚC CHẠM BƯỚC */}
            <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-[48px] xl:text-[60px] uppercase tracking-tighter leading-[0.92] text-[#18233A]">
              <span className="block">BƯỚC</span>
              <span className="block mt-0.5">
                <span className="text-[#F26522] italic font-serif font-bold lowercase tracking-normal text-[0.88em] mr-2">
                  chạm
                </span>
                <span>BƯỚC</span>
              </span>
            </h1>

            {/* Core Message / Tagline */}
            <div className="mt-1.5 lg:mt-2 flex items-center gap-2.5">
              <div className="h-0.5 w-6 bg-[#F26522]" />
              <p className="font-heading font-bold text-base sm:text-lg lg:text-xl text-[#18233A] tracking-tight">
                Ghi dấu hiện tại, tiếp bước tương lai
              </p>
            </div>

            {/* Short Emotional Narrative (max 2 lines) */}
            <p className="mt-1 text-[#526077] text-xs sm:text-sm leading-relaxed max-w-xl font-normal line-clamp-2">
              45 năm từ những bước chân đầu tiên đến triệu bước chân tiếp nối.
              Một hành trình kết nối gia đình, cộng đồng và những thế hệ Việt Nam.
            </p>

            {/* ONE Compact Event Information Strip */}
            <div className="mt-2.5 pt-2.5 border-t border-[#EEE5D7] grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5">
              {/* Date */}
              <div>
                <span className="block text-[9px] sm:text-[10px] font-heading font-bold uppercase tracking-wider text-[#8C9BAE]">
                  Thời gian
                </span>
                <span className="block font-heading font-black text-xs sm:text-sm lg:text-base text-[#18233A]">
                  07.03.2027
                </span>
                <span className="block text-[10px] text-[#526077]">Chủ nhật · 04:30 AM</span>
              </div>

              {/* Location */}
              <div>
                <span className="block text-[9px] sm:text-[10px] font-heading font-bold uppercase tracking-wider text-[#8C9BAE]">
                  Địa điểm
                </span>
                <span className="block font-heading font-black text-xs sm:text-sm lg:text-base text-[#18233A]">
                  KĐT Sala
                </span>
                <span className="block text-[10px] text-[#526077]">TP. Thủ Đức, TP.HCM</span>
              </div>

              {/* Distances */}
              <div>
                <span className="block text-[9px] sm:text-[10px] font-heading font-bold uppercase tracking-wider text-[#8C9BAE]">
                  Cự ly thi đấu
                </span>
                <span className="block font-heading font-black text-xs sm:text-sm lg:text-base text-[#18233A]">
                  5K · 10K · 21K
                </span>
                <span className="block text-[10px] text-[#526077]">Cung đường chuẩn Sala</span>
              </div>

              {/* Special Category */}
              <div>
                <span className="block text-[9px] sm:text-[10px] font-heading font-bold uppercase tracking-wider text-[#F26522]">
                  Đặc quyền
                </span>
                <span className="block font-heading font-black text-xs sm:text-sm lg:text-base text-[#18233A]">
                  Tiếp sức gia đình
                </span>
                <span className="block text-[10px] text-[#526077]">Đội hình 3 thế hệ</span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="mt-3 lg:mt-3.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
              <button
                onClick={onRegisterClick}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#F26522] hover:bg-[#D95314] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-xs hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>Đăng ký tham gia</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-transparent hover:bg-black/5 text-[#18233A] border border-[#18233A]/20 hover:border-[#18233A] font-heading font-bold text-xs tracking-wide uppercase transition-all cursor-pointer"
              >
                <span>Xem cự ly & lộ trình</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#8C9BAE]" />
              </button>
            </div>

            {/* Refined Split-Flap Flip Countdown Timer */}
            <div className="mt-3 lg:mt-3.5 pt-0.5">
              <FlipCountdown
                days={timeLeft.days}
                hours={timeLeft.hours}
                minutes={timeLeft.minutes}
                seconds={timeLeft.seconds}
              />
            </div>

          </div>

          {/* RIGHT COLUMN: ~42% (5 cols on 12-col grid) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              
              {/* Main Artwork Container (Tightly constrained height so it never exceeds 1 viewport) */}
              <div className="relative rounded-2xl overflow-hidden bg-[#18233A] shadow-xl border border-[#EEE5D7]/70 aspect-[4/4] max-h-[320px] xl:max-h-[350px] w-full mx-auto">
                
                {/* Athletic Lifestyle Photography */}
                <img
                  src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1200&q=85"
                  alt="Biti's 45 Năm Bước Chạm Bước Runners"
                  className="absolute inset-0 w-full h-full object-cover object-center filter saturate-110 brightness-95"
                />

                {/* Subtle Editorial Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#18233A] via-[#18233A]/30 to-black/20" />

                {/* Top Badge: 45th Anniversary Heritage Mark */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-10">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/40 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F26522]" />
                    <span>EST. 1982 → 2027</span>
                  </div>

                  <div className="text-right">
                    <span className="text-[9px] font-heading font-extrabold uppercase tracking-widest text-white/80 block">
                      KĐT SALA
                    </span>
                    <span className="text-[11px] font-mono font-bold text-white block">
                      TP. THỦ ĐỨC
                    </span>
                  </div>
                </div>

                {/* Integrated Race Bib Graphic */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <div className="bg-[#FAF7F1]/95 backdrop-blur-md rounded-xl p-3.5 border border-white/60 shadow-lg text-[#18233A]">
                    
                    {/* Race Bib Header */}
                    <div className="flex items-center justify-between pb-1.5 border-b border-[#EEE5D7]">
                      <div className="flex items-center gap-1.5">
                        <span className="font-heading font-black text-xs text-[#005EB8] tracking-tight">
                          BITI’S 45
                        </span>
                        <span className="text-[8px] font-bold uppercase tracking-wider text-[#8C9BAE]">
                          OFFICIAL RACE
                        </span>
                      </div>
                      <span className="px-1.5 py-0.5 rounded bg-[#F26522] text-white text-[8px] font-bold uppercase tracking-wider">
                        CHIP TIMED
                      </span>
                    </div>

                    {/* Big Bold BIB Number */}
                    <div className="flex items-baseline justify-between py-1">
                      <span className="font-mono font-black text-2xl sm:text-3xl text-[#18233A] tracking-tighter">
                        #1982-2027
                      </span>
                      <span className="text-[10px] font-heading font-bold text-[#526077] uppercase tracking-wide">
                        SALA RUN
                      </span>
                    </div>

                    {/* Bib Footer Data */}
                    <div className="pt-1.5 border-t border-[#EEE5D7] flex items-center justify-between text-[10px] text-[#526077]">
                      <span>Cự ly: <strong>5K · 10K · 21K</strong></span>
                      <span className="text-[#005EB8] font-bold">Nâng niu bước chạy Việt</span>
                    </div>

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
