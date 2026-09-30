import React, { useState, useEffect, useRef } from 'react';

interface StaticUnitProps {
  value: string;
  label: string;
  isPrimary?: boolean;
}

/**
 * Static single-surface card for Days, Hours, and Minutes.
 * Continuous warm white / ivory surface, rounded-xl/2xl, no center divider, no hinge.
 */
export const StaticUnit: React.FC<StaticUnitProps> = ({
  value,
  label,
  isPrimary = false,
}) => {
  const cardWidthClass = isPrimary
    ? 'w-[84px] xs:w-[96px] sm:w-[108px] lg:w-[118px]'
    : 'w-[42px] xs:w-[48px] sm:w-[54px] lg:w-[60px]';

  const cardHeightClass = 'h-[48px] sm:h-[52px] lg:h-[58px]';

  const textSizeClass = isPrimary
    ? 'text-xl sm:text-2xl lg:text-[27px]'
    : 'text-sm sm:text-base lg:text-[19px]';

  const textColorClass = isPrimary
    ? 'text-[#F26522]'
    : 'text-[#18233A]';

  const cardBgClass = isPrimary
    ? 'bg-gradient-to-b from-[#FFFBF8] to-[#FFF6EF] border-[#F26522]/30 shadow-[0_2px_8px_rgba(242,101,34,0.06)]'
    : 'bg-white border-[#EEE5D7] shadow-[0_2px_8px_rgba(24,35,58,0.03)]';

  const labelClass = isPrimary
    ? 'text-[9px] sm:text-[10px] font-heading font-black tracking-widest text-[#F26522] uppercase mt-1'
    : 'text-[9px] sm:text-[10px] font-sans font-semibold text-[#8C9BAE] mt-1';

  return (
    <div className={`flex flex-col items-center ${cardWidthClass}`}>
      {/* One continuous single-surface card */}
      <div
        className={`w-full ${cardHeightClass} rounded-xl border ${cardBgClass} flex items-center justify-center select-none transition-transform hover:-translate-y-0.5 duration-200`}
      >
        <span
          className={`font-mono font-black tabular-nums tracking-tighter ${textSizeClass} ${textColorClass}`}
        >
          {value}
        </span>
      </div>

      {/* Label outside the card */}
      <span className={`${labelClass} select-none text-center`}>
        {label}
      </span>
    </div>
  );
};

interface FlipSecondsUnitProps {
  value: string;
  label: string;
}

/**
 * Dedicated 3D physical split-flap card for SECONDS only.
 * Features center horizontal seam, hinge notches, and 2-phase 3D folding animation every second.
 */
export const FlipSecondsUnit: React.FC<FlipSecondsUnitProps> = ({
  value,
  label,
}) => {
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
      }, 550);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, displayVal]);

  const cardWidthClass = 'w-[42px] xs:w-[48px] sm:w-[54px] lg:w-[60px]';
  const cardHeightClass = 'h-[48px] sm:h-[52px] lg:h-[58px]';
  const textSizeClass = 'text-sm sm:text-base lg:text-[19px]';
  const textColorClass = 'text-[#18233A]';
  const labelClass = 'text-[9px] sm:text-[10px] font-sans font-semibold text-[#8C9BAE] mt-1';

  return (
    <div className={`flex flex-col items-center ${cardWidthClass}`}>
      {/* 3D Flip Card Shell with 900px perspective */}
      <div
        className={`relative w-full ${cardHeightClass} flip-perspective rounded-xl shadow-[0_2px_8px_rgba(24,35,58,0.05)]`}
      >
        {/* ================= LAYER 1: STATIC TOP HALF ================= */}
        {/* Shows new resting value (upper 50% only) */}
        <div
          className="absolute inset-x-0 top-0 h-1/2 overflow-hidden rounded-t-xl border-t border-x border-[#EEE5D7] bg-white select-none"
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
          className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden rounded-b-xl border-b border-x border-[#EEE5D7] bg-[#F7F3EB] select-none"
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
            className="absolute inset-x-0 top-0 h-1/2 overflow-hidden rounded-t-xl border-t border-x border-[#EEE5D7] bg-white select-none z-20 animate-flip-top"
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
            className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden rounded-b-xl border-b border-x border-[#EEE5D7] bg-[#F7F3EB] select-none z-30 animate-flip-bottom"
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
        {/* Horizontal center split line with subtle shadow */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-[#18233A]/25 z-40 pointer-events-none shadow-[0_1px_1px_rgba(0,0,0,0.06)]" />
        
        {/* Left hinge notch */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-2 bg-[#FAF7F1] border-r border-[#18233A]/20 rounded-r-full z-40 pointer-events-none" />
        
        {/* Right hinge notch */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-2 bg-[#FAF7F1] border-l border-[#18233A]/20 rounded-l-full z-40 pointer-events-none" />
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
    <div className="inline-flex items-center gap-1 sm:gap-2 max-w-full overflow-x-auto pb-1">
      {/* 1. DAYS: Static continuous surface (Featured card with orange number) */}
      <StaticUnit
        value={String(days)}
        label="NGÀY NỮA"
        isPrimary={true}
      />

      {/* Subtle Visual Divider between Day and Clock */}
      <div className="h-6 w-px bg-[#EEE5D7] mx-0.5 hidden xs:block" />

      {/* 2. TIME PRECISION UNITS */}
      <div className="flex items-center gap-1 sm:gap-1.5">
        {/* Hours: Static continuous surface */}
        <StaticUnit
          value={String(hours).padStart(2, '0')}
          label="giờ"
          isPrimary={false}
        />

        {/* Static Colon Separator */}
        <span className="text-base sm:text-lg font-mono font-bold text-[#B2BAC5] flex items-center justify-center h-[48px] sm:h-[52px] lg:h-[58px] select-none pb-3">
          :
        </span>

        {/* Minutes: Static continuous surface */}
        <StaticUnit
          value={String(minutes).padStart(2, '0')}
          label="phút"
          isPrimary={false}
        />

        {/* Static Colon Separator */}
        <span className="text-base sm:text-lg font-mono font-bold text-[#B2BAC5] flex items-center justify-center h-[48px] sm:h-[52px] lg:h-[58px] select-none pb-3">
          :
        </span>

        {/* Seconds: The ONLY card using true 3D physical split-flap flip animation */}
        <FlipSecondsUnit
          value={String(seconds).padStart(2, '0')}
          label="giây"
        />
      </div>
    </div>
  );
};
