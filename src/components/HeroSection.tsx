import React, { useEffect, useState } from 'react';
import { ArrowDown, Search } from 'lucide-react';
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

export const HeroSection: React.FC<HeroSectionProps> = ({ onHeroSearch }) => {
  const [transaction, setTransaction] = useState<'All' | ListingTransaction>('Buy');
  const [category, setCategory] = useState<'All' | PropertyCategory>('All');
  const [location, setLocation] = useState('');
  const [minPriceLakhs, setMinPriceLakhs] = useState('');
  const [maxPriceLakhs, setMaxPriceLakhs] = useState('');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(Math.min(window.scrollY, 600));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#101B2D] pt-28 pb-12 sm:pt-36 sm:pb-16"
    >
      {/* Background Cinematic Image with Slow Zoom + Subtle Parallax */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ transform: `translate3d(0, ${scrollY * 0.16}px, 0)` }}
      >
        <img
          src={HERO_IMAGE}
          alt="ELITE ESTATES twilight architectural villa with infinity pool"
          loading="eager"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover animate-slow-zoom opacity-80"
        />
        {/* Measured Luxury Scrims for High Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#101B2D]/80 via-[#101B2D]/45 to-[#101B2D]/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#101B2D]/70 via-transparent to-[#101B2D]/45" />
      </div>

      {/* Subtle Floating Architectural Gold Framing & Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="hidden lg:block absolute top-28 right-12 w-40 h-40 border border-[#C9A66B]/20 animate-float-gentle" />
        <div
          className="hidden lg:block absolute top-36 right-20 w-24 h-24 border border-[#C9A66B]/30 animate-float-gentle"
          style={{ animationDelay: '1.8s' }}
        />
        <span className="absolute top-1/3 left-[12%] w-1.5 h-1.5 bg-[#C9A66B]/60 rotate-45 animate-gold-particle" />
        <span
          className="absolute top-[42%] right-[22%] w-1 h-1 bg-[#C9A66B]/70 rotate-45 animate-gold-particle"
          style={{ animationDelay: '1.4s' }}
        />
        <span
          className="absolute bottom-1/3 left-[30%] w-1.5 h-1.5 bg-[#C9A66B]/50 rotate-45 animate-gold-particle"
          style={{ animationDelay: '2.7s' }}
        />
      </div>

      {/* Main Centered Editorial Content */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 my-auto pt-4 sm:pt-8">
        <div className="max-w-4xl">
          <p className="text-xs sm:text-sm font-medium tracking-[0.22em] uppercase text-[#C9A66B] mb-5">
            Ahmedabad · Gandhinagar · Mumbai · Luxury Advisory
          </p>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-semibold tracking-[0.02em] leading-[1.06] text-white mb-6">
            FIND YOUR PLACE IN THE WORLD
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed font-normal mb-10">
            Discover exceptional properties, extraordinary architecture, and spaces designed around your lifestyle.
          </p>
        </div>

        {/* Hero Glassmorphism Property Search Interface */}
        <form
          onSubmit={handleSubmit}
          className="w-full bg-[#101B2D]/80 backdrop-blur-xl border border-[#C9A66B]/35 p-4 sm:p-6 shadow-2xl"
        >
          {/* Top Segmented Control: Buy / Rent / All */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-5 border-b border-white/10">
            <div className="inline-flex bg-[#182A43] p-1 border border-white/10">
              {(['Buy', 'Rent', 'All'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => {
                    setTransaction(mode);
                    setMinPriceLakhs('');
                    setMaxPriceLakhs('');
                  }}
                  className={`px-5 py-2 text-xs font-semibold tracking-[0.08em] uppercase transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    transaction === mode
                      ? 'bg-[#C9A66B] text-[#101B2D]'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {mode === 'All' ? 'All Listings' : mode}
                </button>
              ))}
            </div>
            <span className="text-xs text-white/65 tracking-wide">
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
                className="w-full h-11 px-3.5 bg-[#182A43]/90 border border-white/15 text-sm text-white focus:outline-none focus:border-[#C9A66B]"
              >
                <option value="">All Prime Locations</option>
                <option value="Ahmedabad">Ahmedabad (All Corridors)</option>
                <option value="Sindhu Bhavan">Sindhu Bhavan Road</option>
                <option value="Ambli-Bopal">Ambli-Bopal Road</option>
                <option value="Gandhinagar">Gandhinagar & GIFT City</option>
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
                className="w-full h-11 px-3.5 bg-[#182A43]/90 border border-white/15 text-sm text-white focus:outline-none focus:border-[#C9A66B]"
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
                className="w-full h-11 px-3.5 bg-[#182A43]/90 border border-white/15 text-sm text-white tabular-nums focus:outline-none focus:border-[#C9A66B]"
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
                className="w-full h-11 px-3.5 bg-[#182A43]/90 border border-white/15 text-sm text-white tabular-nums focus:outline-none focus:border-[#C9A66B]"
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
              className="w-full h-11 px-6 bg-[#C9A66B] hover:bg-[#DFC391] text-[#101B2D] font-semibold text-xs tracking-[0.1em] uppercase inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Search Properties</span>
            </button>
          </div>
        </form>
      </div>

      {/* Animated Scroll Indicator */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex items-center justify-between text-xs text-white/70">
        <span className="hidden sm:inline tracking-[0.14em] uppercase">
          Discover Spaces. Experience Excellence.
        </span>
        <a
          href="#properties"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="mx-auto sm:mx-0 inline-flex items-center gap-2.5 text-[#C9A66B] hover:text-white transition-colors tracking-[0.15em] uppercase"
        >
          <span>Explore Portfolio</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
