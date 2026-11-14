import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Heart, Menu, X } from 'lucide-react';
import { BrandMark } from './BrandMark';
import { ListingTransaction, PropertyCategory } from '../types/realEstate';

interface HeaderProps {
  wishlistCount: number;
  onOpenWishlist: () => void;
  onQuickFilter: (opts: { transaction?: 'All' | ListingTransaction; category?: 'All' | PropertyCategory }) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  wishlistCount,
  onOpenWishlist,
  onQuickFilter,
  onNavigateSection,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLinkClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    onNavigateSection(sectionId);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#101B2D]/95 backdrop-blur-md border-b border-[#C9A66B]/25 py-3 shadow-lg shadow-[#101B2D]/15'
            : 'bg-gradient-to-b from-[#101B2D]/80 via-[#101B2D]/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('hero');
            }}
            className="focus-visible:outline-2 focus-visible:outline-[#C9A66B] rounded-sm"
            aria-label="ELITE ESTATES Home"
          >
            <BrandMark light />
          </a>

          {/* Zone 2: Primary Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center gap-7 text-[13px] font-medium tracking-[0.06em] text-white/90"
            aria-label="Primary Navigation"
          >
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('hero');
              }}
              className="relative py-1 hover:text-[#C9A66B] transition-colors whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-[#C9A66B] hover:after:w-full after:transition-all after:duration-200"
            >
              Home
            </a>

            {/* Properties Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setDropdownOpen((v) => !v)}
                aria-expanded={dropdownOpen}
                className="inline-flex items-center gap-1 py-1 hover:text-[#C9A66B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Properties</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    dropdownOpen ? 'rotate-180 text-[#C9A66B]' : ''
                  }`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute left-0 top-full pt-3 w-64">
                  <div className="bg-[#101B2D] border border-[#C9A66B]/30 shadow-2xl py-2 text-sm text-white/90">
                    <button
                      type="button"
                      onClick={() => {
                        setDropdownOpen(false);
                        onQuickFilter({ transaction: 'All', category: 'All' });
                      }}
                      className="w-full text-left px-5 py-2.5 hover:bg-[#182A43] hover:text-[#C9A66B] transition-colors flex items-center justify-between"
                    >
                      <span>All Curated Properties</span>
                      <span className="text-[11px] text-[#C9A66B]">13</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDropdownOpen(false);
                        onQuickFilter({ transaction: 'Buy', category: 'All' });
                      }}
                      className="w-full text-left px-5 py-2.5 hover:bg-[#182A43] hover:text-[#C9A66B] transition-colors"
                    >
                      Buy Luxury Residences
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDropdownOpen(false);
                        onQuickFilter({ transaction: 'Rent', category: 'All' });
                      }}
                      className="w-full text-left px-5 py-2.5 hover:bg-[#182A43] hover:text-[#C9A66B] transition-colors"
                    >
                      Rent Executive Estates
                    </button>
                    <div className="my-1 border-t border-white/10" />
                    <button
                      type="button"
                      onClick={() => {
                        setDropdownOpen(false);
                        onQuickFilter({ transaction: 'All', category: 'Luxury Villas' });
                      }}
                      className="w-full text-left px-5 py-2 hover:bg-[#182A43] hover:text-[#C9A66B] transition-colors text-white/75"
                    >
                      Luxury Villas
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDropdownOpen(false);
                        onQuickFilter({ transaction: 'All', category: 'Penthouses' });
                      }}
                      className="w-full text-left px-5 py-2 hover:bg-[#182A43] hover:text-[#C9A66B] transition-colors text-white/75"
                    >
                      Signature Penthouses
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDropdownOpen(false);
                        onQuickFilter({ transaction: 'All', category: 'Commercial Spaces' });
                      }}
                      className="w-full text-left px-5 py-2 hover:bg-[#182A43] hover:text-[#C9A66B] transition-colors text-white/75"
                    >
                      Commercial Towers
                    </button>
                  </div>
                </div>
              )}
            </div>

            <a
              href="#properties"
              onClick={(e) => {
                e.preventDefault();
                onQuickFilter({ transaction: 'Buy', category: 'All' });
              }}
              className="relative py-1 hover:text-[#C9A66B] transition-colors whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-[#C9A66B] hover:after:w-full after:transition-all after:duration-200"
            >
              Buy
            </a>
            <a
              href="#properties"
              onClick={(e) => {
                e.preventDefault();
                onQuickFilter({ transaction: 'Rent', category: 'All' });
              }}
              className="relative py-1 hover:text-[#C9A66B] transition-colors whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-[#C9A66B] hover:after:w-full after:transition-all after:duration-200"
            >
              Rent
            </a>
            <a
              href="#properties"
              onClick={(e) => {
                e.preventDefault();
                onQuickFilter({ transaction: 'All', category: 'Commercial Spaces' });
              }}
              className="relative py-1 hover:text-[#C9A66B] transition-colors whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-[#C9A66B] hover:after:w-full after:transition-all after:duration-200"
            >
              Commercial
            </a>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('projects');
              }}
              className="relative py-1 hover:text-[#C9A66B] transition-colors whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-[#C9A66B] hover:after:w-full after:transition-all after:duration-200"
            >
              Projects
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('about');
              }}
              className="relative py-1 hover:text-[#C9A66B] transition-colors whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-[#C9A66B] hover:after:w-full after:transition-all after:duration-200"
            >
              About Us
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('contact');
              }}
              className="relative py-1 hover:text-[#C9A66B] transition-colors whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-[#C9A66B] hover:after:w-full after:transition-all after:duration-200"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: Wishlist & Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenWishlist}
              aria-label={`Open saved properties (${wishlistCount})`}
              className="relative inline-flex items-center justify-center w-10 h-10 text-white/90 hover:text-[#C9A66B] border border-white/20 hover:border-[#C9A66B]/60 transition-colors cursor-pointer"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 bg-[#C9A66B] text-[#101B2D] text-[10px] font-bold flex items-center justify-center tabular-nums">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleLinkClick('list-property')}
              className="hidden sm:inline-flex items-center px-5 py-2.5 text-xs font-semibold tracking-[0.08em] uppercase bg-[#C9A66B] text-[#101B2D] hover:bg-[#DFC391] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              List Your Property
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile menu"
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 text-white border border-white/25 hover:border-[#C9A66B] transition-colors cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          <div
            className="fixed inset-0 bg-[#101B2D]/75 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-10 w-80 max-w-[85vw] h-full bg-[#101B2D] text-white border-l border-[#C9A66B]/30 flex flex-col justify-between p-6 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <BrandMark light compact />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close mobile menu"
                  className="w-10 h-10 inline-flex items-center justify-center text-white/80 hover:text-[#C9A66B]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 flex flex-col gap-1">
                {[
                  { label: 'Home', action: () => handleLinkClick('hero') },
                  {
                    label: 'All Properties',
                    action: () => {
                      setMobileMenuOpen(false);
                      onQuickFilter({ transaction: 'All', category: 'All' });
                    },
                  },
                  {
                    label: 'Buy Residences',
                    action: () => {
                      setMobileMenuOpen(false);
                      onQuickFilter({ transaction: 'Buy', category: 'All' });
                    },
                  },
                  {
                    label: 'Rent Estates',
                    action: () => {
                      setMobileMenuOpen(false);
                      onQuickFilter({ transaction: 'Rent', category: 'All' });
                    },
                  },
                  {
                    label: 'Commercial',
                    action: () => {
                      setMobileMenuOpen(false);
                      onQuickFilter({ transaction: 'All', category: 'Commercial Spaces' });
                    },
                  },
                  { label: 'Exclusive Projects', action: () => handleLinkClick('projects') },
                  { label: 'Architectural Gallery', action: () => handleLinkClick('gallery') },
                  { label: 'Virtual Tour Demo', action: () => handleLinkClick('virtual-tour') },
                  { label: 'About Us', action: () => handleLinkClick('about') },
                  { label: 'Contact & Office', action: () => handleLinkClick('contact') },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={item.action}
                    className="w-full text-left py-3 px-2 text-base font-medium text-white/90 hover:text-[#C9A66B] border-b border-white/5 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 space-y-3">
              <button
                type="button"
                onClick={() => handleLinkClick('list-property')}
                className="w-full py-3.5 px-5 bg-[#C9A66B] text-[#101B2D] text-xs font-semibold tracking-[0.1em] uppercase hover:bg-[#DFC391] transition-colors"
              >
                List Your Property
              </button>
              <p className="text-[11px] text-[#777E88] text-center">
                Ahmedabad · Gandhinagar · Mumbai
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
