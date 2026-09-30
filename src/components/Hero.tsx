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
      className="relative min-h-[90vh] pt-[104px] sm:pt-[116px] lg:pt-[128px] pb-16 lg:pb-24 flex flex-col justify-start bg-[#FAF7F1] text-[#18233A] overflow-hidden"
    >
      {/* Subtle Editorial Grid Lines Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="max-w-[1400px] mx-auto h-full px-4 sm:px-6 lg:px-8 grid grid-cols-12 gap-8">
          <div className="col-span-7 border-r border-[#EEE5D7]/80 h-full hidden lg:block" />
          <div className="col-span-5 h-full hidden lg:block" />
        </div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-stretch">
          
          {/* LEFT COLUMN: ~56% (7 cols on 12-col grid, max-w-[740px]) */}
          <div className="lg:col-span-7 flex flex-col justify-center max-w-[740px] w-full">
            
            {/* Small Anniversary Eyebrow */}
            <div className="flex items-center gap-2.5 mb-3.5 sm:mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F26522]" />
              <span className="text-xs sm:text-[13.5px] font-heading font-bold uppercase tracking-widest text-[#005EB8]">
                KỶ NIỆM 45 NĂM BITI’S · 1982–2027
              </span>
            </div>

            {/* Main Headline: BƯỚC / chạm / BƯỚC (Spacious leading, breathing lines) */}
            <h1 className="font-heading font-black text-[48px] sm:text-[62px] lg:text-[76px] xl:text-[88px] uppercase tracking-[-0.035em] leading-[0.98] text-[#18233A]">
              <span className="block">BƯỚC</span>
              <span className="block mt-2 sm:mt-3">
                <span className="text-[#F26522] italic font-serif font-bold lowercase tracking-normal text-[0.84em] mr-2.5 sm:mr-4">
                  chạm
                </span>
                <span>BƯỚC</span>
              </span>
            </h1>

            {/* Core Message / Tagline */}
            <div className="mt-5 sm:mt-6 flex items-center gap-3">
              <div className="h-[2.5px] w-8 bg-[#F26522] rounded-full shrink-0" />
              <p className="font-heading font-bold text-lg sm:text-xl lg:text-[24px] text-[#18233A] tracking-tight">
                Ghi dấu hiện tại, tiếp bước tương lai
              </p>
            </div>

            {/* Short Emotional Narrative */}
            <p className="mt-3.5 sm:mt-4 text-[#526077] text-sm sm:text-base leading-[1.7] max-w-[620px] font-normal">
              45 năm từ những bước chân đầu tiên đến triệu bước chân tiếp nối.
              Một hành trình kết nối gia đình, cộng đồng và những thế hệ Việt Nam.
            </p>

            {/* ONE Compact Event Information Strip */}
            <div className="mt-7 sm:mt-8 pt-6 sm:pt-7 border-t border-[#EEE5D7] grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {/* Date */}
              <div>
                <span className="block text-[10px] sm:text-[11px] font-heading font-bold uppercase tracking-wider text-[#8C9BAE] mb-1">
                  Thời gian
                </span>
                <span className="block font-heading font-black text-base sm:text-lg lg:text-[18px] text-[#18233A] tracking-tight leading-snug">
                  07.03.2027
                </span>
                <span className="block text-[11px] text-[#526077] mt-0.5">Chủ nhật · 04:30 AM</span>
              </div>

              {/* Location */}
              <div>
                <span className="block text-[10px] sm:text-[11px] font-heading font-bold uppercase tracking-wider text-[#8C9BAE] mb-1">
                  Địa điểm
                </span>
                <span className="block font-heading font-black text-base sm:text-lg lg:text-[18px] text-[#18233A] tracking-tight leading-snug">
                  KĐT Sala
                </span>
                <span className="block text-[11px] text-[#526077] mt-0.5">TP. Thủ Đức, TP.HCM</span>
              </div>

              {/* Distances */}
              <div>
                <span className="block text-[10px] sm:text-[11px] font-heading font-bold uppercase tracking-wider text-[#8C9BAE] mb-1">
                  Cự ly thi đấu
                </span>
                <span className="block font-heading font-black text-base sm:text-lg lg:text-[18px] text-[#18233A] tracking-tight leading-snug">
                  5K · 10K · 21K
                </span>
                <span className="block text-[11px] text-[#526077] mt-0.5">Cung đường chuẩn Sala</span>
              </div>

              {/* Special Category */}
              <div>
                <span className="block text-[10px] sm:text-[11px] font-heading font-bold uppercase tracking-wider text-[#F26522] mb-1">
                  Đặc quyền
                </span>
                <span className="block font-heading font-black text-base sm:text-lg lg:text-[18px] text-[#18233A] tracking-tight leading-snug">
                  Tiếp sức gia đình
                </span>
                <span className="block text-[11px] text-[#526077] mt-0.5">Đội hình 3 thế hệ</span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={onRegisterClick}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#F26522] hover:bg-[#D95314] text-white font-heading font-bold text-xs sm:text-[13px] uppercase tracking-wider shadow-xs hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>Đăng ký tham gia</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-transparent hover:bg-black/5 text-[#18233A] border border-[#18233A]/20 hover:border-[#18233A] font-heading font-bold text-xs sm:text-[13px] tracking-wide uppercase transition-all cursor-pointer"
              >
                <span>Xem cự ly & lộ trình</span>
                <ChevronRight className="w-4 h-4 text-[#8C9BAE]" />
              </button>
            </div>

            {/* Refined Compact Split-Flap Countdown Timer (Days/Hours/Mins static + Seconds flipping) */}
            <div className="mt-7 sm:mt-8">
              <FlipCountdown
                days={timeLeft.days}
                hours={timeLeft.hours}
                minutes={timeLeft.minutes}
                seconds={timeLeft.seconds}
              />
            </div>

          </div>

          {/* RIGHT COLUMN: ~44% (5 cols on 12-col grid, extended vertical presence matching left height) */}
          <div className="lg:col-span-5 relative w-full h-full flex flex-col">
            <div className="relative mx-auto max-w-md lg:max-w-none w-full h-full flex-1 flex flex-col">
              
              {/* Main Artwork Container: stretched vertically to match full height */}
              <div className="relative rounded-3xl overflow-hidden bg-[#18233A] shadow-2xl border border-[#EEE5D7] w-full flex-1 min-h-[520px] sm:min-h-[580px] lg:min-h-full">
                
                {/* Athletic Lifestyle Photography */}
                <img
                  src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1200&q=85"
                  alt="Biti's 45 Năm Bước Chạm Bước Runners"
                  className="absolute inset-0 w-full h-full object-cover object-center filter saturate-110 brightness-95"
                />

                {/* Subtle Editorial Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#18233A] via-[#18233A]/30 to-black/20" />

                {/* Top Badge: 45th Anniversary Heritage Mark */}
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-white z-10">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/15 text-[11px] font-mono font-bold tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-[#F26522]" />
                    <span>EST. 1982 → 2027</span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-heading font-extrabold uppercase tracking-widest text-white/80 block">
                      KĐT SALA
                    </span>
                    <span className="text-xs font-mono font-bold text-white block">
                      TP. THỦ ĐỨC
                    </span>
                  </div>
                </div>

                {/* Integrated Race Bib Graphic */}
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <div className="bg-[#FAF7F1]/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/60 shadow-xl text-[#18233A]">
                    
                    {/* Race Bib Header */}
                    <div className="flex items-center justify-between pb-2 border-b border-[#EEE5D7]">
                      <div className="flex items-center gap-1.5">
                        <span className="font-heading font-black text-sm text-[#005EB8] tracking-tight">
                          BITI’S 45
                        </span>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#8C9BAE]">
                          OFFICIAL RACE
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-[#F26522] text-white text-[9px] font-bold uppercase tracking-wider">
                        CHIP TIMED
                      </span>
                    </div>

                    {/* Big Bold BIB Number */}
                    <div className="flex items-baseline justify-between py-1.5">
                      <span className="font-mono font-black text-3xl sm:text-4xl text-[#18233A] tracking-tighter">
                        #1982-2027
                      </span>
                      <span className="text-xs font-heading font-bold text-[#526077] uppercase tracking-wide">
                        SALA RUN
                      </span>
                    </div>

                    {/* Bib Footer Data */}
                    <div className="pt-2 border-t border-[#EEE5D7] flex items-center justify-between text-xs text-[#526077]">
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
