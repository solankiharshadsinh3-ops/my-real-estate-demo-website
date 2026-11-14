import React, { useEffect, useRef } from 'react';

export const ScrollProgressIndicator: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let current = 0;
    let target = 0;
    let lastAriaValue = -1;
    let rafId = 0;
    let running = false;

    const readProgress = () => {
      const doc = document.documentElement;
      const maxScroll = Math.max(0, doc.scrollHeight - window.innerHeight);
      if (maxScroll <= 0) return 0;
      return Math.min(1, Math.max(0, window.scrollY / maxScroll));
    };

    const paint = (value: number) => {
      if (fillRef.current) {
        fillRef.current.style.transform = `scaleX(${value.toFixed(4)})`;
        fillRef.current.style.opacity = value > 0.001 ? '1' : '0';
      }
      const pct = Math.round(value * 100);
      if (containerRef.current && pct !== lastAriaValue) {
        lastAriaValue = pct;
        containerRef.current.setAttribute('aria-valuenow', String(pct));
      }
    };

    const tick = () => {
      if (prefersReduced) {
        current = target;
        paint(current);
        running = false;
        return;
      }

      const delta = target - current;
      if (Math.abs(delta) < 0.0008) {
        current = target;
        paint(current);
        running = false;
        return;
      }

      current += delta * 0.22;
      paint(current);
      rafId = window.requestAnimationFrame(tick);
    };

    const scheduleUpdate = () => {
      target = readProgress();
      if (prefersReduced) {
        current = target;
        paint(current);
        return;
      }
      if (!running) {
        running = true;
        rafId = window.requestAnimationFrame(tick);
      }
    };

    // Initialize immediately at mount position (0% at top)
    target = readProgress();
    current = target;
    paint(current);

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(scheduleUpdate);
      resizeObserver.observe(document.documentElement);
    }

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (resizeObserver) resizeObserver.disconnect();
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      role="progressbar"
      aria-label="Page reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
      className="fixed top-0 inset-x-0 w-full max-w-full z-[45] h-[2.5px] sm:h-[3px] pointer-events-none select-none bg-[#101B2D]/20"
    >
      <div
        ref={fillRef}
        className="h-full w-full origin-left will-change-transform bg-gradient-to-r from-[#9F7E47] via-[#C9A66B] to-[#DFC391] shadow-[0_0_8px_rgba(201,166,107,0.5)] transition-opacity duration-200"
        style={{ transform: 'scaleX(0)', opacity: 0 }}
      />
    </div>
  );
};
