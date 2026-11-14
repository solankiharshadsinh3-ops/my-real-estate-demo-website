import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CategoryInfo, PropertyCategory } from '../types/realEstate';
import { ResilientImage } from './ResilientImage';

interface CategoriesSectionProps {
  categories: CategoryInfo[];
  onExploreCategory: (category: PropertyCategory) => void;
}

interface TiltCardProps {
  category: CategoryInfo;
  onExplore: (category: PropertyCategory) => void;
}

const CategoryTiltCard: React.FC<TiltCardProps> = ({ category, onExplore }) => {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -y * 7, ry: x * 7 });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className="group relative aspect-[4/3] overflow-hidden bg-[#101B2D] border border-[#C9A66B]/20 hover:border-[#C9A66B]/70 shadow-lg"
    >
      <ResilientImage
        src={category.image}
        alt={category.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#101B2D]/95 via-[#101B2D]/45 to-[#101B2D]/15 transition-opacity duration-300" />

      <div className="absolute inset-0 p-6 sm:p-7 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#C9A66B]">
            {category.countLabel}
          </span>
          <span className="w-8 h-8 border border-[#C9A66B]/40 flex items-center justify-center text-[#C9A66B] group-hover:bg-[#C9A66B] group-hover:text-[#101B2D] transition-colors">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>

        <div>
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white mb-1.5">
            {category.name}
          </h3>
          <p className="text-xs sm:text-sm text-white/80 line-clamp-2 mb-4 max-w-xs">
            {category.subtitle}
          </p>
          <button
            type="button"
            onClick={() => onExplore(category.name)}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase text-[#C9A66B] hover:text-white transition-colors cursor-pointer"
          >
            <span>Explore</span>
            <span className="w-6 h-px bg-[#C9A66B] group-hover:w-10 transition-all duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categories,
  onExploreCategory,
}) => {
  return (
    <section id="categories" className="py-20 sm:py-28 bg-[#101B2D] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A66B] mb-3">
              Architectural Typologies
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight">
              Property Categories
            </h2>
          </div>
          <p className="text-sm sm:text-base text-white/75 max-w-md leading-relaxed">
            Select a portfolio collection tailored to private residential sanctuaries, coastal sky living, or institutional commerce.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((cat) => (
            <CategoryTiltCard
              key={cat.id}
              category={cat}
              onExplore={onExploreCategory}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
