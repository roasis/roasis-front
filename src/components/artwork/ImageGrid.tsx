'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Fragment } from '@/src/dto/artwork';

interface ImageGridProps {
  imageUrl: string;
  fragments: Fragment[];
  gridSize: number; // e.g., 3 for a 3x3 grid
  selectedFragments: Fragment[];
  onFragmentClick: (fragment: Fragment) => void;
}

export default function ImageGrid({
  imageUrl,
  fragments,
  gridSize,
  selectedFragments,
  onFragmentClick,
}: ImageGridProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = (fragment: Fragment) => {
    const isSelected = selectedFragments.some((sf) => sf.id === fragment.id);
    if (isSelected) {
      return 'bg-green-500/70'; // Selected state
    }
    switch (fragment.status) {
      case 'sold':
        return 'bg-blue-500/50';
      case 'reserved':
        return 'bg-yellow-500/50';
      case 'available':
      default:
        return 'bg-transparent hover:bg-green-500/50';
    }
  };

  return (
    <div
      className="relative w-full aspect-square"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={imageUrl}
        alt="Artwork Image"
        layout="fill"
        objectFit="cover"
        className="rounded-lg"
      />
      {isHovered && (
        <div
          className="absolute inset-0 grid rounded-lg overflow-hidden"
          style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
        >
          {fragments.map((fragment) => (
            <div
              key={fragment.id}
              className={`border border-white/20 flex items-center justify-center cursor-pointer ${getStatusColor(
                fragment
              )}`}
              onClick={() => {
                if (fragment.status === 'available') {
                  onFragmentClick(fragment);
                }
              }}
            >
              {fragment.status === 'sold' && (
                <span className="text-white font-bold text-sm">SOLD</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
