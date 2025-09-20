'use client';
import { useModal } from '@/src/hooks/useModal';
import { createPortal } from 'react-dom';

export default function Modal({ children }: { children: React.ReactNode }) {
  const { closeModal } = useModal();

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
      onClick={handleOutsideClick}
    >
      <div className="bg-transparent w-full flex justify-center items-center">
        {children}
      </div>
    </div>,
    document.body
  );
}
