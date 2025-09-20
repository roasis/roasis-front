'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import CustomDropdown from '@/src/components/ui/CustomDropdown';
import { BorderBeam } from '@/components/ui/border-beam';
import { getArtworks } from '@/src/api/artwork';
import { ArtworkMapper } from '@/src/mapper/artwork';

// Marketplace용 Artwork 타입 (mapper에서 변환된 형태)
interface MarketplaceArtwork {
  id: number;
  title: string;
  artist: string;
  verifier: string;
  price: string;
  imageUrl: string;
  soldFragments: number;
  totalFragments: number;
  size: string;
  createdAt: string;
  priceUsd: number;
}

const mediumOptions = [
  'All',
  'Oil on Canvas',
  'Polish Stell',
  'Digital Print on Aluminum',
];
const sortOptions = ['Newest', 'Price: Low to High', 'Price: High to Low'];

const ArtworkCard = ({ artwork }: { artwork: MarketplaceArtwork }) => {
  const progressPercentage =
    (artwork.soldFragments / artwork.totalFragments) * 100;

  return (
    <div className="bg-[#1A1A1A] rounded-lg overflow-hidden hover:scale-102 ease-in-out">
      <Image
        // src={artwork.imageUrl}
        src={'/cat.jpg'}
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
            <span>Investment Progress</span>
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
          <span className="text-sm text-gray-400">Fragment Price</span>
          <span className="text-right font-bold">{artwork.price}</span>
        </div>
      </div>
    </div>
  );
};

export default function MarketplacePage() {
  const [selectedMedium, setSelectedMedium] = useState('All');
  const [selectedSort, setSelectedSort] = useState('Newest');
  const [artworks, setArtworks] = useState<MarketplaceArtwork[]>([]);
  const [filteredArtworks, setFilteredArtworks] = useState<
    MarketplaceArtwork[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // API에서 작품 목록 가져오기
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getArtworks();
        const marketplaceArtworks = ArtworkMapper.toMarketplaceArtworks(data);
        setArtworks(marketplaceArtworks);
      } catch (err) {
        console.error('Failed to fetch artworks:', err);
        setError(
          err instanceof Error ? err.message : 'Failed to fetch artworks'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  // 작품 정렬 및 필터링
  useEffect(() => {
    const filtered = [...artworks];

    // 정렬 적용
    switch (selectedSort) {
      case 'Newest':
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'Price: Low to High':
        filtered.sort((a, b) => a.priceUsd - b.priceUsd);
        break;
      case 'Price: High to Low':
        filtered.sort((a, b) => b.priceUsd - a.priceUsd);
        break;
      default:
        break;
    }

    setFilteredArtworks(filtered);
  }, [artworks, selectedSort]);

  // 로딩 상태
  if (loading) {
    return (
      <div className="p-8 text-white">
        <h1 className="text-4xl font-bold">Marketplace</h1>
        <p className="text-gray-400 mt-2 mb-8">
          Discover gallery-verified artworks from around the world
        </p>
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-gray-400">작품 목록을 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="p-8 text-white">
        <h1 className="text-4xl font-bold">Marketplace</h1>
        <p className="text-gray-400 mt-2 mb-8">
          Discover gallery-verified artworks from around the world
        </p>
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-red-400 mb-4">작품 목록을 불러올 수 없습니다</p>
            <p className="text-gray-400">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-bold">Marketplace</h1>
      <p className="text-gray-400 mt-2 mb-8">
        Discover gallery-verified artworks from around the world
      </p>

      <div className="relative bg-[#1A1A1A] p-4 rounded-lg mb-8">
        <div className="grid grid-cols-2 gap-4">
          <CustomDropdown
            label="Medium"
            options={mediumOptions}
            selected={selectedMedium}
            onSelect={setSelectedMedium}
          />
          <CustomDropdown
            label="Sort By"
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
        {filteredArtworks.length > 0 ? (
          filteredArtworks.map((artwork) => (
            <Link href={`/artworks/${artwork.id}`} key={artwork.id}>
              <ArtworkCard artwork={artwork} />
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-gray-400">표시할 작품이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
