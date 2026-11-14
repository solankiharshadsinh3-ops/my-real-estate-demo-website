import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { GalleryPhoto } from '../types/realEstate';
import { ResilientImage } from './ResilientImage';

interface GallerySectionProps {
  photos: GalleryPhoto[];
}

const GALLERY_FILTERS: Array<'All' | GalleryPhoto['category']> = [
  'All',
  'Luxury Villas',
  'Modern Apartments',
  'Premium Interiors',
  'Swimming Pools',
  'Architecture',
  'Landscaped Gardens',
];

export const GallerySection: React.FC<GallerySectionProps> = ({ photos }) => {
  const [activeFilter, setActiveFilter] = useState<'All' | GalleryPhoto['category']>('All');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const visiblePhotos =
    activeFilter === 'All'
      ? photos
      : photos.filter((p) => p.category === activeFilter);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (lightboxIdx === null) return;
      if (e.key === 'Escape') setLightboxIdx(null);
      if (e.key === 'ArrowRight') {
        setLightboxIdx((prev) => (prev === null ? null : (prev + 1) % visiblePhotos.length));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIdx((prev) =>
          prev === null ? null : (prev - 1 + visiblePhotos.length) % visiblePhotos.length
        );
      }
    };
    if (lightboxIdx !== null) {
      window.addEventListener('keydown', onKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxIdx, visiblePhotos.length]);

  const currentPhoto = lightboxIdx !== null ? visiblePhotos[lightboxIdx] : null;

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-[#F7F6F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A66B] mb-3">
              Architectural Lookbook
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#101B2D] leading-tight">
              Luxury Property Gallery
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 bg-white p-1.5 border border-[#101B2D]/10">
            {GALLERY_FILTERS.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveFilter(cat);
                  setLightboxIdx(null);
                }}
                className={`btn-lux-tab px-3 py-2 min-h-[38px] text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-[#101B2D] text-[#C9A66B] shadow-sm'
                    : 'text-[#777E88] hover:text-[#101B2D] hover:bg-[#F7F6F2]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive CSS Columns Masonry Layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {visiblePhotos.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setLightboxIdx(index)}
              className="group relative w-full break-inside-avoid block overflow-hidden bg-[#101B2D] border border-[#101B2D]/10 hover:border-[#C9A66B]/60 focus-visible:outline-2 focus-visible:outline-[#C9A66B] active:scale-[0.99] transition-all duration-200 text-left cursor-pointer"
            >
              <div
                className={`relative w-full overflow-hidden bg-[#101B2D] ${
                  photo.aspect === 'tall'
                    ? 'aspect-[3/4]'
                    : photo.aspect === 'wide'
                    ? 'aspect-[16/10]'
                    : 'aspect-square'
                }`}
              >
                <ResilientImage
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#101B2D]/85 via-[#101B2D]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

              <div className="absolute top-4 right-4 w-9 h-9 bg-[#101B2D]/80 text-[#C9A66B] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Expand className="w-4 h-4" />
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] uppercase tracking-[0.14em] text-[#C9A66B] block mb-0.5">
                  {photo.category} · {photo.location}
                </span>
                <h3 className="font-serif text-xl font-semibold">{photo.title}</h3>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      {currentPhoto && lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-[#101B2D]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={currentPhoto.title}
        >
          <button
            type="button"
            onClick={() => setLightboxIdx(null)}
            aria-label="Close gallery lightbox"
            className="btn-lux-icon absolute top-5 right-5 w-11 h-11 bg-white/10 border border-white/20 hover:border-[#C9A66B] hover:bg-[#C9A66B] hover:text-[#101B2D] text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() =>
              setLightboxIdx(
                (lightboxIdx - 1 + visiblePhotos.length) % visiblePhotos.length
              )
            }
            aria-label="Previous image"
            className="btn-lux-positioned hidden sm:flex absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 bg-[#101B2D]/80 border border-[#C9A66B]/40 text-white hover:bg-[#C9A66B] hover:text-[#101B2D] items-center justify-center cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="max-w-5xl w-full flex flex-col items-center">
            <div className="relative w-full max-h-[70vh] sm:max-h-[75vh] aspect-[4/3] sm:aspect-[16/10] bg-[#101B2D] overflow-hidden border border-[#C9A66B]/30">
              <ResilientImage
                src={currentPhoto.image}
                alt={currentPhoto.title}
                className="w-full h-full object-contain"
                eager
              />
            </div>
            <div className="w-full flex flex-wrap items-center justify-between gap-4 mt-4 text-white">
              <div>
                <span className="text-xs uppercase tracking-[0.14em] text-[#C9A66B] block">
                  {currentPhoto.category} · {currentPhoto.location}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold">{currentPhoto.title}</h3>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIdx(
                      (lightboxIdx - 1 + visiblePhotos.length) % visiblePhotos.length
                    )
                  }
                  aria-label="Previous photo"
                  className="btn-lux-icon sm:hidden w-11 h-11 bg-[#182A43] border border-[#C9A66B]/40 text-white flex items-center justify-center cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-xs text-white/70 tabular-nums">
                  {lightboxIdx + 1} / {visiblePhotos.length}
                </span>
                <button
                  type="button"
                  onClick={() => setLightboxIdx((lightboxIdx + 1) % visiblePhotos.length)}
                  aria-label="Next photo"
                  className="btn-lux-icon sm:hidden w-11 h-11 bg-[#182A43] border border-[#C9A66B]/40 text-white flex items-center justify-center cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setLightboxIdx((lightboxIdx + 1) % visiblePhotos.length)}
            aria-label="Next image"
            className="btn-lux-positioned hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 bg-[#101B2D]/80 border border-[#C9A66B]/40 text-white hover:bg-[#C9A66B] hover:text-[#101B2D] items-center justify-center cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </section>
  );
};
