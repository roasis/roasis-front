'use client';

import Image from 'next/image';
import ImageGrid from '@/src/components/artwork/ImageGrid';
import PurchaseCard from '@/src/components/artwork/PurchaseCard';
import { useState, useEffect, use } from 'react';
import { useSession } from '@walletconnect/modal-sign-react';
import { BorderBeam } from '@/components/ui/border-beam';
import { getArtwork } from '@/src/api/artwork';
import type { ArtworkDetail, NFTOwner } from '@/src/dto/artwork';
import { ArtworkMapper } from '@/src/mapper/artwork';

export default function ArtworkDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const session = useSession();
  const [selectedFragments, setSelectedFragments] = useState<NFTOwner[]>([]);
  const [artworkData, setArtworkData] = useState<ArtworkDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  console.log(selectedFragments);

  // API에서 작품 데이터 가져오기
  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        setLoading(true);
        setError(null);

        const artworkId = ArtworkMapper.parseArtworkId(id);
        if (!artworkId) {
          throw new Error('Invalid artwork ID');
        }

        const data = await getArtwork(artworkId);
        setArtworkData(data);
      } catch (err) {
        console.error('Failed to fetch artwork:', err);
        setError(
          err instanceof Error ? err.message : 'Failed to fetch artwork'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchArtwork();
  }, [id]);

  const handleFragmentClick = (fragment: NFTOwner) => {
    console.log(fragment);
    if (!session) {
      alert('지갑을 연동해주세요');
      return;
    }
    setSelectedFragments((prev) => {
      const isAlreadySelected = prev.some(
        (sf) => sf.nftoken_id === fragment.nftoken_id
      );
      if (isAlreadySelected) {
        return prev.filter((sf) => sf.nftoken_id !== fragment.nftoken_id);
      } else {
        return [...prev, fragment];
      }
    });
  };

  // 로딩 상태
  if (loading) {
    return (
      <div className="min-h-screen bg-[#080808] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-400">작품 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error || !artworkData) {
    return (
      <div className="min-h-screen bg-[#080808] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">작품을 불러올 수 없습니다</p>
          <p className="text-gray-400">{error || 'Unknown error'}</p>
        </div>
      </div>
    );
  }

  // API 데이터를 mapper를 통해 변환
  const artworkDetail = ArtworkMapper.toArtworkDetail(artworkData);

  // API 데이터를 기반으로 fragments 생성 (임시로 모든 fragment를 available로 설정)
  // 실제로는 NFT 상태를 별도 API로 가져와야 함
  const fragments = artworkData.nfts;

  const soldCount = fragments.filter((f) => f.status === 'sold').length;
  const totalFragments = artworkDetail.gridN * artworkDetail.gridN;

  return (
    <div className="min-h-screen bg-[#080808] text-white p-8">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column */}
        <div className="space-y-6">
          <ImageGrid
            // imageUrl={artworkDetail.imageUrl}
            imageUrl={'/cat.jpg'}
            fragments={fragments}
            gridSize={artworkDetail.gridN}
            selectedFragments={selectedFragments}
            onFragmentClick={handleFragmentClick}
          />

          <h1 className="text-4xl font-bold">{artworkDetail.title}</h1>
          <p className="text-gray-400 whitespace-pre-wrap">
            {artworkDetail.description}
          </p>
          <div className="flex justify-between items-center border-t border-b border-gray-700 py-4">
            <div>
              <p className="text-sm text-gray-400">Size</p>
              <p className="font-medium">{artworkDetail.size}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Artist</p>
              <p className="font-medium">{artworkDetail.artistAddress}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Created</p>
              <p className="font-medium">
                {new Date(artworkDetail.createdAt).toLocaleDateString('ko-KR')}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Investment Overview */}

          <div className="bg-[#1A1A1A] rounded-lg p-6 relative">
            <BorderBeam duration={16} size={240} />

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
                    style={{
                      width: `${(soldCount / totalFragments) * 100}%`,
                    }}
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
                  ${artworkDetail.priceInDollars.toLocaleString()} USD
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Fragment Price</span>
                <span className="font-bold">
                  ${artworkDetail.fragmentPriceInDollars.toLocaleString()} USD
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
                <span className="text-gray-400">Created</span>
                <span>
                  {new Date(artworkDetail.createdAt).toLocaleDateString(
                    'ko-KR'
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Metadata URI</span>
                <span className="text-xs text-gray-500 truncate max-w-[200px]">
                  {artworkDetail.metadataUriBase}
                </span>
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
