'use client';
import { useState } from 'react';
import { useModal } from '@/src/hooks/useModal';
import { Building2, User, X } from 'lucide-react';
import UserTypeCard from './UserTypeCard';
import { UserRole } from '@/src/dto/auth';

export default function SelectUserTypeModalContent() {
  const { closeModal } = useModal();
  const [selectedType, setSelectedType] = useState<UserRole | null>(null);

  const handleUserTypeSelect = (type: UserRole) => {
    setSelectedType(type);
    // TODO: 실제 로그인 로직 구현
    console.log('Selected user type:', type);
    // closeModal(); // 로그인 성공 후 모달 닫기
  };

  return (
    <div className="relative bg-gray-900 border border-blue-500 rounded-lg p-8 max-w-md w-full mx-4">
      {/* Close Button */}
      <button
        onClick={closeModal}
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
          title="Gallery User"
          description="I manage a gallery"
          icon={<Building2 className="w-12 h-12 text-blue-500" />}
          isSelected={selectedType === UserRole.GALLERY}
          onClick={() => handleUserTypeSelect(UserRole.GALLERY)}
        />
        <UserTypeCard
          title="General User"
          description="I collect or make artworks"
          icon={<User className="w-12 h-12 text-blue-500" />}
          isSelected={selectedType === UserRole.USER}
          onClick={() => handleUserTypeSelect(UserRole.USER)}
        />
      </div>

      {/* Continue Button */}
      {selectedType && (
        <div className="mt-6">
          <button
            onClick={() => {
              // TODO: 실제 로그인 로직 구현
              console.log('Continue with:', selectedType);
              closeModal();
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
