export type ListingTransaction = 'Buy' | 'Rent';

export type PropertyCategory =
  | 'Luxury Villas'
  | 'Apartments'
  | 'Penthouses'
  | 'Residential Plots'
  | 'Commercial Spaces'
  | 'Premium Houses';

export type FurnishingStatus = 'Fully Furnished' | 'Semi-Furnished' | 'Unfurnished' | 'Shell & Core';

export interface Property {
  id: string;
  title: string;
  location: string;
  city: string;
  transaction: ListingTransaction;
  category: PropertyCategory;
  priceDisplay: string;
  priceInLakhs: number; // Standardized numeric unit for filtering & sorting
  monthlyRent?: boolean;
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  furnishing: FurnishingStatus;
  badge?: 'Featured' | 'New Listing' | 'Signature';
  primaryImage: string;
  galleryImages: string[];
  description: string;
  architecturalHighlight: string;
  features: string[];
  amenities: string[];
  yearBuilt: number;
  facing: string;
  parkingSpaces: number;
  floorPlanRooms: {
    name: string;
    dimensions: string;
    level: 'Ground' | 'Upper';
  }[];
  mapCoordinates: {
    latLabel: string;
    lngLabel: string;
    landmark: string;
    district: string;
    pinX: number; // Percentage 20-80 for stylized vector map
    pinY: number;
  };
}

export interface CategoryInfo {
  id: string;
  name: PropertyCategory;
  subtitle: string;
  countLabel: string;
  image: string;
}

export interface ExclusiveProject {
  id: string;
  name: string;
  developer: string;
  location: string;
  startingPrice: string;
  status: 'Pre-Launch' | 'Under Construction' | 'Ready to Move' | 'Limited Inventory';
  completion: string;
  configuration: string;
  coverImage: string;
  summary: string;
  highlights: string[];
}

export interface ExpertConsultant {
  id: string;
  name: string;
  designation: string;
  experience: string;
  specialization: string;
  bio: string;
  image: string;
  phone: string;
  email: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  initials: string;
  rating: number;
  propertyTitle: string;
  transactionType: string;
  quote: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'Luxury Villas' | 'Modern Apartments' | 'Premium Interiors' | 'Swimming Pools' | 'Architecture' | 'Landscaped Gardens';
  location: string;
  image: string;
  aspect: 'tall' | 'wide' | 'square';
}

export interface VirtualTourProperty {
  id: string;
  title: string;
  location: string;
  priceDisplay: string;
  views: {
    key: 'exterior' | 'interior' | 'grounds';
    label: string;
    image: string;
    cameraNote: string;
    hotspots: {
      x: number;
      y: number;
      title: string;
      detail: string;
    }[];
  }[];
}

export interface SearchFilters {
  transaction: 'All' | ListingTransaction;
  category: 'All' | PropertyCategory;
  location: string;
  minPriceLakhs: string;
  maxPriceLakhs: string;
  bedrooms: string;
  bathrooms: string;
  minAreaSqFt: string;
  furnishing: 'All' | FurnishingStatus;
  searchQuery: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'latest';
}
