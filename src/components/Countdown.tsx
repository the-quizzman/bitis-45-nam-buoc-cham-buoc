import React, { useState, useEffect } from 'react';
import { Timer, MapPin, Sparkles } from 'lucide-react';

export const Countdown: React.FC = () => {
  // Target: March 7, 2027 04:30:00 (Asia/Ho_Chi_Minh or UTC+7)
  const targetTime = new Date('2027-03-07T04:30:00+07:00').getTime();

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPast: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetTime]);

  return (
    <div className="relative z-20 -mt-10 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xl shadow-slate-200/50 p-6 sm:p-7 text-slate-900">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-orange-50 text-orange-600">
              <Timer className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-orange-600">
                Đếm ngược ngày khởi tranh
              </span>
              <h3 className="font-heading font-black text-lg text-slate-900">
                Chủ nhật, 07 tháng 03 năm 2027
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            <MapPin className="w-3.5 h-3.5 text-orange-500" />
            <span>Khu đô thị Sala, TP. Thủ Đức, TP.HCM</span>
          </div>
        </div>

        {/* Countdown Digits */}
        {timeLeft.isPast ? (
          <div className="py-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl font-heading font-bold text-sm">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Sự kiện đang diễn ra hoặc đã hoàn tất</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 my-5">
            
            {/* Days */}
            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-heading font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500 mt-1">
                NGÀY
              </span>
            </div>

            {/* Hours */}
            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-heading font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500 mt-1">
                GIỜ
              </span>
            </div>

            {/* Minutes */}
            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-heading font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500 mt-1">
                PHÚT
              </span>
            </div>

            {/* Seconds */}
            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20">
              <span className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-amber-100 mt-1">
                GIÂY
              </span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
