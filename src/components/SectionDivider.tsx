import React, { useEffect, useId, useRef, useState } from 'react';

export type DividerVariant =
  | 'hero-crown'
  | 'diamond-vault'
  | 'skyline-arch'
  | 'layered-3d-wave'
  | 'corner-frame'
  | 'particle-horizon'
  | 'tower-silhouette'
  | 'navy-gold-wave'
  | 'facade-grid'
  | 'diagonal-beam'
  | 'compass-portal'
  | 'royal-closing';

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
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const uid = useId().replace(/:/g, '');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setInView(entry.isIntersecting);
        }
      },
      { threshold: 0.08, rootMargin: '40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const gradId = `gold-${variant}-${uid}`;
  const glowId = `glow-${variant}-${uid}`;
  const wrapperClass = `arch-divider ${
    inView ? 'is-in-view' : ''
  } relative w-full overflow-hidden leading-none select-none pointer-events-none`;

  const renderGoldGradientDef = (soft = false) => (
    <defs>
      <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#C9A66B" stopOpacity={soft ? '0.15' : '0.25'} />
        <stop offset="28%" stopColor="#DFC391" stopOpacity="0.85" />
        <stop offset="50%" stopColor="#F0D9AE" stopOpacity="1" />
        <stop offset="72%" stopColor="#DFC391" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#C9A66B" stopOpacity={soft ? '0.15' : '0.25'} />
      </linearGradient>
      <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#DFC391" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#C9A66B" stopOpacity="0" />
      </radialGradient>
    </defs>
  );

  // A. Hero -> Featured Properties: Royal-gold symmetrical stepped architectural crest + building spire ornament
  if (variant === 'hero-crown') {
    return (
      <div ref={ref} className={wrapperClass} style={{ backgroundColor: topBg }} aria-hidden="true">
        <svg
          viewBox="0 0 1440 88"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-14 sm:h-[72px] md:h-[88px] block"
          preserveAspectRatio="none"
        >
          {renderGoldGradientDef()}
          {/* Stepped Architectural Horizon */}
          <path
            d="M0 88V52H420V34H620L720 14L820 34H1020V52H1440V88H0Z"
            fill={bottomBg}
          />
          {/* Subtle Royal Navy Backing Band */}
          <path
            d="M0 52H420V34H620L720 14L820 34H1020V52H1440"
            stroke={`url(#${gradId})`}
            strokeWidth="1.5"
            className="arch-draw-line"
          />
          <path
            d="M120 62H450V44H630L720 26L810 44H990V62H1320"
            stroke="#C9A66B"
            strokeOpacity="0.32"
            strokeWidth="1"
          />
          {/* Center Building-Inspired Architectural Ornament */}
          <ellipse cx="720" cy="34" rx="88" ry="26" fill={`url(#${glowId})`} className="arch-glow-pulse" />
          <g className="arch-glow-pulse">
            <rect x="708" y="24" width="24" height="24" stroke="#C9A66B" strokeWidth="1.2" fill="#101B2D" />
            <path d="M714 48V32L720 26L726 32V48" stroke="#DFC391" strokeWidth="1.2" />
            <line x1="720" y1="14" x2="720" y2="26" stroke="#DFC391" strokeWidth="1.2" />
          </g>
        </svg>
      </div>
    );
  }

  // B. Featured Properties -> Property Categories: Minimal gold geometric divider with glowing diamond center ornament
  if (variant === 'diamond-vault') {
    return (
      <div ref={ref} className={wrapperClass} style={{ backgroundColor: topBg }} aria-hidden="true">
        <svg
          viewBox="0 0 1440 76"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-12 sm:h-16 md:h-[76px] block"
          preserveAspectRatio="none"
        >
          {renderGoldGradientDef()}
          <path d="M0 76V38H590L720 14L850 38H1440V76H0Z" fill={bottomBg} />
          <path
            d="M0 38H590L720 14L850 38H1440"
            stroke={`url(#${gradId})`}
            strokeWidth="1.4"
            className="arch-draw-line"
          />
          <line x1="80" y1="28" x2="540" y2="28" stroke="#C9A66B" strokeOpacity="0.3" strokeWidth="0.9" />
          <line x1="900" y1="28" x2="1360" y2="28" stroke="#C9A66B" strokeOpacity="0.3" strokeWidth="0.9" />
          <circle cx="720" cy="36" r="34" fill={`url(#${glowId})`} className="arch-glow-pulse" />
          <g className="arch-glow-pulse">
            <rect
              x="720"
              y="21"
              width="21"
              height="21"
              transform="rotate(45 720 21)"
              fill="#101B2D"
              stroke="#DFC391"
              strokeWidth="1.3"
            />
            <rect
              x="720"
              y="27"
              width="12.5"
              height="12.5"
              transform="rotate(45 720 27)"
              stroke="#C9A66B"
              strokeWidth="1"
            />
            <circle cx="720" cy="36" r="2.2" fill="#DFC391" />
          </g>
        </svg>
      </div>
    );
  }

  // C. Property Categories -> Exclusive Projects: Overlapping skyscraper geometric silhouettes
  if (variant === 'skyline-arch') {
    return (
      <div ref={ref} className={wrapperClass} style={{ backgroundColor: topBg }} aria-hidden="true">
        <svg
          viewBox="0 0 1440 92"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-14 sm:h-[76px] md:h-[92px] block"
          preserveAspectRatio="none"
        >
          {renderGoldGradientDef()}
          {/* Rear translucent Royal Navy towers */}
          <path
            d="M0 92V66H240V42H330V66H560V28H640V14H720V28H800V46H1040V32H1130V66H1440V92H0Z"
            fill="#182A43"
            fillOpacity="0.7"
          />
          {/* Foreground Ivory Architectural Plane */}
          <path
            d="M0 92V74H310V52H420V74H650V40H790V74H1010V48H1110V74H1440V92H0Z"
            fill={bottomBg}
          />
          <path
            d="M0 74H310V52H420V74H650V40H790V74H1010V48H1110V74H1440"
            stroke={`url(#${gradId})`}
            strokeWidth="1.4"
            className="arch-draw-line"
          />
          {/* Skyscraper vertical gold mullions */}
          <line x1="685" y1="40" x2="685" y2="74" stroke="#C9A66B" strokeOpacity="0.35" strokeWidth="1" />
          <line x1="720" y1="24" x2="720" y2="74" stroke="#DFC391" strokeOpacity="0.55" strokeWidth="1.1" />
          <line x1="755" y1="40" x2="755" y2="74" stroke="#C9A66B" strokeOpacity="0.35" strokeWidth="1" />
        </svg>
      </div>
    );
  }

  // D. Exclusive Projects -> Why Choose Us / About: Luxury layered 3D architectural wave
  if (variant === 'layered-3d-wave') {
    return (
      <div ref={ref} className={wrapperClass} style={{ backgroundColor: topBg }} aria-hidden="true">
        <svg
          viewBox="0 0 1440 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-14 sm:h-20 md:h-[96px] block"
          preserveAspectRatio="none"
        >
          {renderGoldGradientDef()}
          <g className="arch-wave-drift">
            <path
              d="M-60 44C240 88 540 4 860 44C1140 78 1320 28 1500 44V96H-60V44Z"
              fill="#101B2D"
              fillOpacity="0.35"
            />
          </g>
          <path
            d="M0 58C310 12 660 88 1030 38C1230 10 1355 40 1440 56V96H0V58Z"
            fill={bottomBg}
          />
          <path
            d="M0 58C310 12 660 88 1030 38C1230 10 1355 40 1440 56"
            stroke={`url(#${gradId})`}
            strokeWidth="1.6"
            className="arch-draw-line"
          />
          <path
            d="M0 68C320 24 670 94 1040 48C1240 22 1365 50 1440 64"
            stroke="#C9A66B"
            strokeOpacity="0.3"
            strokeWidth="0.9"
          />
        </svg>
      </div>
    );
  }

  // E. Why Choose Us / About -> Gallery: Symmetrical architectural frame-inspired divider with light streak
  if (variant === 'corner-frame') {
    return (
      <div ref={ref} className={wrapperClass} style={{ backgroundColor: topBg }} aria-hidden="true">
        <div
          className="relative w-full py-6 sm:py-8"
          style={{ background: `linear-gradient(180deg, ${topBg} 0%, ${topBg} 48%, ${bottomBg} 52%, ${bottomBg} 100%)` }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <svg
              viewBox="0 0 1200 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-10 sm:h-14 block"
              preserveAspectRatio="none"
            >
              {renderGoldGradientDef()}
              {/* Symmetrical Blueprint Corner Brackets */}
              <path d="M16 42V14H140" stroke="#C9A66B" strokeWidth="1.4" />
              <path d="M1184 42V14H1060" stroke="#C9A66B" strokeWidth="1.4" />
              <path d="M40 28H530L560 12H640L670 28H1160" stroke={`url(#${gradId})`} strokeWidth="1.4" className="arch-draw-line" />
              <rect x="588" y="18" width="24" height="20" fill="#182A43" stroke="#DFC391" strokeWidth="1.2" />
              <line x1="600" y1="12" x2="600" y2="44" stroke="#C9A66B" strokeWidth="1.1" />
            </svg>
            {/* Subtle Gold Light Streak */}
            <div className="absolute top-1/2 left-0 w-40 h-px bg-gradient-to-r from-transparent via-[#DFC391] to-transparent arch-light-streak" />
          </div>
        </div>
      </div>
    );
  }

  // F. Gallery -> Virtual Tour: Animated golden particles, fine horizontal lines & minimal geometric details
  if (variant === 'particle-horizon') {
    return (
      <div ref={ref} className={wrapperClass} style={{ backgroundColor: topBg }} aria-hidden="true">
        <div className="relative">
          <svg
            viewBox="0 0 1440 84"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-14 sm:h-[72px] md:h-[84px] block"
            preserveAspectRatio="none"
          >
            {renderGoldGradientDef()}
            <path d="M0 84V44H500L540 26H900L940 44H1440V84H0Z" fill={bottomBg} />
            <path
              d="M0 44H500L540 26H900L940 44H1440"
              stroke={`url(#${gradId})`}
              strokeWidth="1.35"
              className="arch-draw-line"
            />
            <line x1="180" y1="36" x2="480" y2="36" stroke="#C9A66B" strokeOpacity="0.3" strokeWidth="0.9" />
            <line x1="960" y1="36" x2="1260" y2="36" stroke="#C9A66B" strokeOpacity="0.3" strokeWidth="0.9" />
            <polygon points="720,16 730,26 720,36 710,26" fill="#C9A66B" className="arch-glow-pulse" />
          </svg>
          {/* Sparse Floating Champagne-Gold Particles */}
          <span
            className="hidden sm:block absolute left-[22%] top-[34%] w-1.5 h-1.5 bg-[#C9A66B] arch-particle"
            style={{ animationDelay: '0s' }}
          />
          <span
            className="absolute left-[38%] top-[24%] w-1 h-1 bg-[#DFC391] arch-particle"
            style={{ animationDelay: '0.8s' }}
          />
          <span
            className="absolute right-[38%] top-[26%] w-1 h-1 bg-[#DFC391] arch-particle"
            style={{ animationDelay: '1.5s' }}
          />
          <span
            className="hidden sm:block absolute right-[22%] top-[36%] w-1.5 h-1.5 bg-[#C9A66B] arch-particle"
            style={{ animationDelay: '2.1s' }}
          />
        </div>
      </div>
    );
  }

  // G. Virtual Tour -> Our Real Estate Experts: Abstract skyline silhouette outline with architectural depth
  if (variant === 'tower-silhouette') {
    return (
      <div ref={ref} className={wrapperClass} style={{ backgroundColor: topBg }} aria-hidden="true">
        <svg
          viewBox="0 0 1440 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-14 sm:h-[74px] md:h-[90px] block"
          preserveAspectRatio="none"
        >
          {renderGoldGradientDef()}
          <path
            d="M0 90V64H380V44H440V64H660V22H705V10H735V22H780V64H1000V44H1060V64H1440V90H0Z"
            fill={bottomBg}
          />
          <path
            d="M0 64H380V44H440V64H660V22H705V10H735V22H780V64H1000V44H1060V64H1440"
            stroke={`url(#${gradId})`}
            strokeWidth="1.5"
            className="arch-draw-line"
          />
          {/* Subtle fine-line inner spire frames */}
          <rect x="688" y="34" width="64" height="30" stroke="#C9A66B" strokeOpacity="0.3" strokeWidth="1" />
          <line x1="720" y1="10" x2="720" y2="64" stroke="#DFC391" strokeOpacity="0.6" strokeWidth="1" />
        </svg>
      </div>
    );
  }

  // H. Our Real Estate Experts -> Client Testimonials: Luxury flowing SVG wave with layered navy & champagne-gold curves
  if (variant === 'navy-gold-wave') {
    return (
      <div ref={ref} className={wrapperClass} style={{ backgroundColor: topBg }} aria-hidden="true">
        <svg
          viewBox="0 0 1440 88"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-14 sm:h-[72px] md:h-[88px] block"
          preserveAspectRatio="none"
        >
          {renderGoldGradientDef()}
          <g className="arch-wave-drift">
            <path
              d="M-60 30C260 76 620 4 940 44C1180 74 1340 34 1500 22V88H-60V30Z"
              fill="#101B2D"
              fillOpacity="0.12"
            />
            <path
              d="M-60 44C280 12 640 82 980 34C1200 6 1350 42 1500 50V88H-60V44Z"
              fill="#182A43"
              fillOpacity="0.08"
            />
          </g>
          <path
            d="M0 54C360 16 740 82 1120 40C1275 22 1370 38 1440 50V88H0V54Z"
            fill={bottomBg}
          />
          <path
            d="M0 54C360 16 740 82 1120 40C1275 22 1370 38 1440 50"
            stroke={`url(#${gradId})`}
            strokeWidth="1.6"
            className="arch-draw-line"
          />
        </svg>
      </div>
    );
  }

  // I. Testimonials -> List Your Property: Gold-gradient geometric divider inspired by luxury building facades
  if (variant === 'facade-grid') {
    return (
      <div ref={ref} className={wrapperClass} style={{ backgroundColor: topBg }} aria-hidden="true">
        <svg
          viewBox="0 0 1440 82"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-14 sm:h-[68px] md:h-[82px] block"
          preserveAspectRatio="none"
        >
          {renderGoldGradientDef()}
          <path
            d="M0 82V42H260V28H480V42H640V18H800V42H960V28H1180V42H1440V82H0Z"
            fill={bottomBg}
          />
          <path
            d="M0 42H260V28H480V42H640V18H800V42H960V28H1180V42H1440"
            stroke={`url(#${gradId})`}
            strokeWidth="1.5"
            className="arch-draw-line"
          />
          {/* Architectural Facade Vertical Fins */}
          {[660, 690, 720, 750, 780].map((x) => (
            <line
              key={x}
              x1={x}
              y1="22"
              x2={x}
              y2="56"
              stroke="#C9A66B"
              strokeOpacity="0.45"
              strokeWidth="1.1"
            />
          ))}
        </svg>
      </div>
    );
  }

  // J. List Your Property -> Market Insights: Subtle diagonal architectural planes with gold light streak
  if (variant === 'diagonal-beam') {
    return (
      <div ref={ref} className={wrapperClass} style={{ backgroundColor: topBg }} aria-hidden="true">
        <div className="relative">
          <svg
            viewBox="0 0 1440 76"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-12 sm:h-16 md:h-[76px] block"
            preserveAspectRatio="none"
          >
            {renderGoldGradientDef()}
            <polygon points="0,76 1440,12 1440,76" fill={bottomBg} />
            <polygon points="0,76 720,44 1440,76" fill={bottomBg} fillOpacity="0.45" />
            <line
              x1="0"
              y1="74"
              x2="1440"
              y2="11"
              stroke={`url(#${gradId})`}
              strokeWidth="1.6"
              className="arch-draw-line"
            />
          </svg>
          <div className="absolute top-1/2 left-0 w-44 h-px -rotate-2 bg-gradient-to-r from-transparent via-[#DFC391] to-transparent arch-light-streak" />
        </div>
      </div>
    );
  }

  // K. Market Insights -> Contact: Minimal architectural compass-arch portal
  if (variant === 'compass-portal') {
    return (
      <div ref={ref} className={wrapperClass} style={{ backgroundColor: topBg }} aria-hidden="true">
        <svg
          viewBox="0 0 1440 78"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-12 sm:h-16 md:h-[78px] block"
          preserveAspectRatio="none"
        >
          {renderGoldGradientDef()}
          <path
            d="M0 78V48H540C620 48 660 12 720 12C780 12 820 48 900 48H1440V78H0Z"
            fill={bottomBg}
          />
          <path
            d="M0 48H540C620 48 660 12 720 12C780 12 820 48 900 48H1440"
            stroke={`url(#${gradId})`}
            strokeWidth="1.4"
            className="arch-draw-line"
          />
          <circle cx="720" cy="36" r="24" fill={`url(#${glowId})`} className="arch-glow-pulse" />
          <g className="arch-glow-pulse">
            <circle cx="720" cy="34" r="9" stroke="#C9A66B" strokeWidth="1.2" fill="#FFFFFF" />
            <circle cx="720" cy="34" r="2.5" fill="#C9A66B" />
          </g>
        </svg>
      </div>
    );
  }

  // L. Contact -> Footer: Royal architectural closing divider with symmetrical skyline ornament & subtle luxury glow
  return (
    <div ref={ref} className={wrapperClass} style={{ backgroundColor: topBg }} aria-hidden="true">
      <svg
        viewBox="0 0 1440 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-16 sm:h-20 md:h-[100px] block"
        preserveAspectRatio="none"
      >
        {renderGoldGradientDef()}
        {/* Secondary Royal Navy Silhouette Depth */}
        <path
          d="M0 100V68H320V48H430V68H630V32H690V16H750V32H810V68H1010V48H1120V68H1440V100H0Z"
          fill="#182A43"
          fillOpacity="0.45"
        />
        {/* Primary Deep Midnight Navy Footer Plane */}
        <path
          d="M0 100V74H400V56H520V74H655V38L720 14L785 38V74H920V56H1040V74H1440V100H0Z"
          fill={bottomBg}
        />
        <path
          d="M0 74H400V56H520V74H655V38L720 14L785 38V74H920V56H1040V74H1440"
          stroke={`url(#${gradId})`}
          strokeWidth="1.6"
          className="arch-draw-line"
        />
        {/* Central Architectural Crown Glow */}
        <ellipse cx="720" cy="40" rx="110" ry="30" fill={`url(#${glowId})`} className="arch-glow-pulse" />
        <g className="arch-glow-pulse">
          <line x1="720" y1="14" x2="720" y2="66" stroke="#DFC391" strokeWidth="1.2" />
          <path d="M694 64V44L720 26L746 44V64" stroke="#C9A66B" strokeWidth="1.2" />
          <rect x="708" y="48" width="24" height="16" stroke="#DFC391" strokeOpacity="0.7" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
};
