import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Bath,
  BedDouble,
  Heart,
  LayoutGrid,
  List,
  MapPin,
  Maximize2,
  RotateCcw,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
import {
  FurnishingStatus,
  ListingTransaction,
  Property,
  PropertyCategory,
  SearchFilters,
} from '../types/realEstate';
import { ResilientImage } from './ResilientImage';

interface PropertiesShowcaseProps {
  properties: Property[];
  filters: SearchFilters;
  onChangeFilters: (next: SearchFilters) => void;
  onResetFilters: () => void;
  wishlistIds: string[];
  onToggleWishlist: (id: string) => void;
  onSelectProperty: (property: Property) => void;
}

export const PropertiesShowcase: React.FC<PropertiesShowcaseProps> = ({
  properties,
  filters,
  onChangeFilters,
  onResetFilters,
  wishlistIds,
  onToggleWishlist,
  onSelectProperty,
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const filteredProperties = useMemo(() => {
    const minP = filters.minPriceLakhs ? Number(filters.minPriceLakhs) : null;
    const maxP = filters.maxPriceLakhs ? Number(filters.maxPriceLakhs) : null;
    const minBeds = filters.bedrooms ? Number(filters.bedrooms) : null;
    const minBaths = filters.bathrooms ? Number(filters.bathrooms) : null;
    const minArea = filters.minAreaSqFt ? Number(filters.minAreaSqFt) : null;
    const q = filters.searchQuery.trim().toLowerCase();
    const loc = filters.location.trim().toLowerCase();

    const matched = properties.filter((p) => {
      if (filters.transaction !== 'All' && p.transaction !== filters.transaction) return false;
      if (filters.category !== 'All' && p.category !== filters.category) return false;
      if (filters.furnishing !== 'All' && p.furnishing !== filters.furnishing) return false;

      if (loc) {
        const hay = `${p.location} ${p.city} ${p.mapCoordinates.district}`.toLowerCase();
        if (!hay.includes(loc)) return false;
      }

      if (q) {
        const hay = `${p.title} ${p.location} ${p.city} ${p.category} ${p.description}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }

      if (minP !== null && !Number.isNaN(minP) && p.priceInLakhs < minP) return false;
      if (maxP !== null && !Number.isNaN(maxP) && p.priceInLakhs > maxP) return false;
      if (minBeds !== null && !Number.isNaN(minBeds) && p.bedrooms < minBeds) return false;
      if (minBaths !== null && !Number.isNaN(minBaths) && p.bathrooms < minBaths) return false;
      if (minArea !== null && !Number.isNaN(minArea) && p.areaSqFt < minArea) return false;

      return true;
    });

    const sorted = [...matched];
    if (filters.sortBy === 'price-asc') {
      sorted.sort((a, b) => a.priceInLakhs - b.priceInLakhs);
    } else if (filters.sortBy === 'price-desc') {
      sorted.sort((a, b) => b.priceInLakhs - a.priceInLakhs);
    } else if (filters.sortBy === 'latest') {
      sorted.sort((a, b) => b.yearBuilt - a.yearBuilt);
    } else {
      sorted.sort((a, b) => {
        const rank = (badge?: string) => (badge === 'Signature' ? 3 : badge === 'Featured' ? 2 : 1);
        return rank(b.badge) - rank(a.badge);
      });
    }
    return sorted;
  }, [properties, filters]);

  const updateField = <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => {
    onChangeFilters({ ...filters, [key]: value });
  };

  return (
    <section id="properties" className="py-20 sm:py-28 bg-[#F7F6F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A66B] mb-3">
              Curated Portfolio
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#101B2D] leading-tight">
              Featured Residences &amp; Signature Estates
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#777E88] max-w-md leading-relaxed">
            Explore architectural villas, sky penthouses, and corporate landmarks across Ahmedabad, Gandhinagar, and Mumbai.
          </p>
        </div>

        {/* Advanced Property Search Filter Bar */}
        <div className="bg-white border border-[#101B2D]/10 p-5 sm:p-6 mb-10 shadow-sm">
          {/* Primary Filter Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Keyword / Location Search */}
            <div className="lg:col-span-2">
              <label
                htmlFor="filter-keyword"
                className="block text-[11px] font-semibold tracking-[0.12em] uppercase text-[#777E88] mb-1.5"
              >
                Search Keyword or Corridor
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-[#777E88] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="filter-keyword"
                  type="text"
                  value={filters.searchQuery}
                  onChange={(e) => updateField('searchQuery', e.target.value)}
                  placeholder="Villa, Penthouse, Sindhu Bhavan..."
                  className="w-full h-11 sm:h-10 pl-9 pr-3 border border-[#101B2D]/15 bg-[#F7F6F2]/50 text-base sm:text-sm text-[#20252C] placeholder:text-[#777E88] focus:outline-none focus:border-[#C9A66B]"
                />
              </div>
            </div>

            {/* Buy / Rent */}
            <div>
              <label
                htmlFor="filter-transaction"
                className="block text-[11px] font-semibold tracking-[0.12em] uppercase text-[#777E88] mb-1.5"
              >
                Buy / Rent
              </label>
              <select
                id="filter-transaction"
                value={filters.transaction}
                onChange={(e) => updateField('transaction', e.target.value as 'All' | ListingTransaction)}
                className="w-full h-11 sm:h-10 px-3 border border-[#101B2D]/15 bg-[#F7F6F2]/50 text-base sm:text-sm text-[#20252C] focus:outline-none focus:border-[#C9A66B]"
              >
                <option value="All">Buy &amp; Rent</option>
                <option value="Buy">For Sale (Buy)</option>
                <option value="Rent">For Lease (Rent)</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="filter-category"
                className="block text-[11px] font-semibold tracking-[0.12em] uppercase text-[#777E88] mb-1.5"
              >
                Category
              </label>
              <select
                id="filter-category"
                value={filters.category}
                onChange={(e) => updateField('category', e.target.value as 'All' | PropertyCategory)}
                className="w-full h-11 sm:h-10 px-3 border border-[#101B2D]/15 bg-[#F7F6F2]/50 text-base sm:text-sm text-[#20252C] focus:outline-none focus:border-[#C9A66B]"
              >
                <option value="All">All Categories</option>
                <option value="Luxury Villas">Luxury Villas</option>
                <option value="Apartments">Apartments</option>
                <option value="Penthouses">Penthouses</option>
                <option value="Residential Plots">Residential Plots</option>
                <option value="Commercial Spaces">Commercial Spaces</option>
                <option value="Premium Houses">Premium Houses</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label
                htmlFor="filter-location"
                className="block text-[11px] font-semibold tracking-[0.12em] uppercase text-[#777E88] mb-1.5"
              >
                Location
              </label>
              <select
                id="filter-location"
                value={filters.location}
                onChange={(e) => updateField('location', e.target.value)}
                className="w-full h-11 sm:h-10 px-3 border border-[#101B2D]/15 bg-[#F7F6F2]/50 text-base sm:text-sm text-[#20252C] focus:outline-none focus:border-[#C9A66B]"
              >
                <option value="">All Cities</option>
                <option value="Ahmedabad">Ahmedabad</option>
                <option value="Gandhinagar">Gandhinagar</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Sindhu Bhavan">Sindhu Bhavan Road</option>
                <option value="Ambli-Bopal">Ambli-Bopal Road</option>
              </select>
            </div>

            {/* Toggle More Filters */}
            <div className="flex items-end gap-2">
              <button
                type="button"
                onClick={() => setShowMoreFilters((v) => !v)}
                className={`w-full h-11 sm:h-10 px-4 border text-xs font-semibold tracking-[0.06em] uppercase inline-flex items-center justify-center gap-2 cursor-pointer ${
                  showMoreFilters
                    ? 'btn-lux-navy border-[#101B2D]'
                    : 'btn-lux-light'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5 btn-lux-icon-shift" />
                <span>{showMoreFilters ? 'Fewer Filters' : 'More Filters'}</span>
              </button>
            </div>
          </div>

          {/* Expandable Detailed Filters Row */}
          {showMoreFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 pt-5 mt-5 border-t border-[#101B2D]/10">
              <div>
                <label
                  htmlFor="filter-min-price"
                  className="block text-[11px] font-semibold tracking-[0.12em] uppercase text-[#777E88] mb-1.5"
                >
                  Min Price (₹ Lakhs)
                </label>
                <input
                  id="filter-min-price"
                  type="number"
                  min={0}
                  value={filters.minPriceLakhs}
                  onChange={(e) => updateField('minPriceLakhs', e.target.value)}
                  placeholder="e.g. 100"
                  className="w-full h-11 sm:h-10 px-3 border border-[#101B2D]/15 bg-[#F7F6F2]/50 text-base sm:text-sm tabular-nums focus:outline-none focus:border-[#C9A66B]"
                />
              </div>

              <div>
                <label
                  htmlFor="filter-max-price"
                  className="block text-[11px] font-semibold tracking-[0.12em] uppercase text-[#777E88] mb-1.5"
                >
                  Max Price (₹ Lakhs)
                </label>
                <input
                  id="filter-max-price"
                  type="number"
                  min={0}
                  value={filters.maxPriceLakhs}
                  onChange={(e) => updateField('maxPriceLakhs', e.target.value)}
                  placeholder="e.g. 550"
                  className="w-full h-11 sm:h-10 px-3 border border-[#101B2D]/15 bg-[#F7F6F2]/50 text-base sm:text-sm tabular-nums focus:outline-none focus:border-[#C9A66B]"
                />
              </div>

              <div>
                <label
                  htmlFor="filter-beds"
                  className="block text-[11px] font-semibold tracking-[0.12em] uppercase text-[#777E88] mb-1.5"
                >
                  Min Bedrooms
                </label>
                <select
                  id="filter-beds"
                  value={filters.bedrooms}
                  onChange={(e) => updateField('bedrooms', e.target.value)}
                  className="w-full h-11 sm:h-10 px-3 border border-[#101B2D]/15 bg-[#F7F6F2]/50 text-base sm:text-sm tabular-nums focus:outline-none focus:border-[#C9A66B]"
                >
                  <option value="">Any</option>
                  <option value="3">3+ Bedrooms</option>
                  <option value="4">4+ Bedrooms</option>
                  <option value="5">5+ Bedrooms</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="filter-baths"
                  className="block text-[11px] font-semibold tracking-[0.12em] uppercase text-[#777E88] mb-1.5"
                >
                  Min Bathrooms
                </label>
                <select
                  id="filter-baths"
                  value={filters.bathrooms}
                  onChange={(e) => updateField('bathrooms', e.target.value)}
                  className="w-full h-11 sm:h-10 px-3 border border-[#101B2D]/15 bg-[#F7F6F2]/50 text-base sm:text-sm tabular-nums focus:outline-none focus:border-[#C9A66B]"
                >
                  <option value="">Any</option>
                  <option value="3">3+ Bathrooms</option>
                  <option value="4">4+ Bathrooms</option>
                  <option value="5">5+ Bathrooms</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="filter-area"
                  className="block text-[11px] font-semibold tracking-[0.12em] uppercase text-[#777E88] mb-1.5"
                >
                  Min Size (Sq. Ft.)
                </label>
                <select
                  id="filter-area"
                  value={filters.minAreaSqFt}
                  onChange={(e) => updateField('minAreaSqFt', e.target.value)}
                  className="w-full h-11 sm:h-10 px-3 border border-[#101B2D]/15 bg-[#F7F6F2]/50 text-base sm:text-sm tabular-nums focus:outline-none focus:border-[#C9A66B]"
                >
                  <option value="">Any Size</option>
                  <option value="2500">2,500+ Sq. Ft.</option>
                  <option value="4000">4,000+ Sq. Ft.</option>
                  <option value="5000">5,000+ Sq. Ft.</option>
                  <option value="7000">7,000+ Sq. Ft.</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="filter-furnishing"
                  className="block text-[11px] font-semibold tracking-[0.12em] uppercase text-[#777E88] mb-1.5"
                >
                  Furnishing Status
                </label>
                <select
                  id="filter-furnishing"
                  value={filters.furnishing}
                  onChange={(e) => updateField('furnishing', e.target.value as 'All' | FurnishingStatus)}
                  className="w-full h-11 sm:h-10 px-3 border border-[#101B2D]/15 bg-[#F7F6F2]/50 text-base sm:text-sm focus:outline-none focus:border-[#C9A66B]"
                >
                  <option value="All">Any Furnishing</option>
                  <option value="Fully Furnished">Fully Furnished</option>
                  <option value="Semi-Furnished">Semi-Furnished</option>
                  <option value="Unfurnished">Unfurnished</option>
                  <option value="Shell & Core">Shell &amp; Core</option>
                </select>
              </div>
            </div>
          )}

          {/* Utility Row: Results Count, Reset, Sort, View Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-5 mt-5 border-t border-[#101B2D]/10">
            <div className="flex items-center gap-4">
              <span className="text-sm text-[#20252C] font-medium tabular-nums">
                Showing {filteredProperties.length} of {properties.length} properties
              </span>
              <button
                type="button"
                onClick={onResetFilters}
                className="btn-lux-link inline-flex items-center gap-1.5 text-xs font-medium text-[#777E88] hover:text-[#101B2D] cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <label htmlFor="sort-properties" className="text-xs text-[#777E88] hidden sm:inline">
                  Sort by:
                </label>
                <select
                  id="sort-properties"
                  value={filters.sortBy}
                  onChange={(e) => updateField('sortBy', e.target.value as SearchFilters['sortBy'])}
                  className="h-9 px-3 border border-[#101B2D]/15 bg-[#F7F6F2]/60 text-xs font-medium text-[#101B2D] focus:outline-none focus:border-[#C9A66B]"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="latest">Latest Built</option>
                </select>
              </div>

              <div className="inline-flex border border-[#101B2D]/15 bg-[#F7F6F2]/60 p-0.5">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                  className={`btn-lux-tab p-2 cursor-pointer ${
                    viewMode === 'grid' ? 'bg-[#101B2D] text-[#C9A66B]' : 'text-[#777E88] hover:text-[#101B2D] hover:bg-white/80'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                  className={`btn-lux-tab p-2 cursor-pointer ${
                    viewMode === 'list' ? 'bg-[#101B2D] text-[#C9A66B]' : 'text-[#777E88] hover:text-[#101B2D] hover:bg-white/80'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredProperties.length === 0 ? (
          <div className="bg-white border border-[#101B2D]/10 py-16 px-6 text-center">
            <h3 className="font-serif text-2xl font-semibold text-[#101B2D] mb-2">
              No Matching Residences Found
            </h3>
            <p className="text-sm text-[#777E88] max-w-md mx-auto mb-6">
              Try broadening your price ceiling, bedroom count, or location corridor to view additional curated listings.
            </p>
            <button
              type="button"
              onClick={onResetFilters}
              className="btn-lux-navy px-6 py-3 text-xs font-semibold tracking-[0.1em] uppercase cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                : 'flex flex-col gap-6'
            }
          >
            {filteredProperties.map((property) => {
              const isSaved = wishlistIds.includes(property.id);

              return (
                <article
                  key={property.id}
                  className={`group bg-white border border-[#101B2D]/10 hover:border-[#C9A66B]/60 transition-all duration-300 hover:shadow-xl hover:shadow-[#101B2D]/8 overflow-hidden ${
                    viewMode === 'list' ? 'grid grid-cols-1 lg:grid-cols-12 items-stretch' : 'flex flex-col'
                  }`}
                >
                  {/* Image Container */}
                  <div
                    className={`relative overflow-hidden bg-[#101B2D] ${
                      viewMode === 'list' ? 'lg:col-span-5 aspect-[4/3] lg:aspect-auto lg:min-h-[280px]' : 'aspect-[4/3]'
                    }`}
                  >
                    <ResilientImage
                      src={property.primaryImage}
                      alt={`${property.title} in ${property.location}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101B2D]/70 via-transparent to-[#101B2D]/20 pointer-events-none" />

                    {/* Top Corner Editorial Marker + Wishlist */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                      {property.badge ? (
                        <span className="px-3 py-1 bg-[#101B2D]/90 backdrop-blur-sm text-[#C9A66B] text-[11px] font-semibold tracking-[0.12em] uppercase border border-[#C9A66B]/30">
                          {property.badge}
                        </span>
                      ) : (
                        <span />
                      )}

                      <button
                        type="button"
                        onClick={() => onToggleWishlist(property.id)}
                        aria-label={isSaved ? `Remove ${property.title} from wishlist` : `Save ${property.title} to wishlist`}
                        className={`btn-lux-icon w-10 h-10 inline-flex items-center justify-center backdrop-blur-md border cursor-pointer ${
                          isSaved
                            ? 'bg-[#C9A66B] text-[#101B2D] border-[#C9A66B]'
                            : 'bg-[#101B2D]/75 border-white/15 text-white hover:text-[#C9A66B] hover:border-[#C9A66B]/70'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Price Over Image Bottom */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-2">
                      <span className="font-serif text-xl sm:text-2xl lg:text-[26px] font-semibold text-white tabular-nums tracking-wide">
                        {property.priceDisplay}
                      </span>
                      <span className="text-[11px] font-medium tracking-[0.12em] uppercase text-white/90 shrink-0">
                        For {property.transaction === 'Buy' ? 'Sale' : 'Lease'}
                      </span>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div
                    className={`p-6 flex flex-col justify-between flex-1 ${
                      viewMode === 'list' ? 'lg:col-span-7' : ''
                    }`}
                  >
                    <div>
                      {/* Clean Unboxed Metadata */}
                      <div className="flex items-center gap-2 text-xs text-[#777E88] mb-2">
                        <span className="text-[#C9A66B] font-medium">{property.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{property.furnishing}</span>
                      </div>

                      <h3 className="font-serif text-2xl font-semibold text-[#101B2D] group-hover:text-[#182A43] transition-colors mb-1.5">
                        {property.title}
                      </h3>

                      <p className="inline-flex items-center gap-1.5 text-sm text-[#777E88] mb-4">
                        <MapPin className="w-3.5 h-3.5 text-[#C9A66B] shrink-0" />
                        <span>{property.location}</span>
                      </p>

                      {viewMode === 'list' && (
                        <p className="text-sm text-[#20252C]/80 leading-relaxed mb-5 line-clamp-2">
                          {property.description}
                        </p>
                      )}
                    </div>

                    <div>
                      {/* Key Metrics Strip */}
                      <div className="grid grid-cols-3 gap-2 sm:gap-3 py-3.5 sm:py-4 border-y border-[#101B2D]/10 text-[11px] sm:text-xs text-[#20252C] tabular-nums mb-5">
                        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                          <BedDouble className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C9A66B] shrink-0" />
                          <span className="truncate">{property.bedrooms > 0 ? `${property.bedrooms} Beds` : 'Plot / Corp'}</span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                          <Bath className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C9A66B] shrink-0" />
                          <span className="truncate">{property.bathrooms > 0 ? `${property.bathrooms} Baths` : 'Bespoke'}</span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                          <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C9A66B] shrink-0" />
                          <span className="truncate">{property.areaSqFt.toLocaleString('en-IN')} Sq.Ft.</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onSelectProperty(property)}
                        className="btn-lux-navy w-full py-3 px-4 text-xs font-semibold tracking-[0.1em] uppercase inline-flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#C9A66B] btn-lux-arrow" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
