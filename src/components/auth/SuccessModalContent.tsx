'use client';
import { useModal } from '@/src/hooks/useModal';
import { Check } from 'lucide-react';

interface SuccessModalContentProps {
  title: string;
  message: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export default function SuccessModalContent({
  title,
  message,
  primaryButtonText = 'Close',
  secondaryButtonText = 'View Collection',
  onPrimaryClick,
  onSecondaryClick,
}: SuccessModalContentProps) {
  const { closeModal } = useModal();

  const handlePrimaryClick = () => {
    if (onPrimaryClick) {
      onPrimaryClick();
    } else {
      closeModal();
    }
  };

  const handleSecondaryClick = () => {
    if (onSecondaryClick) {
      onSecondaryClick();
    }
  };

  return (
    <div className="relative bg-gray-900 border border-blue-500 rounded-lg p-8 max-w-md w-full mx-4">
      {/* Header */}
      <div className="text-center mb-8">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
            <Check className="w-8 h-8 text-white" strokeWidth={3} />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>

        {/* Message */}
        <p className="text-gray-300 text-lg leading-relaxed">{message}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        {/* Secondary Button */}
        <button
          onClick={handleSecondaryClick}
          className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          {secondaryButtonText}
        </button>

        {/* Primary Button */}
        <button
          onClick={handlePrimaryClick}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          {primaryButtonText}
        </button>
      </div>
    </div>
  );
}
