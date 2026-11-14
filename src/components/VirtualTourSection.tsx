import React, { useEffect, useState } from 'react';
import {
  Compass,
  Eye,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { VirtualTourProperty } from '../types/realEstate';
import { ResilientImage } from './ResilientImage';

interface VirtualTourSectionProps {
  stops: VirtualTourProperty[];
}

export const VirtualTourSection: React.FC<VirtualTourSectionProps> = ({ stops }) => {
  const [activeStopIdx, setActiveStopIdx] = useState(0);
  const [activeViewKey, setActiveViewKey] = useState<'exterior' | 'interior' | 'grounds'>('exterior');
  const [activeHotspotIdx, setActiveHotspotIdx] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentStop = stops[activeStopIdx] || stops[0];
  const currentView =
    currentStop.views.find((v) => v.key === activeViewKey) || currentStop.views[0];
  const currentHotspot = currentView.hotspots[activeHotspotIdx] || currentView.hotspots[0];

  useEffect(() => {
    setActiveHotspotIdx(0);
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  }, [activeStopIdx, activeViewKey]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) setIsFullscreen(false);
    };
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    }
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      if (isFullscreen) document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  const handleViewportMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (zoomLevel <= 1 || !window.matchMedia('(pointer: fine)').matches) {
      if (panOffset.x !== 0 || panOffset.y !== 0) {
        setPanOffset({ x: 0, y: 0 });
      }
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * -18;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setPanOffset({ x: nx, y: ny });
  };

  return (
    <section id="virtual-tour" className="py-20 sm:py-28 bg-luxury-navy-animated text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A66B] mb-3">
              Interactive Visual Preview (Demo Simulation)
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight">
              Virtual Property Tour
            </h2>
          </div>
          <p className="text-sm text-white/75 max-w-md leading-relaxed">
            Inspect exterior facades, living suites, and landscaped grounds using our simulated walkthrough viewer. (Visual demonstration using curated photography rather than a live 3D scan.)
          </p>
        </div>

        {/* Property Tour Selector Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {stops.map((stop, idx) => (
              <button
                key={stop.id}
                type="button"
                onClick={() => setActiveStopIdx(idx)}
                className={`btn-lux-tab px-3.5 sm:px-4 py-2.5 min-h-[44px] text-xs font-semibold tracking-[0.08em] uppercase border cursor-pointer ${
                  activeStopIdx === idx
                    ? 'bg-[#C9A66B] text-[#101B2D] border-[#C9A66B] shadow-md'
                    : 'bg-[#182A43] text-white/85 border-white/15 hover:border-[#C9A66B]/70 hover:text-white'
                }`}
              >
                {stop.title}
              </button>
            ))}
          </div>

          <div className="inline-flex items-center gap-2 text-xs text-white/75">
            <Compass className="w-4 h-4 text-[#C9A66B] shrink-0" />
            <span>
              {currentStop.location} · <strong className="text-[#C9A66B] tabular-nums">{currentStop.priceDisplay}</strong>
            </span>
          </div>
        </div>

        {/* Interactive Tour Stage */}
        <div
          className={`${
            isFullscreen
              ? 'fixed inset-0 z-50 bg-[#101B2D] p-3 sm:p-8 flex flex-col justify-between overflow-y-auto'
              : 'relative bg-[#182A43] border border-[#C9A66B]/30 p-3 sm:p-5'
          }`}
        >
          {/* Top Controls Inside Stage */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="inline-flex flex-wrap bg-[#101B2D] p-1 border border-white/10">
              {currentStop.views.map((view) => (
                <button
                  key={view.key}
                  type="button"
                  onClick={() => setActiveViewKey(view.key)}
                  className={`btn-lux-tab px-3 sm:px-5 py-2 min-h-[40px] text-xs font-semibold tracking-wider uppercase cursor-pointer ${
                    currentView.key === view.key
                      ? 'bg-[#C9A66B] text-[#101B2D]'
                      : 'text-white/80 hover:text-white hover:bg-white/8'
                  }`}
                >
                  {view.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(1, Number((z - 0.2).toFixed(1))))}
                aria-label="Zoom out tour view"
                className="btn-lux-icon w-10 h-10 sm:w-9 sm:h-9 bg-[#101B2D] border border-white/15 hover:border-[#C9A66B]/70 text-white hover:text-[#C9A66B] flex items-center justify-center cursor-pointer"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs text-white/80 tabular-nums min-w-[44px] text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(1.6, Number((z + 0.2).toFixed(1))))}
                aria-label="Zoom in tour view"
                className="btn-lux-icon w-10 h-10 sm:w-9 sm:h-9 bg-[#101B2D] border border-white/15 hover:border-[#C9A66B]/70 text-white hover:text-[#C9A66B] flex items-center justify-center cursor-pointer"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsFullscreen((f) => !f)}
                className="btn-lux-outline px-3 sm:px-3.5 h-10 sm:h-9 border text-[#C9A66B] text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                {isFullscreen ? (
                  <>
                    <Minimize2 className="w-3.5 h-3.5" />
                    <span>Exit</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span className="sm:hidden">Expand</span>
                    <span className="hidden sm:inline">Fullscreen Preview</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Relative Container Pairing Image Viewport + Responsive Caption/Thumbnails */}
          <div className={`relative ${isFullscreen ? 'flex-1 min-h-0 flex flex-col' : ''}`}>
            {/* Main Interactive Image Viewport */}
            <div
              onMouseMove={handleViewportMouseMove}
              className={`relative w-full overflow-hidden bg-[#101B2D] border border-white/10 ${
                isFullscreen ? 'flex-1 min-h-[260px]' : 'aspect-[4/3] sm:aspect-[16/9] max-h-[540px]'
              }`}
            >
              <div
                className="w-full h-full transition-transform duration-300 ease-out"
                style={{
                  transform: `scale(${zoomLevel}) translate(${panOffset.x}%, ${panOffset.y}%)`,
                }}
              >
                <ResilientImage
                  src={currentView.image}
                  alt={`${currentStop.title} - ${currentView.label}`}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#101B2D]/75 via-transparent to-[#101B2D]/20 pointer-events-none" />

              {/* Interactive Architectural Hotspots */}
              {currentView.hotspots.map((spot, idx) => {
                const isSelected = activeHotspotIdx === idx;
                return (
                  <button
                    key={spot.title}
                    type="button"
                    onClick={() => setActiveHotspotIdx(idx)}
                    aria-label={`Inspect ${spot.title}`}
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    className={`btn-lux-positioned absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-9 sm:h-9 flex items-center justify-center cursor-pointer ${
                      isSelected
                        ? 'bg-[#C9A66B] text-[#101B2D] scale-110 shadow-xl'
                        : 'bg-[#101B2D]/85 text-[#C9A66B] border border-[#C9A66B] hover:bg-[#C9A66B] hover:text-[#101B2D]'
                    }`}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                );
              })}
            </div>

            {/* Camera Angle Caption & Active Hotspot Detail (Stacks Cleanly Below Image on Mobile, Overlays Bottom on Desktop) */}
            <div
              className={`mt-3 sm:mt-0 sm:absolute sm:bottom-4 sm:left-4 sm:right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:pointer-events-none ${
                isFullscreen ? 'pt-2 sm:pt-0' : ''
              }`}
            >
              <div className="bg-[#101B2D]/95 sm:bg-[#101B2D]/90 backdrop-blur-md border border-[#C9A66B]/30 px-4 py-3 sm:max-w-md pointer-events-auto">
                <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#C9A66B] block mb-0.5">
                  {currentView.cameraNote}
                </span>
                {currentHotspot && (
                  <>
                    <h3 className="font-serif text-lg font-semibold text-white">
                      {currentHotspot.title}
                    </h3>
                    <p className="text-xs text-white/80 leading-relaxed mt-0.5">
                      {currentHotspot.detail}
                    </p>
                  </>
                )}
              </div>

              {/* Quick Thumbnail Switcher */}
              <div className="flex items-center gap-2 pointer-events-auto">
                {currentStop.views.map((view, idx) => (
                  <button
                    key={`thumb-${view.key}`}
                    type="button"
                    onClick={() => setActiveViewKey(view.key)}
                    style={{ animationDelay: `${idx * 0.65}s` }}
                    aria-label={`Switch to ${view.label} view`}
                    className={`btn-lux-tab flex-1 sm:flex-none sm:w-16 h-12 sm:h-11 overflow-hidden border-2 cursor-pointer animate-float-image ${
                      currentView.key === view.key
                        ? 'border-[#C9A66B] opacity-100'
                        : 'border-white/25 opacity-75 hover:opacity-100 hover:border-[#C9A66B]/60'
                    }`}
                  >
                    <ResilientImage
                      src={view.image}
                      alt={view.label}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
