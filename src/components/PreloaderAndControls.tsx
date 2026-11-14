import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export const PreloaderAndControls: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 520);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleBackToTop = () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  return (
    <AnimatePresence>
      {showBackToTop && (
        <motion.div
          key="back-to-top"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 right-5 z-40"
        >
          <button
            type="button"
            onClick={handleBackToTop}
            aria-label="Back to top"
            className="btn-lux-outline w-11 h-11 bg-[#101B2D] border border-[#C9A66B] text-[#C9A66B] shadow-xl flex items-center justify-center cursor-pointer"
          >
            <ArrowUp className="w-4 h-4 btn-lux-icon-shift" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
