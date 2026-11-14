import React, { useEffect, useState } from 'react';
import { Building2 } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
  fetchPriority?: 'high' | 'low' | 'auto';
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  eager = false,
  fetchPriority = 'auto',
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (hasError || !src) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-[#101B2D] via-[#182A43] to-[#101B2D] text-[#C9A66B] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Building2 className="w-8 h-8 mb-2 opacity-80" strokeWidth={1.25} />
        <span className="font-serif text-sm tracking-wide text-white/85 max-w-[180px] line-clamp-2">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={fetchPriority}
      draggable={false}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
