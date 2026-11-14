import { useCallback, useEffect, useRef, useState } from 'react';
import { MotionConfig } from 'motion/react';
import {
  DEMO_PROPERTIES,
  EXCLUSIVE_PROJECTS,
  GALLERY_PHOTOS,
  PROPERTY_CATEGORIES,
  REAL_ESTATE_EXPERTS,
  SAMPLE_TESTIMONIALS,
  VIRTUAL_TOUR_STOPS,
} from './data/properties';
import { ListingTransaction, Property, PropertyCategory, SearchFilters } from './types/realEstate';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SectionDivider } from './components/SectionDivider';
import { PropertiesShowcase } from './components/PropertiesShowcase';
import { CategoriesSection } from './components/CategoriesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { GallerySection } from './components/GallerySection';
import { VirtualTourSection } from './components/VirtualTourSection';
import { ExpertsAndTestimonials } from './components/ExpertsAndTestimonials';
import { ListPropertySection } from './components/ListPropertySection';
import { MarketInsightsSection } from './components/MarketInsightsSection';
import { ContactAndFooter } from './components/ContactAndFooter';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { PreloaderAndControls } from './components/PreloaderAndControls';
import { ScrollProgressIndicator } from './components/ScrollProgressIndicator';

const DEFAULT_FILTERS: SearchFilters = {
  transaction: 'All',
  category: 'All',
  location: '',
  minPriceLakhs: '',
  maxPriceLakhs: '',
  bedrooms: '',
  bathrooms: '',
  minAreaSqFt: '',
  furnishing: 'All',
  searchQuery: '',
  sortBy: 'featured',
};

function getPropertyFromPathname(pathname: string): Property | null {
  const match = pathname.match(/^\/properties\/([a-z0-9-]+)\/?$/i);
  if (!match) return null;
  const id = match[1].toLowerCase();
  return DEMO_PROPERTIES.find((p) => p.id.toLowerCase() === id) ?? null;
}

