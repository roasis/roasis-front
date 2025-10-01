'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/src/components/ui/Button';
import { useRouter } from 'next/navigation';
import { inviteArtist } from '@/src/api/auth';

export default function ArtistsRegisterPage() {
  const router = useRouter();
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleWalletAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWalletAddress(e.target.value);
  };

  const validateForm = () => {
    if (!walletAddress.trim()) {
      setError('지갑 주소를 입력해주세요.');
      return false;
    }
    // 간단한 지갑 주소 형식 검증 (XRPL 주소 형식)
    if (!/^r[a-zA-Z0-9]{24,34}$/.test(walletAddress.trim())) {
      setError('올바른 XRPL 지갑 주소 형식을 입력해주세요.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await inviteArtist({
        artist_wallet_address: walletAddress.trim(),
      });

      alert(`아티스트 초대가 성공적으로 완료되었습니다!\n${response.message}`);
      router.push('/dashboard');
    } catch (err) {
      console.error('Artist invitation failed:', err);
      setError('아티스트 초대 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <div className="container mx-auto px-6 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <Link
            href="/dashboard"
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
            대시보드로 돌아가기
          </Link>
          <h1 className="text-3xl font-bold">아티스트 초대</h1>
          <p className="text-gray-400 mt-2">갤러리에 아티스트를 초대하세요</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 지갑 주소 입력 */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                초대할 아티스트 정보
              </h2>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="walletAddress"
                    className="block text-sm font-medium mb-2"
                  >
                    아티스트 지갑 주소 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="walletAddress"
                    name="walletAddress"
                    value={walletAddress}
                    onChange={handleWalletAddressChange}
                    placeholder="예: rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH"
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    초대할 아티스트의 XRPL 지갑 주소를 입력해주세요. (r로
                    시작하는 주소)
                  </p>
                </div>
              </div>
            </div>

            {/* 에러 메시지 */}
            {error && (
              <div className="bg-red-900/30 border border-red-700 rounded-lg p-4">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

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
                disabled={isSubmitting || !walletAddress.trim()}
                className="flex-1 bg-blue-600/80 hover:bg-blue-600 text-white py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
              >
                {isSubmitting ? '초대 중...' : '아티스트 초대'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
