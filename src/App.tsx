import { useState } from 'react';
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
import { ContactAndFooter } from './components/ContactAndFooter';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { PreloaderAndControls } from './components/PreloaderAndControls';

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

export default function App() {
  const [filters, setFilters] = useState<SearchFilters>(DEFAULT_FILTERS);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['royal-sky-villa', 'azure-penthouse']);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [contactSubject, setContactSubject] = useState('');

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
    scrollToSection('properties');
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
    scrollToSection('properties');
  };

  const handleEnquireProject = (projectName: string) => {
    setContactSubject(projectName);
    scrollToSection('contact');
  };

  const savedProperties = DEMO_PROPERTIES.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#20252C] overflow-x-hidden">
      <PreloaderAndControls />

      <Header
        wishlistCount={wishlistIds.length}
        onOpenWishlist={() => setWishlistOpen(true)}
        onQuickFilter={handleQuickFilter}
        onNavigateSection={scrollToSection}
      />

      <main>
        {/* 1. Cinematic Hero */}
        <HeroSection onHeroSearch={handleHeroSearch} />

        <SectionDivider variant="architectural-step" topBg="#101B2D" bottomBg="#F7F6F2" />

        {/* 2. Advanced Search & 13 Featured Properties */}
        <PropertiesShowcase
          properties={DEMO_PROPERTIES}
          filters={filters}
          onChangeFilters={setFilters}
          onResetFilters={() => setFilters(DEFAULT_FILTERS)}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onSelectProperty={setSelectedProperty}
        />

        <SectionDivider variant="diagonal-plane" topBg="#F7F6F2" bottomBg="#101B2D" />

        {/* 3. Property Categories with 3D Tilt */}
        <CategoriesSection
          categories={PROPERTY_CATEGORIES}
          onExploreCategory={(cat) => handleQuickFilter({ transaction: 'All', category: cat })}
        />

        <SectionDivider variant="compass-arch" topBg="#101B2D" bottomBg="#FFFFFF" />

        {/* 4. Exclusive Projects */}
        <ProjectsSection
          projects={EXCLUSIVE_PROJECTS}
          onEnquireProject={handleEnquireProject}
        />

        <SectionDivider variant="layered-wave" topBg="#FFFFFF" bottomBg="#182A43" />

        {/* 5. Why Choose Us + Animated Counters */}
        <WhyChooseUsSection />

        <SectionDivider variant="gold-horizon" topBg="#182A43" bottomBg="#F7F6F2" />

        {/* 6. Luxury Architectural Gallery + Lightbox */}
        <GallerySection photos={GALLERY_PHOTOS} />

        <SectionDivider variant="gradient-crest" topBg="#F7F6F2" bottomBg="#101B2D" />

        {/* 7. Interactive Virtual Tour Demo */}
        <VirtualTourSection stops={VIRTUAL_TOUR_STOPS} />

        <SectionDivider variant="architectural-step" topBg="#101B2D" bottomBg="#FFFFFF" />

        {/* 8. Real Estate Experts & Client Testimonials */}
        <ExpertsAndTestimonials
          experts={REAL_ESTATE_EXPERTS}
          testimonials={SAMPLE_TESTIMONIALS}
        />

        <SectionDivider variant="diagonal-plane" topBg="#F7F6F2" bottomBg="#101B2D" />

        {/* 9. List Your Property Conversion Section */}
        <ListPropertySection />

        <SectionDivider variant="compass-arch" topBg="#101B2D" bottomBg="#FFFFFF" />

        {/* 10. Contact, Office Map & Multi-Column Footer */}
        <ContactAndFooter
          preselectedSubject={contactSubject}
          onQuickFilter={handleQuickFilter}
          onNavigateSection={scrollToSection}
        />
      </main>

      {/* Property Details Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        allProperties={DEMO_PROPERTIES}
        isSaved={selectedProperty ? wishlistIds.includes(selectedProperty.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onClose={() => setSelectedProperty(null)}
        onSelectSimilar={setSelectedProperty}
      />

      {/* Saved Properties Drawer */}
      <WishlistDrawer
        open={wishlistOpen}
        savedProperties={savedProperties}
        onClose={() => setWishlistOpen(false)}
        onRemove={handleToggleWishlist}
        onSelectProperty={setSelectedProperty}
      />
    </div>
  );
}