export default function App() {
  const [filters, setFilters] = useState<SearchFilters>(DEFAULT_FILTERS);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['royal-sky-villa', 'azure-penthouse']);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(() =>
    typeof window !== 'undefined' ? getPropertyFromPathname(window.location.pathname) : null
  );
  const [contactSubject, setContactSubject] = useState('');
  const mainRef = useRef<HTMLElement>(null);
  const lastSectionUrlRef = useRef<string>(
    typeof window !== 'undefined' && !window.location.pathname.startsWith('/properties/')
      ? `${window.location.pathname}${window.location.hash}` || '/'
      : '/'
  );

  const triggerSectionSettle = useCallback(() => {
    const el = mainRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    el.classList.remove('page-transition-settle');
    void el.offsetWidth;
    el.classList.add('page-transition-settle');
  }, []);

  const scrollIntoSection = useCallback((sectionId: string, instant = false) => {
    const el = document.getElementById(sectionId);
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: instant || prefersReduced ? 'auto' : 'smooth' });
  }, []);

  const navigateToSection = useCallback(
    (sectionId: string) => {
      const targetUrl = sectionId === 'hero' ? '/' : `/#${sectionId}`;
      lastSectionUrlRef.current = targetUrl;

      if (`${window.location.pathname}${window.location.hash}` !== targetUrl) {
        window.history.pushState({ sectionId }, '', targetUrl);
      }

      if (selectedProperty) {
        setSelectedProperty(null);
      }
      triggerSectionSettle();
      requestAnimationFrame(() => scrollIntoSection(sectionId));
    },
    [scrollIntoSection, selectedProperty, triggerSectionSettle]
  );

  const openPropertyDetail = useCallback((property: Property) => {
    if (!window.location.pathname.startsWith('/properties/')) {
      lastSectionUrlRef.current =
        `${window.location.pathname}${window.location.hash}` || '/#properties';
    }
    const nextUrl = `/properties/${property.id}`;
    if (window.location.pathname !== nextUrl) {
      window.history.pushState({ propertyId: property.id }, '', nextUrl);
    }
    setSelectedProperty(property);
  }, []);

  const closePropertyDetail = useCallback(() => {
    const returnUrl = lastSectionUrlRef.current || '/';
    if (window.location.pathname.startsWith('/properties/')) {
      window.history.pushState({}, '', returnUrl);
    }
    setSelectedProperty(null);
    triggerSectionSettle();
  }, [triggerSectionSettle]);

  // Handle direct initial hash load & browser Back/Forward navigation
  useEffect(() => {
    if (!getPropertyFromPathname(window.location.pathname) && window.location.hash) {
      const hashId = window.location.hash.replace('#', '');
      if (hashId) {
        requestAnimationFrame(() => scrollIntoSection(hashId, true));
      }
    }

    const handlePopState = () => {
      const prop = getPropertyFromPathname(window.location.pathname);
      if (prop) {
        setSelectedProperty(prop);
        return;
      }

      setSelectedProperty(null);
      triggerSectionSettle();

      const hashId = window.location.hash.replace('#', '');
      if (hashId) {
        lastSectionUrlRef.current = `/#${hashId}`;
        requestAnimationFrame(() => scrollIntoSection(hashId));
      } else {
        lastSectionUrlRef.current = '/';
        requestAnimationFrame(() => scrollIntoSection('hero'));
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [scrollIntoSection, triggerSectionSettle]);

  const handleToggleWishlist = (id: string) => {
    setWishlistIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleQuickFilter = (opts: {
    transaction?: 'All' | ListingTransaction;
    category?: 'All' | PropertyCategory;
    location?: string;
  }) => {
    setFilters((prev) => ({
      ...DEFAULT_FILTERS,
      transaction: opts.transaction ?? prev.transaction,
      category: opts.category ?? prev.category,
      location: opts.location ?? '',
    }));
    navigateToSection('properties');
  };

  const handleHeroSearch = (params: {
    transaction: 'All' | ListingTransaction;
    category: 'All' | PropertyCategory;
    location: string;
    minPriceLakhs: string;
    maxPriceLakhs: string;
  }) => {
    setFilters({
      ...DEFAULT_FILTERS,
      transaction: params.transaction,
      category: params.category,
      location: params.location,
      minPriceLakhs: params.minPriceLakhs,
      maxPriceLakhs: params.maxPriceLakhs,
    });
    navigateToSection('properties');
  };

  const handleEnquireProject = (projectName: string) => {
    setContactSubject(projectName);
    navigateToSection('contact');
  };

  const savedProperties = DEMO_PROPERTIES.filter((p) => wishlistIds.includes(p.id));

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen w-full max-w-full bg-[#F7F6F2] text-[#20252C] overflow-x-clip">
        <ScrollProgressIndicator />
        <PreloaderAndControls />

        <Header
          wishlistCount={wishlistIds.length}
          onOpenWishlist={() => setWishlistOpen(true)}
          onQuickFilter={handleQuickFilter}
          onNavigateSection={navigateToSection}
        />

        <main ref={mainRef} className="w-full max-w-full overflow-x-clip">
          {/* 1. Cinematic Hero */}
          <HeroSection onHeroSearch={handleHeroSearch} />

          <SectionDivider variant="hero-crown" topBg="#101B2D" bottomBg="#F7F6F2" />

          {/* 2. Advanced Search & 13 Featured Properties */}
          <PropertiesShowcase
            properties={DEMO_PROPERTIES}
            filters={filters}
            onChangeFilters={setFilters}
            onResetFilters={() => setFilters(DEFAULT_FILTERS)}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onSelectProperty={openPropertyDetail}
          />

          <SectionDivider variant="diamond-vault" topBg="#F7F6F2" bottomBg="#101B2D" />

          {/* 3. Property Categories with 3D Tilt */}
          <CategoriesSection
            categories={PROPERTY_CATEGORIES}
            onExploreCategory={(cat) => handleQuickFilter({ transaction: 'All', category: cat })}
          />

          <SectionDivider variant="skyline-arch" topBg="#101B2D" bottomBg="#FFFFFF" />

          {/* 4. Exclusive Projects */}
          <ProjectsSection
            projects={EXCLUSIVE_PROJECTS}
            onEnquireProject={handleEnquireProject}
          />

          <SectionDivider variant="layered-3d-wave" topBg="#FFFFFF" bottomBg="#182A43" />

          {/* 5. Why Choose Us + Animated Counters */}
          <WhyChooseUsSection />

          <SectionDivider variant="corner-frame" topBg="#182A43" bottomBg="#F7F6F2" />

          {/* 6. Luxury Architectural Gallery + Lightbox */}
          <GallerySection photos={GALLERY_PHOTOS} />

          <SectionDivider variant="particle-horizon" topBg="#F7F6F2" bottomBg="#101B2D" />

          {/* 7. Interactive Virtual Tour Demo */}
          <VirtualTourSection stops={VIRTUAL_TOUR_STOPS} />

          <SectionDivider variant="tower-silhouette" topBg="#101B2D" bottomBg="#FFFFFF" />

          {/* 8. Real Estate Experts & Client Testimonials */}
          <ExpertsAndTestimonials
            experts={REAL_ESTATE_EXPERTS}
            testimonials={SAMPLE_TESTIMONIALS}
          />

          <SectionDivider variant="facade-grid" topBg="#F7F6F2" bottomBg="#101B2D" />

          {/* 9. List Your Property Conversion Section */}
          <ListPropertySection />

          <SectionDivider variant="diagonal-beam" topBg="#101B2D" bottomBg="#F7F6F2" />

          {/* 10. Live Ahmedabad Market Insights (Google Search Grounded) */}
          <MarketInsightsSection />

          <SectionDivider variant="compass-portal" topBg="#F7F6F2" bottomBg="#FFFFFF" />

          {/* 11. Contact, Office Map & Multi-Column Footer */}
          <ContactAndFooter
            preselectedSubject={contactSubject}
            onQuickFilter={handleQuickFilter}
            onNavigateSection={navigateToSection}
          />
        </main>

        {/* Property Details View */}
        <PropertyDetailModal
          property={selectedProperty}
          allProperties={DEMO_PROPERTIES}
          isSaved={selectedProperty ? wishlistIds.includes(selectedProperty.id) : false}
          onToggleWishlist={handleToggleWishlist}
          onClose={closePropertyDetail}
          onSelectSimilar={openPropertyDetail}
        />

        {/* Saved Properties Drawer */}
        <WishlistDrawer
          open={wishlistOpen}
          savedProperties={savedProperties}
          onClose={() => setWishlistOpen(false)}
          onRemove={handleToggleWishlist}
          onSelectProperty={openPropertyDetail}
        />
      </div>
    </MotionConfig>
  );
}
