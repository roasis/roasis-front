'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { NFTOwner } from '@/src/dto/artwork';
import { cn } from '@/lib/utils';

interface ImageGridProps {
  imageUrl: string;
  fragments: NFTOwner[];
  gridSize: number; // e.g., 3 for a 3x3 grid
  selectedFragments: NFTOwner[];
  onFragmentClick: (fragment: NFTOwner) => void;
}

export default function ImageGrid({
  imageUrl,
  fragments,
  gridSize,
  selectedFragments,
  onFragmentClick,
}: ImageGridProps) {
  const [isHovered, setIsHovered] = useState(false);
  const getStatusColor = (fragment: NFTOwner) => {
    const isSelected = selectedFragments.some(
      (sf) => sf.nftoken_id === fragment.nftoken_id
    );
    if (isSelected) {
      return 'bg-green-500/70'; // Selected state
    }
    switch (fragment.status) {
      case 'sold':
        return 'bg-blue-500/50';
      case 'minted':
      default:
        return 'bg-transparent hover:bg-green-500/50';
    }
  };

  return (
    <div
      className="relative w-full aspect-square rounded-lg overflow-hidden"
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
              key={fragment.nftoken_id}
              className={cn(
                `border border-white/20 flex items-center justify-center cursor-pointer`,
                getStatusColor(fragment)
              )}
              onClick={() => {
                console.log(fragment);
                if (fragment.status === 'minted') {
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
