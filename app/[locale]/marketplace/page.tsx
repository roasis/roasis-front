'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import CustomDropdown from '@/src/components/ui/CustomDropdown';
import { BorderBeam } from '@/components/ui/border-beam';
import { Particles } from '@/components/ui/particles';
import { useTranslations } from 'next-intl';

// Define a type for the artwork object
interface Artwork {
  id: number;
  title: string;
  artist: string;
  verifier: string;
  price: string;
  imageUrl: string;
  soldFragments: number;
  totalFragments: number;
}

// This is mock data. In a real application, you would fetch this from an API.
const artworks: Artwork[] = [
  {
    id: 1,
    title: 'Hello',
    artist: 'Artist name',
    verifier: 'Verified by Soho Art Collective',
    price: '850 RLUSD',
    imageUrl: '/cat.jpg',
    soldFragments: 6,
    totalFragments: 9,
  },
  {
    id: 2,
    title: 'Hello',
    artist: 'Artist name',
    verifier: 'Verified by Soho Art Collective',
    price: '850 RLUSD',
    imageUrl: '/cat.jpg',
    soldFragments: 4,
    totalFragments: 9,
  },
  {
    id: 3,
    title: 'Hello',
    artist: 'Artist name',
    verifier: 'Verified by Soho Art Collective',
    price: '850 RLUSD',
    imageUrl: '/cat.jpg',
    soldFragments: 8,
    totalFragments: 9,
  },
  {
    id: 4,
    title: 'Hello',
    artist: 'Artist name',
    verifier: 'Verified by Soho Art Collective',
    price: '850 RLUSD',
    imageUrl: '/cat.jpg',
    soldFragments: 5,
    totalFragments: 9,
  },
];

const ArtworkCard = ({ artwork }: { artwork: Artwork }) => {
  const progressPercentage =
    (artwork.soldFragments / artwork.totalFragments) * 100;
  const t = useTranslations('Marketplace');

  return (
    <div className="bg-[#1A1A1A] rounded-lg overflow-hidden hover:scale-102 ease-in-out relative z-10">
      <Image
        src={artwork.imageUrl}
        alt={artwork.title}
        width={300}
        height={300}
        className="w-full object-cover"
      />
      <div className="p-4 text-white space-y-3">
        <div>
          <h3 className="font-bold">{artwork.title}</h3>
          <p className="text-sm text-gray-400">{artwork.artist}</p>
          <p className="text-xs text-gray-500 mt-1">{artwork.verifier}</p>
        </div>

        <div>
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>{t('progress')}</span>
            <span>
              {artwork.soldFragments}/{artwork.totalFragments} sold
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1.5">
            <div
              className="bg-brend h-1.5 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="flex flex-col items-start pt-2 mb-3">
          <span className="text-sm text-gray-400">{t('price')}</span>
          <span className="text-right font-bold">{artwork.price}</span>
        </div>
      </div>
    </div>
  );
};

export default function MarketplacePage() {
  const t = useTranslations('Marketplace');

  // 번역된 옵션들을 동적으로 생성
  const mediumOptions = [
    t('mediumOptions.all'),
    t('mediumOptions.oilOnCanvas'),
    t('mediumOptions.polishSteel'),
    t('mediumOptions.digitalPrintOnAluminum'),
  ];

  const sortOptions = [
    t('sortOptions.newest'),
    t('sortOptions.priceLowToHigh'),
    t('sortOptions.priceHighToLow'),
  ];

  const [selectedMedium, setSelectedMedium] = useState(mediumOptions[0]);
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);

  return (
    <div className="p-8 text-white ">
      <h1 className="text-4xl font-bold">{t('header')}</h1>
      <p className="text-gray-400 mt-2 mb-8">{t('decs')}</p>
      <Particles className="absolute inset-0 z-0" />

      <div className="relative bg-[#1A1A1A] p-4 rounded-lg mb-8">
        <div className="grid grid-cols-2 gap-4">
          <CustomDropdown
            label={t('label.medium')}
            options={mediumOptions}
            selected={selectedMedium}
            onSelect={setSelectedMedium}
          />
          <CustomDropdown
            label={t('label.sort')}
            options={sortOptions}
            selected={selectedSort}
            onSelect={setSelectedSort}
          />
        </div>
        <BorderBeam
          duration={8}
          size={90}
          reverse
          className="from-transparent via-brend to-transparent"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {artworks.map((artwork) => (
          <Link href={`/artworks/${artwork.id}`} key={artwork.id}>
            <ArtworkCard artwork={artwork} />
          </Link>
        ))}
      </div>
    </div>
  );
}
