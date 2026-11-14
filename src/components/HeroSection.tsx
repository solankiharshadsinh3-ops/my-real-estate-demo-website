import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowRight, Search } from 'lucide-react';
import { HERO_IMAGE } from '../data/properties';
import { ListingTransaction, PropertyCategory } from '../types/realEstate';

interface HeroSectionProps {
  onHeroSearch: (params: {
    transaction: 'All' | ListingTransaction;
    category: 'All' | PropertyCategory;
    location: string;
    minPriceLakhs: string;
    maxPriceLakhs: string;
  }) => void;
}

const EASE_LUXURY = [0.22, 1, 0.36, 1] as const;

export const HeroSection: React.FC<HeroSectionProps> = ({ onHeroSearch }) => {
  const [transaction, setTransaction] = useState<'All' | ListingTransaction>('Buy');
  const [category, setCategory] = useState<'All' | PropertyCategory>('All');
  const [location, setLocation] = useState('');
  const [minPriceLakhs, setMinPriceLakhs] = useState('');
  const [maxPriceLakhs, setMaxPriceLakhs] = useState('');

  const sectionRef = useRef<HTMLElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const floatLayerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  // GPU-accelerated damped scroll + pointer depth parallax (zero React re-renders)
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const isFinePointer = window.matchMedia('(pointer: fine)').matches;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let targetScroll = Math.min(window.scrollY, 640);
    let currentScroll = targetScroll;
    let spotX = 50;
    let spotY = 38;
    let rafId = 0;
    let running = false;

    const applyTransforms = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      currentScroll += (targetScroll - currentScroll) * 0.12;

      if (bgLayerRef.current) {
        const bx = (-currentX * 14).toFixed(2);
        const by = (currentScroll * 0.16 - currentY * 9).toFixed(2);
        bgLayerRef.current.style.transform = `translate3d(${bx}px, ${by}px, 0) scale(1.03)`;
      }

      if (floatLayerRef.current) {
        const fx = (currentX * 22).toFixed(2);
        const fy = (-currentScroll * 0.06 + currentY * 14).toFixed(2);
        floatLayerRef.current.style.transform = `translate3d(${fx}px, ${fy}px, 0)`;
      }

      if (spotlightRef.current && isFinePointer) {
        spotlightRef.current.style.background = `radial-gradient(560px circle at ${spotX.toFixed(1)}% ${spotY.toFixed(1)}%, rgba(201, 166, 107, 0.12), transparent 68%)`;
      }

      const settled =
        Math.abs(targetX - currentX) < 0.002 &&
        Math.abs(targetY - currentY) < 0.002 &&
        Math.abs(targetScroll - currentScroll) < 0.2;

      if (!settled) {
        rafId = window.requestAnimationFrame(applyTransforms);
      } else {
        running = false;
      }
    };

    const scheduleFrame = () => {
      if (!running) {
        running = true;
        rafId = window.requestAnimationFrame(applyTransforms);
      }
    };

    const handleScroll = () => {
      targetScroll = Math.min(window.scrollY, 640);
      scheduleFrame();
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isFinePointer || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.height <= 0 || rect.width <= 0) return;
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = Math.max(-0.5, Math.min(0.5, nx));
      targetY = Math.max(-0.5, Math.min(0.5, ny));
      spotX = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      spotY = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
      scheduleFrame();
    };

    const handlePointerLeave = () => {
      targetX = 0;
      targetY = 0;
      scheduleFrame();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    const el = sectionRef.current;
    if (isFinePointer && el) {
      el.addEventListener('pointermove', handlePointerMove, { passive: true });
      el.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    }

    scheduleFrame();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (el) {
        el.removeEventListener('pointermove', handlePointerMove);
        el.removeEventListener('pointerleave', handlePointerLeave);
      }
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onHeroSearch({
      transaction,
      category,
      location,
      minPriceLakhs,
      maxPriceLakhs,
    });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen min-h-[100dvh] w-full flex flex-col justify-between overflow-hidden bg-[#101B2D] pt-24 pb-8 sm:pt-36 sm:pb-14"
    >
      {/* Background Cinematic Image with Slow Zoom + Continuous Vertical Float + Damped Depth Parallax */}
      <div
        ref={bgLayerRef}
        className="hero-depth-plane absolute -inset-4 pointer-events-none overflow-hidden"
      >
        <div className="w-full h-[calc(100%+28px)] -mt-3.5 animate-float-image">
          <img
            src={HERO_IMAGE}
            alt="ELITE ESTATES twilight architectural villa with infinity pool"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            draggable={false}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover animate-slow-zoom opacity-80"
          />
        </div>
        {/* Measured Luxury Scrims for High WCAG Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#101B2D]/82 via-[#101B2D]/48 to-[#101B2D]/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#101B2D]/80 via-[#101B2D]/35 to-[#101B2D]/45" />
      </div>

      {/* Interactive Ambient Architectural Spotlight (Pointer-Reactive on Desktop) */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        aria-hidden="true"
      />

      {/* Midground Floating Architectural Gold Elements & Depth Accents */}
      <div
        ref={floatLayerRef}
        className="hero-depth-plane absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Outer & Inner Interlocking Architectural Frames */}
        <div
          className="hidden md:block absolute top-28 right-8 lg:right-14 w-36 h-36 lg:w-48 lg:h-48 border border-[#C9A66B]/22 animate-float-gentle"
          style={{ animationDelay: '0.4s' }}
        >
          <span className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t border-l border-[#C9A66B]/70" />
          <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b border-r border-[#C9A66B]/70" />
        </div>

        <div
          className="hidden md:block absolute top-36 right-16 lg:right-24 w-24 h-24 lg:w-28 lg:h-28 border border-[#C9A66B]/35 animate-float-gentle"
          style={{ animationDelay: '1.3s' }}
        />

        {/* Delicate Vertical Architectural Axis Line */}
        <div
          className="hidden lg:block absolute top-24 right-[15.5rem] w-px h-32 bg-gradient-to-b from-transparent via-[#C9A66B]/45 to-transparent animate-float-image-deep"
          style={{ animationDelay: '0.9s' }}
        />

        {/* Floating Minimal Diamond Accents Across Depth Planes */}
        <span
          className="absolute top-1/3 left-[10%] w-1.5 h-1.5 bg-[#C9A66B]/60 rotate-45 animate-gold-particle"
          style={{ animationDelay: '0.2s' }}
        />
        <span
          className="absolute top-[42%] right-[22%] w-1.5 h-1.5 bg-[#DFC391]/70 rotate-45 animate-gold-particle"
          style={{ animationDelay: '1.1s' }}
        />
        <span
          className="hidden sm:block absolute bottom-1/3 left-[28%] w-1 h-1 bg-[#C9A66B]/55 rotate-45 animate-gold-particle"
          style={{ animationDelay: '2.0s' }}
        />
      </div>

      {/* Foreground Centered Editorial Content */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 my-auto pt-4 sm:pt-8">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE_LUXURY }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="hidden sm:inline-block w-8 h-px bg-[#C9A66B]" aria-hidden="true" />
            <p className="text-xs sm:text-sm font-medium tracking-[0.22em] uppercase text-[#C9A66B]">
              Ahmedabad · Gandhinagar · Mumbai · Luxury Advisory
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: EASE_LUXURY }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-semibold tracking-[0.02em] leading-[1.08] sm:leading-[1.06] text-white mb-5 sm:mb-6"
          >
            FIND YOUR PLACE IN THE WORLD
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16, ease: EASE_LUXURY }}
            className="text-base sm:text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed font-normal mb-9 sm:mb-10"
          >
            Discover exceptional properties, extraordinary architecture, and spaces designed around your lifestyle.
          </motion.p>
        </div>

        {/* Hero Glassmorphism Property Search Interface */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24, ease: EASE_LUXURY }}
          className="w-full bg-[#101B2D]/82 backdrop-blur-xl border border-[#C9A66B]/35 hover:border-[#C9A66B]/55 transition-colors duration-300 p-4 sm:p-6 shadow-2xl"
        >
          {/* Top Segmented Control: Buy / Rent / All */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-5 border-b border-white/10">
            <div
              role="group"
              aria-label="Listing transaction type"
              className="inline-flex bg-[#182A43] p-1 border border-white/10"
            >
              {(['Buy', 'Rent', 'All'] as const).map((mode) => {
                const isActive = transaction === mode;
                return (
                  <button
                    key={mode}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => {
                      setTransaction(mode);
                      setMinPriceLakhs('');
                      setMaxPriceLakhs('');
                    }}
                    className={`btn-lux-tab relative px-4 sm:px-5 py-2 min-h-[44px] sm:min-h-[40px] text-xs font-semibold tracking-[0.08em] uppercase whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-[#C9A66B] text-[#101B2D] shadow-sm'
                        : 'text-white/80 hover:text-white hover:bg-white/8'
                    }`}
                  >
                    {mode === 'All' ? 'All Listings' : mode}
                  </button>
                );
              })}
            </div>
            <span className="text-xs text-white/70 tracking-wide">
              Curated Private Portfolio · Direct Advisory
            </span>
          </div>

          {/* Search Inputs Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div>
              <label
                htmlFor="hero-location"
                className="block text-[11px] font-medium tracking-[0.12em] uppercase text-[#C9A66B] mb-2"
              >
                Location
              </label>
              <select
                id="hero-location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full h-11 px-3.5 bg-[#182A43]/90 border border-white/15 hover:border-[#C9A66B]/50 text-base sm:text-sm text-white transition-colors duration-200 focus:outline-none focus:border-[#C9A66B] focus:ring-1 focus:ring-[#C9A66B]/40"
              >
                <option value="">All Prime Locations</option>
                <option value="Ahmedabad">Ahmedabad (All Corridors)</option>
                <option value="Sindhu Bhavan">Sindhu Bhavan Road</option>
                <option value="Ambli-Bopal">Ambli-Bopal Road</option>
                <option value="Gandhinagar">Gandhinagar &amp; GIFT City</option>
                <option value="Mumbai">Worli Sea Face, Mumbai</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="hero-type"
                className="block text-[11px] font-medium tracking-[0.12em] uppercase text-[#C9A66B] mb-2"
              >
                Property Type
              </label>
              <select
                id="hero-type"
                value={category}
                onChange={(e) => setCategory(e.target.value as 'All' | PropertyCategory)}
                className="w-full h-11 px-3.5 bg-[#182A43]/90 border border-white/15 hover:border-[#C9A66B]/50 text-base sm:text-sm text-white transition-colors duration-200 focus:outline-none focus:border-[#C9A66B] focus:ring-1 focus:ring-[#C9A66B]/40"
              >
                <option value="All">All Property Types</option>
                <option value="Luxury Villas">Luxury Villas</option>
                <option value="Apartments">Apartments</option>
                <option value="Penthouses">Penthouses</option>
                <option value="Commercial Spaces">Commercial Spaces</option>
                <option value="Residential Plots">Residential Plots</option>
                <option value="Premium Houses">Premium Houses</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="hero-min-budget"
                className="block text-[11px] font-medium tracking-[0.12em] uppercase text-[#C9A66B] mb-2"
              >
                Minimum Budget
              </label>
              <select
                id="hero-min-budget"
                value={minPriceLakhs}
                onChange={(e) => setMinPriceLakhs(e.target.value)}
                className="w-full h-11 px-3.5 bg-[#182A43]/90 border border-white/15 hover:border-[#C9A66B]/50 text-base sm:text-sm text-white tabular-nums transition-colors duration-200 focus:outline-none focus:border-[#C9A66B] focus:ring-1 focus:ring-[#C9A66B]/40"
              >
                <option value="">No Minimum</option>
                {transaction === 'Rent' ? (
                  <>
                    <option value="1">₹1.0 L / mo</option>
                    <option value="2">₹2.0 L / mo</option>
                    <option value="3">₹3.0 L / mo</option>
                  </>
                ) : (
                  <>
                    <option value="100">₹1.0 Cr</option>
                    <option value="200">₹2.0 Cr</option>
                    <option value="300">₹3.0 Cr</option>
                    <option value="400">₹4.0 Cr</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label
                htmlFor="hero-max-budget"
                className="block text-[11px] font-medium tracking-[0.12em] uppercase text-[#C9A66B] mb-2"
              >
                Maximum Budget
              </label>
              <select
                id="hero-max-budget"
                value={maxPriceLakhs}
                onChange={(e) => setMaxPriceLakhs(e.target.value)}
                className="w-full h-11 px-3.5 bg-[#182A43]/90 border border-white/15 hover:border-[#C9A66B]/50 text-base sm:text-sm text-white tabular-nums transition-colors duration-200 focus:outline-none focus:border-[#C9A66B] focus:ring-1 focus:ring-[#C9A66B]/40"
              >
                <option value="">No Maximum</option>
                {transaction === 'Rent' ? (
                  <>
                    <option value="3">₹3.0 L / mo</option>
                    <option value="5">₹5.0 L / mo</option>
                  </>
                ) : (
                  <>
                    <option value="200">₹2.0 Cr</option>
                    <option value="300">₹3.0 Cr</option>
                    <option value="400">₹4.0 Cr</option>
                    <option value="600">₹6.0 Cr</option>
                  </>
                )}
              </select>
            </div>

            <button
              type="submit"
              className="group btn-lux-gold w-full h-11 px-6 font-semibold text-xs tracking-[0.1em] uppercase inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Search className="w-4 h-4 btn-lux-icon-shift" />
              <span>Search Properties</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-80 btn-lux-arrow" />
            </button>
          </div>
        </motion.form>
      </div>

      {/* Bottom Brand Tagline & Interactive Scroll CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.34, ease: EASE_LUXURY }}
        className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex items-center justify-between text-xs text-white/75"
      >
        <span className="hidden sm:inline tracking-[0.14em] uppercase">
          Discover Spaces. Experience Excellence.
        </span>
        <a
          href="#properties"
          onClick={(e) => {
            e.preventDefault();
            const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            document
              .getElementById('properties')
              ?.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
          }}
          className="btn-lux-link group mx-auto sm:mx-0 inline-flex items-center gap-3 py-2 px-3 sm:-mr-3 text-[#C9A66B] hover:text-white tracking-[0.15em] uppercase"
        >
          <span>Explore Portfolio</span>
          <span className="w-8 h-8 border border-[#C9A66B]/45 group-hover:border-[#C9A66B] group-hover:bg-[#C9A66B] group-hover:text-[#101B2D] group-hover:shadow-[0_6px_16px_-4px_rgba(201,166,107,0.45)] flex items-center justify-center transition-all duration-200">
            <ArrowDown className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5" />
          </span>
        </a>
      </motion.div>
    </section>
  );
};
