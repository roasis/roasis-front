'use client';
import { useModal } from '@/src/hooks/useModal';
import { Building2, User, X } from 'lucide-react';
import UserTypeCard from './UserTypeCard';
import { UserRole } from '@/src/dto/auth';
import { useAuthStore } from '@/src/stores/authStore';
import GeneralModalContent from './GeneralModalContent';
import GalleryModalContent from './GalleryModalContent';
import { useDisconnect, useSession } from '@walletconnect/modal-sign-react';
import { getSdkError } from '@walletconnect/utils';

export default function SelectUserTypeModalContent() {
  const { closeModal, openModal } = useModal();
  const { setSelectedUserType } = useAuthStore();
  const session = useSession();
  const { disconnect } = useDisconnect({
    topic: session?.topic || '',
    reason: getSdkError('USER_DISCONNECTED'),
  });

  const handleContinue = (type: UserRole) => {
    setSelectedUserType(type);
    // 사용자 타입에 따라 다음 모달 열기
    if (type === UserRole.USER) {
      openModal(<GeneralModalContent />);
    } else if (type === UserRole.GALLERY) {
      openModal(<GalleryModalContent />);
    }
  };

  const handleCloseModal = async () => {
    try {
      // 모달을 닫기 전에 지갑 연결 해제
      if (session) {
        await disconnect();
      }
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    } finally {
      closeModal();
    }
  };

  return (
    <div className="relative bg-gray-900 border border-blue-500 rounded-lg p-8 max-w-md w-full mx-4">
      {/* Close Button */}
      <button
        onClick={handleCloseModal}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Sign In</h2>
        <p className="text-gray-400">Select your account type</p>
      </div>

      {/* User Type Selection */}
      <div className="flex gap-4">
        <UserTypeCard
          title="Gallery"
          description="I manage a gallery"
          icon={<Building2 className="w-12 h-12 text-blue-500" />}
          onClick={() => handleContinue(UserRole.GALLERY)}
        />
        <UserTypeCard
          title="User & Artist"
          description="I collect or make artworks"
          icon={<User className="w-12 h-12 text-blue-500" />}
          onClick={() => handleContinue(UserRole.USER)}
        />
      </div>
    </div>
  );
}
