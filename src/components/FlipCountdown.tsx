import React, { useState, useEffect, useRef } from 'react';

interface FlipUnitProps {
  value: string;
  label: string;
  isPrimary?: boolean;
}

export const FlipUnit: React.FC<FlipUnitProps> = ({ value, label, isPrimary = false }) => {
  const [displayVal, setDisplayVal] = useState<string>(value);
  const [prevVal, setPrevVal] = useState<string>(value);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (value !== displayVal) {
      setPrevVal(displayVal);
      setDisplayVal(value);
      setIsFlipping(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setIsFlipping(false);
      }, 580);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, displayVal]);

  // Card dimensions: Days card +10-15% (235-240px desktop), Time cards 125-130px desktop
  const cardWidthClass = isPrimary
    ? 'w-[150px] xs:w-[185px] sm:w-[215px] lg:w-[240px]'
    : 'w-[74px] xs:w-[92px] sm:w-[110px] lg:w-[128px]';

  const cardHeightClass = 'h-[78px] sm:h-[90px] lg:h-[100px]';

  const textSizeClass = isPrimary
    ? 'text-4xl xs:text-5xl sm:text-[62px] lg:text-[72px]'
    : 'text-2xl xs:text-3xl sm:text-[44px] lg:text-[50px]';

  const textColorClass = isPrimary
    ? 'text-[#F26522]'
    : 'text-[#18233A]';

  const cardBorderClass = isPrimary
    ? 'border-[#F26522]/30'
    : 'border-[#EEE5D7]';

  const topBgClass = isPrimary
    ? 'bg-[#FFFBF8]'
    : 'bg-white';

  const bottomBgClass = isPrimary
    ? 'bg-[#FFF3EB]'
    : 'bg-[#F6F2E9]';

  const labelClass = isPrimary
    ? 'text-xs sm:text-[13px] font-heading font-black tracking-widest text-[#F26522] uppercase mt-2'
    : 'text-xs sm:text-[13px] font-sans font-semibold text-[#8C9BAE] mt-2';

  return (
    <div className={`flex flex-col items-center ${cardWidthClass}`}>
      {/* 3D Flip Card Shell with 1000px perspective */}
      <div
        className={`relative w-full ${cardHeightClass} flip-perspective rounded-xl sm:rounded-2xl shadow-[0_3px_12px_rgba(24,35,58,0.05)]`}
      >
        {/* ================= LAYER 1: STATIC TOP HALF ================= */}
        {/* Shows new resting value (upper 50% only) */}
        <div
          className={`absolute inset-x-0 top-0 h-1/2 overflow-hidden rounded-t-xl sm:rounded-t-2xl border-t border-x ${cardBorderClass} ${topBgClass} select-none`}
        >
          <div
            className={`absolute inset-x-0 top-0 h-[200%] flex items-center justify-center font-mono font-black tabular-nums tracking-tighter ${textSizeClass} ${textColorClass}`}
          >
            {displayVal}
          </div>
          {/* Subtle top ambient glare */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 to-transparent pointer-events-none" />
        </div>

        {/* ================= LAYER 2: STATIC BOTTOM HALF ================= */}
        {/* Shows old value while flipping, then current value when resting (lower 50% only) */}
        <div
          className={`absolute inset-x-0 bottom-0 h-1/2 overflow-hidden rounded-b-xl sm:rounded-b-2xl border-b border-x ${cardBorderClass} ${bottomBgClass} select-none`}
        >
          <div
            className={`absolute inset-x-0 bottom-0 h-[200%] flex items-center justify-center font-mono font-black tabular-nums tracking-tighter ${textSizeClass} ${textColorClass}`}
          >
            {isFlipping ? prevVal : displayVal}
          </div>
          {/* Bottom card physical depth gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
        </div>

        {/* ================= LAYER 3: ANIMATED TOP FLAP ================= */}
        {/* Rotates from 0deg down to -90deg around center hinge, showing old value upper 50% */}
        {isFlipping && (
          <div
            className={`absolute inset-x-0 top-0 h-1/2 overflow-hidden rounded-t-xl sm:rounded-t-2xl border-t border-x ${cardBorderClass} ${topBgClass} select-none z-20 animate-flip-top`}
          >
            <div
              className={`absolute inset-x-0 top-0 h-[200%] flex items-center justify-center font-mono font-black tabular-nums tracking-tighter ${textSizeClass} ${textColorClass}`}
            >
              {prevVal}
            </div>
            {/* Dynamic shadow that darkens as flap tilts down */}
            <div className="absolute inset-0 bg-black/40 animate-shadow-top pointer-events-none" />
          </div>
        )}

        {/* ================= LAYER 4: ANIMATED BOTTOM FLAP ================= */}
        {/* Rotates from 90deg down to 0deg around center hinge, showing new value lower 50% */}
        {isFlipping && (
          <div
            className={`absolute inset-x-0 bottom-0 h-1/2 overflow-hidden rounded-b-xl sm:rounded-b-2xl border-b border-x ${cardBorderClass} ${bottomBgClass} select-none z-30 animate-flip-bottom`}
          >
            <div
              className={`absolute inset-x-0 bottom-0 h-[200%] flex items-center justify-center font-mono font-black tabular-nums tracking-tighter ${textSizeClass} ${textColorClass}`}
            >
              {displayVal}
            </div>
            {/* Dynamic shadow that lightens as flap lands flat */}
            <div className="absolute inset-0 bg-black/30 animate-shadow-bottom pointer-events-none" />
          </div>
        )}

        {/* ================= PHYSICAL HINGE LINE & NOTCHES ================= */}
        {/* Horizontal center split line with inner depth shadow */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-[#18233A]/25 z-40 pointer-events-none shadow-[0_1px_1px_rgba(0,0,0,0.06)]" />
        
        {/* Left hinge notch */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 sm:w-1.5 h-2 sm:h-2.5 bg-[#FAF7F1] border-r border-[#18233A]/20 rounded-r-full z-40 pointer-events-none" />
        
        {/* Right hinge notch */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 sm:w-1.5 h-2 sm:h-2.5 bg-[#FAF7F1] border-l border-[#18233A]/20 rounded-l-full z-40 pointer-events-none" />
      </div>

      {/* Label outside the flip mechanism */}
      <span className={`${labelClass} select-none text-center`}>
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
    <div className="inline-flex items-center gap-2 sm:gap-3 lg:gap-3.5 max-w-full overflow-x-auto pb-1">
      {/* 1. FEATURED HERO TILE: DAYS (200-220px on desktop) */}
      <FlipUnit
        value={String(days)}
        label="NGÀY NỮA"
        isPrimary={true}
      />

      {/* Subtle Visual Gap/Divider between Day and Clock */}
      <div className="h-10 w-px bg-[#EEE5D7] mx-0.5 hidden xs:block" />

      {/* 2. TIME PRECISION UNITS: HOURS : MINUTES : SECONDS (110-125px on desktop) */}
      <div className="flex items-center gap-1.5 sm:gap-2.5">
        {/* Hours */}
        <FlipUnit
          value={String(hours).padStart(2, '0')}
          label="giờ"
          isPrimary={false}
        />

        {/* Static Colon Separator (Never flips) */}
        <span className="text-2xl sm:text-3xl lg:text-4xl font-mono font-bold text-[#B2BAC5] flex items-center justify-center h-[78px] sm:h-[90px] lg:h-[100px] select-none pb-6">
          :
        </span>

        {/* Minutes */}
        <FlipUnit
          value={String(minutes).padStart(2, '0')}
          label="phút"
          isPrimary={false}
        />

        {/* Static Colon Separator (Never flips) */}
        <span className="text-2xl sm:text-3xl lg:text-4xl font-mono font-bold text-[#B2BAC5] flex items-center justify-center h-[78px] sm:h-[90px] lg:h-[100px] select-none pb-6">
          :
        </span>

        {/* Seconds */}
        <FlipUnit
          value={String(seconds).padStart(2, '0')}
          label="giây"
          isPrimary={false}
        />
      </div>
    </div>
  );
};
