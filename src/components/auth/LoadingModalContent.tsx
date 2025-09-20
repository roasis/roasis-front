'use client';
import { useModal } from '@/src/hooks/useModal';
import { X } from 'lucide-react';

interface LoadingModalContentProps {
  title?: string;
  message?: string;
  showCloseButton?: boolean;
}

export default function LoadingModalContent({
  title,
  message,
  showCloseButton = false,
}: LoadingModalContentProps) {
  const { closeModal } = useModal();

  return (
    <div className="relative bg-gray-900 border border-blue-500 rounded-lg p-8 max-w-md w-full mx-4">
      {/* Close Button - 조건부 렌더링 */}
      {showCloseButton && (
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      )}

      {/* Header */}
      <div className="text-center mb-8">
        {/* Loading Spinner */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            {/* Outer ring */}
            <div className="w-16 h-16 border-4 border-gray-700 rounded-full"></div>
            {/* Animated spinner */}
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>

        {/* Message */}
        <p className="text-gray-300 text-lg leading-relaxed">{message}</p>
      </div>
    </div>
  );
}
