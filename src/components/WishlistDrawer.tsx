import React from 'react';
import { ArrowRight, Heart, Trash2, X } from 'lucide-react';
import { Property } from '../types/realEstate';
import { ResilientImage } from './ResilientImage';

interface WishlistDrawerProps {
  open: boolean;
  savedProperties: Property[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onSelectProperty: (property: Property) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  open,
  savedProperties,
  onClose,
  onRemove,
  onSelectProperty,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Saved properties wishlist">
      <div
        className="fixed inset-0 bg-[#101B2D]/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md h-full bg-[#F7F6F2] text-[#20252C] border-l border-[#C9A66B]/40 shadow-2xl flex flex-col">
        <div className="bg-[#101B2D] text-white px-6 py-5 flex items-center justify-between border-b border-[#C9A66B]/30">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#C9A66B]">
              Saved Portfolio
            </p>
            <h3 className="font-serif text-2xl font-semibold">
              Shortlisted Estates ({savedProperties.length})
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close saved properties"
            className="w-10 h-10 bg-white/10 hover:bg-[#C9A66B] hover:text-[#101B2D] text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {savedProperties.length === 0 ? (
            <div className="text-center py-16 px-4">
              <Heart className="w-10 h-10 text-[#C9A66B]/50 mx-auto mb-3" />
              <h4 className="font-serif text-2xl font-semibold text-[#101B2D] mb-2">
                Your Shortlist Is Empty
              </h4>
              <p className="text-sm text-[#777E88]">
                Tap the heart icon on any residence card to compare and revisit your favorite estates here.
              </p>
            </div>
          ) : (
            savedProperties.map((prop) => (
              <div
                key={prop.id}
                className="bg-white border border-[#101B2D]/10 p-3 flex gap-3.5 items-center"
              >
                <div className="w-24 h-20 shrink-0 overflow-hidden bg-[#101B2D]">
                  <ResilientImage
                    src={prop.primaryImage}
                    alt={prop.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] uppercase tracking-wider text-[#C9A66B] block">
                    {prop.priceDisplay}
                  </span>
                  <h4 className="font-serif text-lg font-semibold text-[#101B2D] truncate">
                    {prop.title}
                  </h4>
                  <p className="text-xs text-[#777E88] truncate mb-2">{prop.location}</p>
                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onSelectProperty(prop);
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-[#101B2D] hover:text-[#C9A66B] cursor-pointer"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemove(prop.id)}
                      aria-label={`Remove ${prop.title}`}
                      className="text-[#777E88] hover:text-red-600 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
