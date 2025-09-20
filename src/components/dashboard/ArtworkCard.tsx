'use client';

import Image from 'next/image';

interface ArtworkCardProps {
  title: string;
  artistName: string;
  verifiedBy: string;
  soldCount: number;
  totalCount: number;
  fragmentPrice: string;
  imageUrl: string;
}

export default function ArtworkCard({
  title,
  artistName,
  verifiedBy,
  soldCount,
  totalCount,
  fragmentPrice,
  imageUrl,
}: ArtworkCardProps) {
  const progressPercentage = (soldCount / totalCount) * 100;

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
        <Image src={imageUrl} alt={title} fill className="object-cover" />
      </div>

      <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>

      <div className="mb-3">
        <p className="text-gray-300 text-sm">{artistName}</p>
        <p className="text-gray-500 text-xs">{verifiedBy}</p>
      </div>

      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-gray-400 text-sm">Investment Progress</span>
          <span className="text-gray-400 text-sm">
            {soldCount}/{totalCount} sold
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-red-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <div className="text-white text-lg font-bold">{fragmentPrice}</div>
    </div>
  );
}
