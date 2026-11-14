import React from 'react';

interface BrandMarkProps {
  light?: boolean;
  compact?: boolean;
}

export const BrandMark: React.FC<BrandMarkProps> = ({ light = true, compact = false }) => {
  return (
    <span className="inline-flex items-center gap-2 sm:gap-3 whitespace-nowrap shrink-0 select-none">
      <svg
        width={compact ? '26' : '30'}
        height={compact ? '26' : '30'}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0 sm:w-8 sm:h-8"
      >
        <rect
          x="1.5"
          y="1.5"
          width="33"
          height="33"
          stroke="#C9A66B"
          strokeWidth="1.25"
        />
        <path
          d="M10 27V13.5L18 8L26 13.5V27"
          stroke="#C9A66B"
          strokeWidth="1.5"
          strokeLinejoin="miter"
        />
        <path
          d="M14.5 27V17.5H21.5V27"
          stroke={light ? '#FFFFFF' : '#101B2D'}
          strokeWidth="1.25"
        />
        <line x1="8" y1="27" x2="28" y2="27" stroke="#C9A66B" strokeWidth="1.5" />
      </svg>
      <span
        className={`font-serif text-base sm:text-xl font-semibold tracking-[0.14em] sm:tracking-[0.18em] uppercase whitespace-nowrap ${
          light ? 'text-white' : 'text-[#101B2D]'
        }`}
      >
        ELITE ESTATES
      </span>
    </span>
  );
};
