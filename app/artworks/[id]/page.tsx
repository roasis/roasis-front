'use client';

import Image from 'next/image';
import { Fragment } from '@/src/dto/artwork';
import ImageGrid from '@/src/components/artwork/ImageGrid';
import PurchaseCard from '@/src/components/artwork/PurchaseCard';
import { useState } from 'react';
import { useSession } from '@walletconnect/modal-sign-react';

// Mock data for a single artwork - in a real app, you'd fetch this based on the `id` param
const artworkDetail = {
  id: 1,
  title: 'Meow',
  description: 'Artwork Description wow!!',
  imageUrl: '/cat.jpg',
  medium: 'by Kimkim',
  year: '2025',
  dimensions: '40" X 60"',
  totalValue: 18000,
  fragmentPrice: 2000,
  gridSize: 3,
  fragments: [
    { id: '1', position: 1, price: 2000, status: 'sold' },
    { id: '2', position: 2, price: 2000, status: 'sold' },
    { id: '3', position: 3, price: 2000, status: 'available' },
    { id: '4', position: 4, price: 2000, status: 'sold' },
    { id: '5', position: 5, price: 2000, status: 'available' },
    { id: '6', position: 6, price: 2000, status: 'sold' },
    { id: '7', position: 7, price: 2000, status: 'sold' },
    { id: '8', position: 8, price: 2000, status: 'sold' },
    { id: '9', position: 9, price: 2000, status: 'available' },
  ] as Fragment[],
};

const soldCount = artworkDetail.fragments.filter(
  (f) => f.status === 'sold'
).length;
const totalFragments = artworkDetail.gridSize * artworkDetail.gridSize;

export default function ArtworkDetailPage({
  params: _params,
}: {
  params: { id: string };
}) {
  const session = useSession();
  const [selectedFragments, setSelectedFragments] = useState<Fragment[]>([]);

  const handleFragmentClick = (fragment: Fragment) => {
    if (!session) {
      alert('지갑을 연동해주세요');
      return;
    }
    setSelectedFragments((prev) => {
      const isAlreadySelected = prev.some((sf) => sf.id === fragment.id);
      if (isAlreadySelected) {
        return prev.filter((sf) => sf.id !== fragment.id);
      } else {
        return [...prev, fragment];
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white p-8">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column */}
        <div className="space-y-6">
          <ImageGrid
            imageUrl={artworkDetail.imageUrl}
            fragments={artworkDetail.fragments}
            gridSize={artworkDetail.gridSize}
            selectedFragments={selectedFragments}
            onFragmentClick={handleFragmentClick}
          />
          <h1 className="text-4xl font-bold">{artworkDetail.title}</h1>
          <p className="text-gray-400 whitespace-pre-wrap">
            {artworkDetail.description}
          </p>
          <div className="flex justify-between items-center border-t border-b border-gray-700 py-4">
            <div>
              <p className="text-sm text-gray-400">Medium</p>
              <p className="font-medium">{artworkDetail.medium}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Year</p>
              <p className="font-medium">{artworkDetail.year}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Dimensions</p>
              <p className="font-medium">{artworkDetail.dimensions}</p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Investment Overview */}
          <div className="bg-[#1A1A1A] rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Investment Overview</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>
                    {soldCount}/{totalFragments} sold
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-brend h-2.5 rounded-full"
                    style={{ width: `${(soldCount / totalFragments) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex justify-around text-center">
                <div>
                  <p className="text-3xl font-bold">
                    {totalFragments - soldCount}
                  </p>
                  <p className="text-gray-400">Available</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">{soldCount}</p>
                  <p className="text-gray-400">Sold</p>
                </div>
              </div>
              <div className="border-t border-gray-700 pt-4 flex justify-between">
                <span className="text-gray-400">Total Value</span>
                <span className="font-bold">
                  {artworkDetail.totalValue.toLocaleString()} RLUSD
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Fragment Price</span>
                <span className="font-bold">
                  {artworkDetail.fragmentPrice.toLocaleString()} RLUSD
                </span>
              </div>
            </div>
          </div>

          {/* Purchase Fragments */}
          <PurchaseCard
            session={session || null}
            selectedFragments={selectedFragments}
            fragmentPrice={artworkDetail.fragmentPrice}
          />
          {/* Transaction History */}
          <div className="bg-[#1A1A1A] rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Transaction History</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Minted</span>
                <span>2025. 8. 10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Listed</span>
                <span>2025. 9. 22</span>
              </div>
            </div>
          </div>

          {/* Verified & Guaranteed by */}
          <div className="bg-[#1A1A1A] rounded-lg p-6 flex items-center space-x-4">
            <Image
              src="/cat.jpg"
              alt="John Cat"
              width={60}
              height={60}
              className="rounded-full"
            />
            <div>
              <p className="font-bold">Verified & Guaranteed by</p>
              <p className="text-gray-400">John Cat</p>
              <p className="text-xs text-gray-500">Paris, France</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
