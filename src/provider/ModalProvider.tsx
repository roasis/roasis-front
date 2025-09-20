'use client';
import { createContext, useState } from 'react';
import Modal from '../components/ui/Modal';

interface ModalContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType | null>(null);

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<React.ReactNode | null>(null);

  const openModal = (content: React.ReactNode) => {
    setIsOpen(true);
    setContent(content);
  };

  const closeModal = () => {
    setIsOpen(false);
    setContent(null);
  };

  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen, openModal, closeModal }}>
      {children}
      {isOpen && <Modal>{content}</Modal>}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
