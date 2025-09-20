'use client';
import { useState } from 'react';
import { useModal } from '@/src/hooks/useModal';
import { useAuthStore } from '@/src/stores/authStore';
import { X, ArrowLeft } from 'lucide-react';
import SelectUserTypeModalContent from './SelectUserTypeModalContent';
import { registerUser } from '@/src/api/auth';

export default function GalleryModalContent() {
  const { closeModal, openModal } = useModal();
  const { galleryUserInfo, setGalleryUserInfo, getSubmitData, resetAuthState } =
    useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    field: keyof typeof galleryUserInfo,
    value: string
  ) => {
    setGalleryUserInfo({ ...galleryUserInfo, [field]: value });
  };

  const handleBack = () => {
    openModal(<SelectUserTypeModalContent />);
  };

  const handleSubmit = async () => {
    const submitData = getSubmitData();

    if (!submitData) {
      alert('모든 필수 필드를 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await registerUser(
        submitData.userType,
        submitData.userInfo,
        submitData.walletAddress
      );

      window.localStorage.setItem('access_token', result.access_token);
      alert('갤러리 회원가입이 완료되었습니다!');
      resetAuthState();
      closeModal();
    } catch (error) {
      console.error('Submit error:', error);
      alert('회원가입 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    galleryUserInfo.name.trim() && galleryUserInfo.email.trim();

  return (
    <div className="relative bg-gray-900 border border-blue-500 rounded-lg p-8 max-w-md w-full mx-4">
      {/* Close Button */}
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 text-white hover:text-gray-300 transition-colors"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      {/* Header */}
      <div className="text-center mb-8 mt-8">
        <h2 className="text-3xl font-bold text-white mb-2">Gallery User</h2>
        <p className="text-gray-400">Tell us about your gallery</p>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Gallery Name <strong className="text-red-500">*</strong>
          </label>
          <input
            type="text"
            value={galleryUserInfo.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            placeholder="Enter your gallery name"
            required
          />
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Email <strong className="text-red-500">*</strong>
          </label>
          <input
            type="email"
            value={galleryUserInfo.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Profile Image URL
          </label>
          <input
            type="url"
            value={galleryUserInfo.imageUrl}
            onChange={(e) => handleInputChange('imageUrl', e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            placeholder="https://example.com/gallery-logo.jpg"
          />
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Description
          </label>
          <textarea
            value={galleryUserInfo.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 h-20 resize-none"
            placeholder="Tell us about your gallery..."
          />
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Website
          </label>
          <input
            type="url"
            value={galleryUserInfo.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            placeholder="https://your-gallery-website.com"
          />
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Gallery Images
          </label>
          <input
            type="url"
            value={galleryUserInfo.fileUrls?.[0] || ''}
            onChange={(e) => {
              const newFileUrls = [...(galleryUserInfo.fileUrls || [])];
              newFileUrls[0] = e.target.value;
              setGalleryUserInfo({ ...galleryUserInfo, fileUrls: newFileUrls });
            }}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            placeholder="https://example.com/gallery-image1.jpg"
          />
          <p className="text-gray-400 text-xs mt-1">
            Add at least one gallery image URL
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-8">
        <button
          onClick={handleSubmit}
          disabled={!isFormValid || isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          {isSubmitting
            ? 'Creating Gallery Account...'
            : 'Create Gallery Account'}
        </button>
      </div>
    </div>
  );
}
