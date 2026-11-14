import React, { useEffect, useState } from 'react';
import {
  Bath,
  BedDouble,
  Calendar,
  Check,
  Compass,
  Heart,
  MapPin,
  Maximize2,
  MessageCircle,
  Send,
  X,
} from 'lucide-react';
import { Property } from '../types/realEstate';
import { ResilientImage } from './ResilientImage';

interface PropertyDetailModalProps {
  property: Property | null;
  allProperties: Property[];
  isSaved: boolean;
  onToggleWishlist: (id: string) => void;
  onClose: () => void;
  onSelectSimilar: (property: Property) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  allProperties,
  isSaved,
  onToggleWishlist,
  onClose,
  onSelectSimilar,
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [floorLevel, setFloorLevel] = useState<'Ground' | 'Upper'>('Ground');
  const [enquiryMode, setEnquiryMode] = useState<'visit' | 'info'>('visit');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (property) {
      setActiveImageIdx(0);
      setFloorLevel('Ground');
      setSubmitted(false);
      setFormError('');
      setMessage(
        `I would like to schedule a private viewing for ${property.title} (${property.location}).`
      );
    }
  }, [property]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (property) {
      window.addEventListener('keydown', onKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [property, onClose]);

  if (!property) return null;

  const similarProperties = allProperties
    .filter((p) => p.id !== property.id && (p.category === property.category || p.city === property.city))
    .slice(0, 3);

  const visibleRooms = property.floorPlanRooms.filter((r) => r.level === floorLevel);
  const roomsToDraw = visibleRooms.length > 0 ? visibleRooms : property.floorPlanRooms;

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!fullName.trim() || fullName.trim().length < 2) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError('Please provide a valid email address.');
      return;
    }
    if (!/^[+\d\s()-]{8,}$/.test(phone)) {
      setFormError('Please provide a valid contact phone number.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#101B2D]/85 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={`${property.title} property details`}
    >
      <div className="min-h-screen py-4 sm:py-8 px-3 sm:px-6 flex justify-center items-start">
        <div className="relative w-full max-w-6xl bg-[#F7F6F2] text-[#20252C] shadow-2xl border border-[#C9A66B]/40 overflow-hidden">
          {/* Top Bar */}
          <div className="sticky top-0 z-20 bg-[#101B2D] text-white px-5 sm:px-8 py-4 flex items-center justify-between gap-4 border-b border-[#C9A66B]/30">
            <div className="min-w-0">
              <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#C9A66B] truncate">
                {property.category} · For {property.transaction === 'Buy' ? 'Sale' : 'Lease'}
              </p>
              <h2 className="font-serif text-xl sm:text-2xl font-semibold truncate">
                {property.title}
              </h2>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="hidden sm:inline font-serif text-2xl font-semibold text-[#C9A66B] tabular-nums">
                {property.priceDisplay}
              </span>
              <button
                type="button"
                onClick={() => onToggleWishlist(property.id)}
                className={`px-3.5 py-2 text-xs font-semibold tracking-wider uppercase inline-flex items-center gap-1.5 border transition-colors cursor-pointer ${
                  isSaved
                    ? 'bg-[#C9A66B] text-[#101B2D] border-[#C9A66B]'
                    : 'border-white/25 text-white hover:border-[#C9A66B]'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                <span className="hidden md:inline">{isSaved ? 'Saved' : 'Save'}</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close property details"
                className="w-10 h-10 inline-flex items-center justify-center bg-white/10 hover:bg-[#C9A66B] hover:text-[#101B2D] text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Content Body */}
          <div className="p-5 sm:p-8 lg:p-10 space-y-10">
            {/* Large Property Gallery */}
            <div className="space-y-3">
              <div className="relative aspect-[16/9] max-h-[520px] w-full overflow-hidden bg-[#101B2D]">
                <ResilientImage
                  src={property.galleryImages[activeImageIdx] || property.primaryImage}
                  alt={`${property.title} view ${activeImageIdx + 1}`}
                  className="w-full h-full object-cover"
                  eager
                />
                <div className="absolute bottom-4 left-4 bg-[#101B2D]/85 backdrop-blur-md px-4 py-2 border border-[#C9A66B]/30 text-white text-xs">
                  {property.architecturalHighlight}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {property.galleryImages.map((img, idx) => (
                  <button
                    key={`${property.id}-gal-${idx}`}
                    type="button"
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative aspect-[4/3] overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImageIdx === idx
                        ? 'border-[#C9A66B] opacity-100'
                        : 'border-transparent opacity-65 hover:opacity-100'
                    }`}
                  >
                    <ResilientImage
                      src={img}
                      alt={`${property.title} thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Split Layout: Property Narrative + Enquiry Form */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Left 7 Columns: Specs, Narrative, Features, Floor Plan, Map */}
              <div className="lg:col-span-7 space-y-8">
                {/* Headline & Key Overview */}
                <div className="bg-white border border-[#101B2D]/10 p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-[#101B2D]/10">
                    <div>
                      <p className="inline-flex items-center gap-1.5 text-sm text-[#777E88] mb-1">
                        <MapPin className="w-4 h-4 text-[#C9A66B]" />
                        <span>{property.location}</span>
                      </p>
                      <h3 className="font-serif text-3xl font-semibold text-[#101B2D]">
                        {property.title}
                      </h3>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="block text-[11px] uppercase tracking-[0.14em] text-[#777E88]">
                        Guide Price
                      </span>
                      <span className="font-serif text-3xl font-semibold text-[#101B2D] tabular-nums">
                        {property.priceDisplay}
                      </span>
                    </div>
                  </div>

                  {/* Overview Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5 tabular-nums">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#777E88] block">
                        Bedrooms
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-base font-semibold text-[#101B2D] mt-0.5">
                        <BedDouble className="w-4 h-4 text-[#C9A66B]" />
                        {property.bedrooms > 0 ? property.bedrooms : 'N/A'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#777E88] block">
                        Bathrooms
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-base font-semibold text-[#101B2D] mt-0.5">
                        <Bath className="w-4 h-4 text-[#C9A66B]" />
                        {property.bathrooms > 0 ? property.bathrooms : 'N/A'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#777E88] block">
                        Total Area
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-base font-semibold text-[#101B2D] mt-0.5">
                        <Maximize2 className="w-4 h-4 text-[#C9A66B]" />
                        {property.areaSqFt.toLocaleString('en-IN')} Sq.Ft.
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#777E88] block">
                        Orientation
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-base font-semibold text-[#101B2D] mt-0.5">
                        <Compass className="w-4 h-4 text-[#C9A66B]" />
                        {property.facing}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Architectural Description */}
                <div className="bg-white border border-[#101B2D]/10 p-6 space-y-4">
                  <h4 className="font-serif text-2xl font-semibold text-[#101B2D]">
                    Architectural Narrative
                  </h4>
                  <p className="text-sm sm:text-base text-[#20252C]/85 leading-relaxed">
                    {property.description}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-3 border-t border-[#101B2D]/10 text-xs">
                    <div>
                      <span className="text-[#777E88] block">Furnishing</span>
                      <span className="font-semibold text-[#101B2D]">{property.furnishing}</span>
                    </div>
                    <div>
                      <span className="text-[#777E88] block">Completion Year</span>
                      <span className="font-semibold text-[#101B2D] tabular-nums">{property.yearBuilt}</span>
                    </div>
                    <div>
                      <span className="text-[#777E88] block">Reserved Parking</span>
                      <span className="font-semibold text-[#101B2D] tabular-nums">
                        {property.parkingSpaces} Covered Bays
                      </span>
                    </div>
                  </div>
                </div>

                {/* Features & Amenities */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-white border border-[#101B2D]/10 p-6">
                    <h4 className="font-serif text-xl font-semibold text-[#101B2D] mb-4">
                      Property Features
                    </h4>
                    <ul className="space-y-2.5 text-sm text-[#20252C]/85">
                      {property.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-[#C9A66B] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white border border-[#101B2D]/10 p-6">
                    <h4 className="font-serif text-xl font-semibold text-[#101B2D] mb-4">
                      Estate Amenities
                    </h4>
                    <ul className="space-y-2.5 text-sm text-[#20252C]/85">
                      {property.amenities.map((amen) => (
                        <li key={amen} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-[#C9A66B] shrink-0 mt-0.5" />
                          <span>{amen}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Interactive Floor Plan Preview */}
                <div className="bg-white border border-[#101B2D]/10 p-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                    <div>
                      <h4 className="font-serif text-2xl font-semibold text-[#101B2D]">
                        Architectural Floor Plan Preview
                      </h4>
                      <p className="text-xs text-[#777E88]">
                        Schematic room layout (demonstration blueprint)
                      </p>
                    </div>
                    <div className="inline-flex border border-[#101B2D]/15 bg-[#F7F6F2] p-0.5">
                      {(['Ground', 'Upper'] as const).map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setFloorLevel(lvl)}
                          className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                            floorLevel === lvl
                              ? 'bg-[#101B2D] text-[#C9A66B]'
                              : 'text-[#777E88] hover:text-[#101B2D]'
                          }`}
                        >
                          {lvl} Level
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#101B2D] p-5 border border-[#C9A66B]/30">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {roomsToDraw.map((room, i) => (
                        <div
                          key={`${room.name}-${i}`}
                          className="border border-[#C9A66B]/40 bg-[#182A43]/70 p-4 flex flex-col justify-between min-h-[88px]"
                        >
                          <div className="flex items-center justify-between text-[11px] text-[#C9A66B] uppercase tracking-wider mb-1">
                            <span>Zone 0{i + 1}</span>
                            <span>{room.level}</span>
                          </div>
                          <div className="font-serif text-lg text-white font-medium">{room.name}</div>
                          <div className="text-xs text-white/70 tabular-nums mt-1">
                            Dimensions: {room.dimensions}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Location Map Preview */}
                <div className="bg-white border border-[#101B2D]/10 p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div>
                      <h4 className="font-serif text-2xl font-semibold text-[#101B2D]">
                        Location Map Preview
                      </h4>
                      <p className="text-xs text-[#777E88]">{property.mapCoordinates.landmark}</p>
                    </div>
                    <span className="text-xs font-medium text-[#101B2D] tabular-nums">
                      {property.mapCoordinates.latLabel} · {property.mapCoordinates.lngLabel}
                    </span>
                  </div>

                  <div className="relative h-56 w-full bg-[#101B2D] overflow-hidden border border-[#101B2D]/20">
                    {/* Architectural Street Grid Vector */}
                    <svg
                      viewBox="0 0 600 260"
                      className="w-full h-full opacity-55"
                      aria-hidden="true"
                    >
                      <defs>
                        <pattern id="grid-map" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path
                            d="M 40 0 L 0 0 0 40"
                            fill="none"
                            stroke="#C9A66B"
                            strokeOpacity="0.22"
                            strokeWidth="0.7"
                          />
                        </pattern>
                      </defs>
                      <rect width="600" height="260" fill="url(#grid-map)" />
                      <path d="M0 95 Q 240 120 600 72" stroke="#C9A66B" strokeOpacity="0.45" strokeWidth="2.5" fill="none" />
                      <path d="M120 0 L 180 260" stroke="#FFFFFF" strokeOpacity="0.18" strokeWidth="2" />
                      <path d="M380 0 L 350 260" stroke="#FFFFFF" strokeOpacity="0.18" strokeWidth="1.5" />
                      <path d="M0 190 L 600 205" stroke="#FFFFFF" strokeOpacity="0.15" strokeWidth="1.5" />
                    </svg>

                    {/* Pin Marker */}
                    <div
                      className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                      style={{
                        left: `${property.mapCoordinates.pinX}%`,
                        top: `${property.mapCoordinates.pinY}%`,
                      }}
                    >
                      <div className="px-3 py-1 bg-[#C9A66B] text-[#101B2D] text-[11px] font-semibold tracking-wider uppercase shadow-lg whitespace-nowrap mb-1.5">
                        {property.title}
                      </div>
                      <div className="w-4 h-4 bg-[#C9A66B] border-2 border-white rotate-45 shadow-md" />
                    </div>

                    <div className="absolute bottom-3 left-3 bg-[#101B2D]/90 px-3 py-1.5 text-[11px] text-white/80 border border-white/15">
                      District: {property.mapCoordinates.district} (Illustrative Map Preview)
                    </div>
                  </div>
                </div>
              </div>

              {/* Right 5 Columns: Sticky Enquiry Card */}
              <div className="lg:col-span-5 lg:sticky lg:top-24">
                <div className="bg-[#101B2D] text-white p-6 sm:p-8 border border-[#C9A66B]/40 shadow-xl">
                  <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#C9A66B] mb-2">
                    Private Advisory Desk
                  </p>
                  <h4 className="font-serif text-2xl sm:text-3xl font-semibold mb-4">
                    Inquire About This Residence
                  </h4>

                  {/* Segmented Action Mode */}
                  <div className="grid grid-cols-2 gap-2 p-1 bg-[#182A43] mb-6">
                    <button
                      type="button"
                      onClick={() => {
                        setEnquiryMode('visit');
                        setMessage(
                          `I would like to schedule a private viewing for ${property.title} (${property.location}).`
                        );
                      }}
                      className={`py-2 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5 ${
                        enquiryMode === 'visit'
                          ? 'bg-[#C9A66B] text-[#101B2D]'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Schedule a Visit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEnquiryMode('info');
                        setMessage(
                          `Please share the brochure, floor plans, and pricing schedule for ${property.title}.`
                        );
                      }}
                      className={`py-2 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                        enquiryMode === 'info'
                          ? 'bg-[#C9A66B] text-[#101B2D]'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      Request Info
                    </button>
                  </div>

                  {submitted ? (
                    <div className="bg-[#182A43] border border-[#C9A66B]/40 p-6 text-center space-y-3">
                      <div className="w-10 h-10 mx-auto bg-[#C9A66B] text-[#101B2D] flex items-center justify-center">
                        <Check className="w-5 h-5" />
                      </div>
                      <h5 className="font-serif text-xl font-semibold text-white">
                        Demo Inquiry Recorded
                      </h5>
                      <p className="text-xs text-white/80 leading-relaxed">
                        Thank you, {fullName}. This is a frontend demonstration preview—no external message was transmitted.
                      </p>
                      <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="text-xs font-semibold text-[#C9A66B] underline cursor-pointer"
                      >
                        Send Another Inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleEnquirySubmit} className="space-y-4">
                      {formError && (
                        <div className="p-3 bg-red-950/60 border border-red-400/50 text-xs text-red-200">
                          {formError}
                        </div>
                      )}

                      <div>
                        <label htmlFor="prop-inq-name" className="block text-[11px] uppercase tracking-wider text-white/75 mb-1.5">
                          Full Name
                        </label>
                        <input
                          id="prop-inq-name"
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Enter your full name"
                          className="w-full h-11 px-3.5 bg-[#182A43] border border-white/15 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#C9A66B]"
                        />
                      </div>

                      <div>
                        <label htmlFor="prop-inq-email" className="block text-[11px] uppercase tracking-wider text-white/75 mb-1.5">
                          Email Address
                        </label>
                        <input
                          id="prop-inq-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@company.com"
                          className="w-full h-11 px-3.5 bg-[#182A43] border border-white/15 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#C9A66B]"
                        />
                      </div>

                      <div>
                        <label htmlFor="prop-inq-phone" className="block text-[11px] uppercase tracking-wider text-white/75 mb-1.5">
                          Phone Number
                        </label>
                        <input
                          id="prop-inq-phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full h-11 px-3.5 bg-[#182A43] border border-white/15 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#C9A66B]"
                        />
                      </div>

                      <div>
                        <label htmlFor="prop-inq-msg" className="block text-[11px] uppercase tracking-wider text-white/75 mb-1.5">
                          Message
                        </label>
                        <textarea
                          id="prop-inq-msg"
                          rows={3}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full p-3.5 bg-[#182A43] border border-white/15 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#C9A66B]"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 px-5 bg-[#C9A66B] hover:bg-[#DFC391] text-[#101B2D] text-xs font-semibold tracking-[0.12em] uppercase inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>
                          {enquiryMode === 'visit' ? 'Schedule Private Visit' : 'Request More Information'}
                        </span>
                      </button>
                    </form>
                  )}

                  <div className="mt-5 pt-5 border-t border-white/10">
                    <a
                      href={`https://wa.me/919876543210?text=${encodeURIComponent(
                        `Hello ELITE ESTATES, I am inquiring about ${property.title} (${property.priceDisplay}).`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 border border-[#C9A66B]/60 text-[#C9A66B] hover:bg-[#C9A66B] hover:text-[#101B2D] text-xs font-semibold tracking-[0.1em] uppercase inline-flex items-center justify-center gap-2 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp Inquiry</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Similar Properties */}
            {similarProperties.length > 0 && (
              <div className="pt-8 border-t border-[#101B2D]/10">
                <h4 className="font-serif text-2xl sm:text-3xl font-semibold text-[#101B2D] mb-6">
                  Similar Curated Properties
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {similarProperties.map((sim) => (
                    <button
                      key={sim.id}
                      type="button"
                      onClick={() => onSelectSimilar(sim)}
                      className="group text-left bg-white border border-[#101B2D]/10 hover:border-[#C9A66B] transition-colors overflow-hidden cursor-pointer"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-[#101B2D]">
                        <ResilientImage
                          src={sim.primaryImage}
                          alt={sim.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#101B2D]/70 via-transparent to-transparent" />
                        <span className="absolute bottom-3 left-3 font-serif text-xl font-semibold text-white tabular-nums">
                          {sim.priceDisplay}
                        </span>
                      </div>
                      <div className="p-4">
                        <span className="text-[11px] uppercase tracking-wider text-[#C9A66B] block mb-1">
                          {sim.category}
                        </span>
                        <h5 className="font-serif text-xl font-semibold text-[#101B2D] group-hover:text-[#182A43]">
                          {sim.title}
                        </h5>
                        <p className="text-xs text-[#777E88] mt-1">{sim.location}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
