import React, { useState, useEffect, useRef } from 'react';

interface FlipUnitProps {
  value: string;
  label: string;
  isPrimary?: boolean;
}

export const FlipUnit: React.FC<FlipUnitProps> = ({ value, label, isPrimary = false }) => {
  const [currentVal, setCurrentVal] = useState<string>(value);
  const [prevVal, setPrevVal] = useState<string>(value);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (value !== currentVal) {
      setPrevVal(currentVal);
      setCurrentVal(value);
      setIsFlipping(true);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setIsFlipping(false);
      }, 480);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value, currentVal]);

  // Dimensions & styling variants
  const widthClass = isPrimary ? 'w-[100px] sm:w-[114px]' : 'w-[58px] sm:w-[66px]';
  const cardHeightClass = isPrimary ? 'h-[52px] sm:h-[58px]' : 'h-[46px] sm:h-[50px]';
  const halfHeightClass = isPrimary ? 'h-[26px] sm:h-[29px]' : 'h-[23px] sm:h-[25px]';
  const splitPosClass = isPrimary ? 'top-[26px] sm:top-[29px]' : 'top-[23px] sm:top-[25px]';
  
  const textClass = isPrimary
    ? 'text-2xl sm:text-3xl font-black font-mono tracking-tight text-[#F26522]'
    : 'text-xl sm:text-2xl font-bold font-mono tracking-tight text-[#18233A]';

  const cardBgClass = isPrimary
    ? 'bg-[#FFF9F5] border-[#F26522]/30'
    : 'bg-white border-[#EEE5D7]';

  const labelClass = isPrimary
    ? 'text-[10px] sm:text-[11px] font-heading font-black text-[#F26522] tracking-wider uppercase'
    : 'text-[10px] sm:text-[11px] font-sans font-semibold text-[#8C9BAE]';

  return (
    <div className={`flex flex-col items-center ${widthClass}`}>
      {/* 3D Flip Card Container */}
      <div className={`relative w-full ${cardHeightClass} flip-card-perspective shadow-[0_2px_8px_rgba(24,35,58,0.04)] rounded-xl`}>
        
        {/* ================= STATIC BACKGROUND CARD ================= */}
        {/* Static Top Half (Shows incoming next value) */}
        <div
          className={`absolute inset-x-0 top-0 ${halfHeightClass} overflow-hidden rounded-t-xl border-t border-x ${cardBgClass} flex items-end justify-center select-none`}
        >
          <div
            className={`absolute inset-x-0 top-0 ${cardHeightClass} flex items-center justify-center ${textClass} tabular-nums`}
          >
            {currentVal}
          </div>
          {/* Subtle top glare/gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />
        </div>

        {/* Static Bottom Half (Shows old value until flip bottom lands) */}
        <div
          className={`absolute inset-x-0 bottom-0 ${halfHeightClass} overflow-hidden rounded-b-xl border-b border-x ${cardBgClass} flex items-start justify-center select-none`}
        >
          <div
            className={`absolute inset-x-0 bottom-0 ${cardHeightClass} flex items-center justify-center ${textClass} tabular-nums`}
          >
            {isFlipping ? prevVal : currentVal}
          </div>
          {/* Subtle bottom shadow */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
        </div>

        {/* ================= DYNAMIC FLIPPING FLAPS ================= */}
        {isFlipping && (
          <>
            {/* Top Flipping Flap: Rotates 0deg -> -90deg */}
            <div
              className={`absolute inset-x-0 top-0 ${halfHeightClass} overflow-hidden rounded-t-xl border-t border-x ${cardBgClass} flex items-end justify-center select-none z-20 flip-top-active`}
            >
              <div
                className={`absolute inset-x-0 top-0 ${cardHeightClass} flex items-center justify-center ${textClass} tabular-nums`}
              >
                {prevVal}
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-black/10 pointer-events-none" />
            </div>

            {/* Bottom Flipping Flap: Rotates 90deg -> 0deg */}
            <div
              className={`absolute inset-x-0 bottom-0 ${halfHeightClass} overflow-hidden rounded-b-xl border-b border-x ${cardBgClass} flex items-start justify-center select-none z-20 flip-bottom-active`}
            >
              <div
                className={`absolute inset-x-0 bottom-0 ${cardHeightClass} flex items-center justify-center ${textClass} tabular-nums`}
              >
                {currentVal}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
            </div>
          </>
        )}

        {/* Split Hinge Seam & Micro Rivet Notches */}
        <div
          className={`absolute inset-x-0 ${splitPosClass} -translate-y-1/2 h-[1px] bg-[#18233A]/15 z-30 pointer-events-none`}
        />
        {/* Left side notch */}
        <div
          className={`absolute left-0 ${splitPosClass} -translate-y-1/2 w-[3px] h-[5px] bg-[#FAF7F1] border-r border-[#18233A]/15 rounded-r-full z-30 pointer-events-none`}
        />
        {/* Right side notch */}
        <div
          className={`absolute right-0 ${splitPosClass} -translate-y-1/2 w-[3px] h-[5px] bg-[#FAF7F1] border-l border-[#18233A]/15 rounded-l-full z-30 pointer-events-none`}
        />
      </div>

      {/* Unit Label */}
      <span className={`${labelClass} mt-1.5 select-none text-center`}>
        {label}
      </span>
    </div>
  );
};

interface FlipCountdownProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const FlipCountdown: React.FC<FlipCountdownProps> = ({
  days,
  hours,
  minutes,
  seconds,
}) => {
  return (
    <div className="inline-flex flex-wrap items-center gap-2.5 sm:gap-3.5">
      {/* FEATURED CALENDAR TILE: DAYS */}
      <FlipUnit
        value={String(days)}
        label="NGÀY NỮA"
        isPrimary={true}
      />

      {/* Subtle Visual Divider */}
      <div className="h-9 w-px bg-[#EEE5D7] mx-0.5 hidden xs:block" />

      {/* PRECISION TIME UNITS: HH : MM : SS */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <FlipUnit
          value={String(hours).padStart(2, '0')}
          label="giờ"
          isPrimary={false}
        />

        <span className="text-[#B2BAC5] text-xl font-bold font-mono pb-5 select-none">
          :
        </span>

        <FlipUnit
          value={String(minutes).padStart(2, '0')}
          label="phút"
          isPrimary={false}
        />

        <span className="text-[#B2BAC5] text-xl font-bold font-mono pb-5 select-none">
          :
        </span>

        <FlipUnit
          value={String(seconds).padStart(2, '0')}
          label="giây"
          isPrimary={false}
        />
      </div>
    </div>
  );
};
