import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { BrandMark } from './BrandMark';

export const PreloaderAndControls: React.FC = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [fading, setFading] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const t1 = window.setTimeout(() => setFading(true), 550);
    const t2 = window.setTimeout(() => setShowLoader(false), 900);

    const onScroll = () => {
      setShowBackToTop(window.scrollY > 520);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      {/* Elegant Architectural Entrance Curtain */}
      {showLoader && (
        <div
          className={`fixed inset-0 z-[100] bg-[#101B2D] flex flex-col items-center justify-center transition-opacity duration-300 pointer-events-none ${
            fading ? 'opacity-0' : 'opacity-100'
          }`}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-4 px-6">
            <BrandMark light />
            <div className="w-40 h-px bg-[#C9A66B]/30 overflow-hidden relative">
              <div className="w-20 h-full bg-[#C9A66B] animate-pulse mx-auto" />
            </div>
            <span className="text-[11px] tracking-[0.26em] uppercase text-[#C9A66B]">
              Discover Spaces. Experience Excellence.
            </span>
          </div>
        </div>
      )}

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-5 right-5 z-40 w-11 h-11 bg-[#101B2D] border border-[#C9A66B] text-[#C9A66B] hover:bg-[#C9A66B] hover:text-[#101B2D] shadow-xl flex items-center justify-center transition-all duration-200 cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </>
  );
};
