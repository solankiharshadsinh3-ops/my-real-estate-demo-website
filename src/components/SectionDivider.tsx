import React from 'react';

type DividerVariant =
  | 'architectural-step'
  | 'gold-horizon'
  | 'layered-wave'
  | 'diagonal-plane'
  | 'compass-arch'
  | 'gradient-crest';

interface SectionDividerProps {
  variant: DividerVariant;
  topBg: string;
  bottomBg: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  variant,
  topBg,
  bottomBg,
}) => {
  if (variant === 'architectural-step') {
    return (
      <div
        className="relative w-full overflow-hidden leading-none select-none"
        style={{ backgroundColor: topBg }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-10 sm:h-14 md:h-[72px] block"
          preserveAspectRatio="none"
        >
          <path
            d="M0 72V44H360V24H720V44H1080V14H1440V72H0Z"
            fill={bottomBg}
          />
          <path
            d="M0 44H360V24H720V44H1080V14H1440"
            stroke="#C9A66B"
            strokeOpacity="0.45"
            strokeWidth="1.2"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'gold-horizon') {
    return (
      <div
        className="relative w-full py-6 sm:py-8 flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(180deg, ${topBg} 0%, ${bottomBg} 100%)` }}
        aria-hidden="true"
      >
        <div className="max-w-7xl w-full mx-auto px-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A66B]/60 to-[#C9A66B]" />
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <rect
              x="13"
              y="2.5"
              width="14.8"
              height="14.8"
              transform="rotate(45 13 2.5)"
              stroke="#C9A66B"
              strokeWidth="1.1"
            />
            <circle cx="13" cy="13" r="2.2" fill="#C9A66B" />
          </svg>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#C9A66B]/60 to-[#C9A66B]" />
        </div>
      </div>
    );
  }

  if (variant === 'layered-wave') {
    return (
      <div
        className="relative w-full overflow-hidden leading-none select-none"
        style={{ backgroundColor: topBg }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 88"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-12 sm:h-16 md:h-[88px] block"
          preserveAspectRatio="none"
        >
          <path
            d="M0 32C280 78 560 0 880 42C1120 72 1300 54 1440 20V88H0V32Z"
            fill={bottomBg}
            fillOpacity="0.45"
          />
          <path
            d="M0 54C320 12 680 86 1040 38C1240 12 1360 36 1440 52V88H0V54Z"
            fill={bottomBg}
          />
          <path
            d="M0 54C320 12 680 86 1040 38C1240 12 1360 36 1440 52"
            stroke="#C9A66B"
            strokeOpacity="0.38"
            strokeWidth="1.2"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'diagonal-plane') {
    return (
      <div
        className="relative w-full overflow-hidden leading-none select-none"
        style={{ backgroundColor: topBg }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 68"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-10 sm:h-14 md:h-[68px] block"
          preserveAspectRatio="none"
        >
          <polygon points="0,68 1440,8 1440,68" fill={bottomBg} />
          <line
            x1="0"
            y1="67"
            x2="1440"
            y2="7"
            stroke="#C9A66B"
            strokeOpacity="0.5"
            strokeWidth="1.25"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'compass-arch') {
    return (
      <div
        className="relative w-full overflow-hidden leading-none select-none"
        style={{ backgroundColor: topBg }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 76"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-12 sm:h-16 md:h-[76px] block"
          preserveAspectRatio="none"
        >
          <path
            d="M0 76V46H540C620 46 660 10 720 10C780 10 820 46 900 46H1440V76H0Z"
            fill={bottomBg}
          />
          <path
            d="M0 46H540C620 46 660 10 720 10C780 10 820 46 900 46H1440"
            stroke="#C9A66B"
            strokeOpacity="0.55"
            strokeWidth="1.25"
          />
        </svg>
      </div>
    );
  }

  // gradient-crest
  return (
    <div
      className="relative w-full h-16 sm:h-20 flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${topBg} 0%, ${bottomBg} 100%)`,
      }}
      aria-hidden="true"
    >
      <div className="w-full max-w-5xl mx-auto px-6 flex items-center justify-between gap-6 opacity-80">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#C9A66B]/60" />
        <span className="w-2 h-2 rotate-45 border border-[#C9A66B]" />
        <span className="h-px w-16 bg-[#C9A66B]/60" />
        <span className="w-2 h-2 rotate-45 bg-[#C9A66B]" />
        <span className="h-px w-16 bg-[#C9A66B]/60" />
        <span className="w-2 h-2 rotate-45 border border-[#C9A66B]" />
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#C9A66B]/60" />
      </div>
    </div>
  );
};
