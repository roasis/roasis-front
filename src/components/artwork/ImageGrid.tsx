'use client';
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
  console.log({ gridSize, fragments, selectedFragments });
  return (
    <div className="relative w-full aspect-square rounded-lg overflow-hidden">
      <Image
        src={imageUrl}
        alt="Artwork Image"
        layout="fill"
        objectFit="cover"
        className="rounded-lg"
      />
      <div
        className={`absolute inset-0 rounded-lg overflow-hidden hover:grid w-full h-full grid-cols-${gridSize} grid-rows-${gridSize}`}
      >
        {fragments.map((fragment) => {
          console.log(
            selectedFragments.find(
              (sf) => sf.nftoken_id === fragment.nftoken_id
            )
          );
          return (
            <div
              key={fragment.nftoken_id}
              className={cn(
                `group relative w-full h-full border border-white/20 flex items-center justify-center cursor-pointer`,
                // 기본 배경색
                !!selectedFragments.find(
                  (sf) => sf.nftoken_id === fragment.nftoken_id
                ) && 'bg-green-500/70',
                // selectedFragments에 포함되지 않은 minted fragment만 transparent 적용
                fragment.status === 'minted' &&
                  !selectedFragments.find(
                    (sf) => sf.nftoken_id === fragment.nftoken_id
                  ) &&
                  'bg-transparent',
                // hover 시 배경색
                fragment.status === 'minted' && 'hover:bg-green-500/50',
                fragment.status === 'offered_to_artist' &&
                  'hover:bg-blue-500/50'
              )}
              onClick={() => onFragmentClick(fragment)}
            >
              {fragment.status === 'offered_to_artist' && (
                <span className="text-white font-bold text-sm hidden group-hover:block">
                  SOLD
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
