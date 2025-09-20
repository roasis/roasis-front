'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/src/components/ui/Button';
import type { RegisterArtwork } from '@/src/dto/artwork';
import { useRouter } from 'next/navigation';
import { registerAndMintArtwork } from '@/src/api/artwork';
import { useSession } from '@walletconnect/modal-sign-react';
import { ArtworkMapper } from '@/src/mapper/artwork';
import {
  optimizeImageWithProgress,
  validateImageFile,
  createImagePreview,
  type OptimizedImageResult,
} from '@/src/utils/imageOptimizer';

// TODO: form 필수 데이터 없을 때 매시지 표시
export default function RegisterArtworkPage() {
  const router = useRouter();
  const session = useSession();
  const walletAddress = session?.namespaces.xrpl.accounts[1].split(':')[2];
  const [artworkData, setArtworkData] = useState<RegisterArtwork>({
    title: '',
    description: '',
    year: '',
    medium: '',
    size: '',
    totalPrice: 0,
    count: 1,
    image: null,
  });

  const [imagePreview, setImagePreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationProgress, setOptimizationProgress] = useState(0);
  const [_optimizedImageInfo, setOptimizedImageInfo] =
    useState<OptimizedImageResult | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setArtworkData((prev) => ({
      ...prev,
      [name]: name === 'totalPrice' ? Number(value) : value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 이미지 파일 유효성 검사
    const validation = validateImageFile(file, 20); // 최대 20MB
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    setIsOptimizing(true);
    setOptimizationProgress(0);

    try {
      // 이미지 최적화
      const optimizedResult = await optimizeImageWithProgress(
        file,
        {
          maxWidth: 1920,
          maxHeight: 1920,
          quality: 0.8,
          format: 'jpeg',
          maintainAspectRatio: true,
        },
        (progress) => {
          setOptimizationProgress(progress);
        }
      );

      // 최적화된 이미지로 상태 업데이트
      setArtworkData((prev) => ({ ...prev, image: optimizedResult.file }));
      setOptimizedImageInfo(optimizedResult);

      // 미리보기 생성
      const previewUrl = await createImagePreview(optimizedResult.file);
      setImagePreview(previewUrl);

      // 최적화 결과 로그
      console.log('이미지 최적화 완료:', {
        원본크기: `${(optimizedResult.originalSize / 1024 / 1024).toFixed(
          2
        )}MB`,
        최적화크기: `${(optimizedResult.optimizedSize / 1024 / 1024).toFixed(
          2
        )}MB`,
        압축률: `${optimizedResult.compressionRatio}%`,
        원본해상도: `${optimizedResult.dimensions.original.width}x${optimizedResult.dimensions.original.height}`,
        최적화해상도: `${optimizedResult.dimensions.optimized.width}x${optimizedResult.dimensions.optimized.height}`,
      });
    } catch (error) {
      console.error('이미지 최적화 실패:', error);
      alert('이미지 최적화에 실패했습니다. 원본 이미지를 사용합니다.');

      // 실패 시 원본 이미지 사용
      setArtworkData((prev) => ({ ...prev, image: file }));
      const previewUrl = await createImagePreview(file);
      setImagePreview(previewUrl);
    } finally {
      setIsOptimizing(false);
      setOptimizationProgress(0);
    }
  };

  const handlePieceGridChange = (count: number) => {
    setArtworkData((prev) => ({
      ...prev,
      count: count,
    }));
  };

  const calculatePiecePrice = () => {
    const totalPieces = artworkData.count ** 2;
    return totalPieces > 0 ? Number(artworkData.totalPrice) / totalPieces : 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!walletAddress) {
      alert('지갑 주소가 없습니다. 먼저 지갑을 연결해주세요.');
      return;
    }

    if (!artworkData.image) {
      alert('작품 이미지를 업로드해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      // ArtworkMapper를 사용하여 데이터 변환
      const requestData = ArtworkMapper.toRegisterMintRequest(
        artworkData,
        walletAddress
      );

      const response = await registerAndMintArtwork(requestData);

      console.log('작품 등록 및 민팅 성공:', response);

      // ArtworkMapper를 사용하여 성공 메시지 생성
      const successMessage = ArtworkMapper.toSuccessMessage(response);
      alert(successMessage);

      // 성공 후 마켓플레이스로 이동
      router.push('/marketplace');
    } catch (error) {
      console.error('작품 등록 실패:', error);
      alert('작품 등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalPieces = artworkData.count ** 2;
  const piecePrice = calculatePiecePrice();

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <div className="container mx-auto px-6 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <Link
            href="/marketplace"
            className="inline-flex items-center text-gray-400 hover:text-white mb-4"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            마켓플레이스로 돌아가기
          </Link>
          <h1 className="text-3xl font-bold">작품 등록</h1>
          <p className="text-gray-400 mt-2">
            새로운 작품을 마켓플레이스에 등록하세요
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 왼쪽: 이미지 업로드 */}
          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
              {imagePreview ? (
                <div className="relative">
                  <Image
                    src={imagePreview}
                    alt="작품 미리보기"
                    width={400}
                    height={400}
                    className="w-full h-96 object-cover rounded-lg mx-auto"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview('');
                      setArtworkData((prev) => ({ ...prev, image: null }));
                      setOptimizedImageInfo(null);
                    }}
                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <div>
                  <svg
                    className="w-16 h-16 text-gray-400 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-lg font-medium mb-2">작품 이미지 업로드</p>
                  <p className="text-gray-400 mb-4">
                    최소 300dpi의 고해상도 이미지를 업로드하세요
                    <br />
                    <span className="text-sm">(자동으로 최적화됩니다)</span>
                  </p>

                  {/* 최적화 진행률 표시 */}
                  {isOptimizing && (
                    <div className="mb-4">
                      <div className="bg-gray-700 rounded-full h-2 mb-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${optimizationProgress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-400">
                        이미지 최적화 중... {optimizationProgress}%
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                    required
                  />
                  <label
                    htmlFor="image-upload"
                    className={`inline-block bg-brend/80 hover:bg-brend text-white px-6 py-3 rounded-lg transition-colors ${
                      isOptimizing
                        ? 'cursor-not-allowed opacity-50'
                        : 'cursor-pointer'
                    }`}
                  >
                    {isOptimizing ? '최적화 중...' : '이미지 선택'}
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* 오른쪽: 작품 정보 폼 */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 작품 기본 정보 */}
              <div className="bg-gray-900 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">작품 정보</h2>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium mb-2"
                    >
                      작품명 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={artworkData.title}
                      onChange={handleInputChange}
                      placeholder="예: 도시의 밤"
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium mb-2"
                    >
                      작품 설명 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={artworkData.description}
                      onChange={handleInputChange}
                      placeholder="작품에 대한 상세한 설명을 작성해주세요"
                      rows={4}
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="year"
                        className="block text-sm font-medium mb-2"
                      >
                        제작 연도 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="year"
                        name="year"
                        value={artworkData.year}
                        onChange={handleInputChange}
                        placeholder="예: 2024"
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="medium"
                        className="block text-sm font-medium mb-2"
                      >
                        재료 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="medium"
                        name="medium"
                        value={artworkData.medium}
                        onChange={handleInputChange}
                        placeholder="예: 캔버스에 유화"
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="size"
                      className="block text-sm font-medium mb-2"
                    >
                      크기 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="size"
                      name="size"
                      value={artworkData.size}
                      onChange={handleInputChange}
                      placeholder="예: 40cm x 60cm"
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* 가격 및 판매 방식 */}
              <div className="bg-gray-900 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">
                  가격 및 판매 방식
                </h2>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="totalPrice"
                      className="block text-sm font-medium mb-2"
                    >
                      전체 가격 (RLUSD) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="totalPrice"
                      name="totalPrice"
                      value={artworkData.totalPrice.toString()}
                      onChange={handleInputChange}
                      placeholder="5000000"
                      min="0"
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      조각투자 옵션 <span className="text-red-500">*</span>
                    </label>
                    <div>
                      <label
                        htmlFor="count"
                        className="block text-xs text-gray-400 mb-1"
                      >
                        조각 수 (n x n)
                      </label>
                      <select
                        id="count"
                        value={artworkData.count}
                        onChange={(e) =>
                          handlePieceGridChange(Number(e.target.value))
                        }
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">
                      총 {totalPieces}개 조각 ( {artworkData.count} ×{' '}
                      {artworkData.count} )
                    </p>
                  </div>

                  {Number(artworkData.totalPrice) > 0 && totalPieces > 0 && (
                    <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
                      <h3 className="font-medium text-blue-300 mb-2">
                        가격 계산
                      </h3>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>전체 가격:</span>
                          <span className="font-medium">
                            {artworkData.totalPrice.toLocaleString()} RLUSD
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>총 조각 수:</span>
                          <span className="font-medium">{totalPieces}개</span>
                        </div>
                        <div className="flex justify-between text-blue-300">
                          <span>조각당 가격:</span>
                          <span className="font-bold">
                            {Math.round(piecePrice).toLocaleString()} RLUSD
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 제출 버튼 */}
              <div className="flex space-x-4">
                <Button
                  onClick={() => router.back()}
                  disabled={false}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg transition-colors"
                >
                  취소
                </Button>
                <Button
                  disabled={
                    isSubmitting || !artworkData.title || !artworkData.image
                  }
                  className="flex-1 bg-brend/80 hover:bg-color-brend text-white py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                >
                  {isSubmitting ? '등록 중...' : '작품 등록'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
