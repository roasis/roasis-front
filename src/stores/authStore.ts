'use client';
import { create } from 'zustand';
import { UserRole } from '@/src/dto/auth';

// General User 정보 타입
export interface GeneralUserInfo {
  name: string;
  email: string;
  imageUrl?: string;
}

// Gallery User 정보 타입
export interface GalleryUserInfo {
  name: string;
  email: string;
  imageUrl?: string;
  description?: string;
  website?: string;
  fileUrls?: string[];
}

// 인증 스토어 상태 타입
interface AuthState {
  // 사용자 타입 선택
  selectedUserType: UserRole | null;

  // General User 정보
  generalUserInfo: GeneralUserInfo;

  // Gallery User 정보
  galleryUserInfo: GalleryUserInfo;

  // 지갑 주소
  walletAddress: string | null;

  // 현재 모달 단계
  currentStep: 'select-type' | 'user-info' | 'submit';

  // 액션들
  setSelectedUserType: (type: UserRole) => void;
  setGeneralUserInfo: (info: GeneralUserInfo) => void;
  setGalleryUserInfo: (info: GalleryUserInfo) => void;
  setWalletAddress: (address: string) => void;
  setCurrentStep: (step: 'select-type' | 'user-info' | 'submit') => void;
  resetAuthState: () => void;

  // 제출용 데이터 가져오기
  getSubmitData: () => {
    userType: UserRole;
    userInfo: GeneralUserInfo | GalleryUserInfo;
    walletAddress: string;
  } | null;
}

// 초기 상태
const initialGeneralUserInfo: GeneralUserInfo = {
  name: '',
  email: '',
  imageUrl: '',
};

const initialGalleryUserInfo: GalleryUserInfo = {
  name: '',
  email: '',
  imageUrl: '',
  description: '',
  website: '',
  fileUrls: [],
};

export const useAuthStore = create<AuthState>((set, get) => ({
  // 초기 상태
  selectedUserType: null,
  generalUserInfo: initialGeneralUserInfo,
  galleryUserInfo: initialGalleryUserInfo,
  walletAddress: null,
  currentStep: 'select-type',

  // 액션들
  setSelectedUserType: (type: UserRole) => {
    set({ selectedUserType: type, currentStep: 'user-info' });
  },

  setGeneralUserInfo: (info: Partial<GeneralUserInfo>) => {
    set((state) => ({
      generalUserInfo: { ...state.generalUserInfo, ...info },
    }));
  },

  setGalleryUserInfo: (info: Partial<GalleryUserInfo>) => {
    set((state) => ({
      galleryUserInfo: { ...state.galleryUserInfo, ...info },
    }));
  },

  setWalletAddress: (address: string) => {
    set({ walletAddress: address });
  },

  setCurrentStep: (step: 'select-type' | 'user-info' | 'submit') => {
    set({ currentStep: step });
  },

  resetAuthState: () => {
    set({
      selectedUserType: null,
      generalUserInfo: initialGeneralUserInfo,
      galleryUserInfo: initialGalleryUserInfo,
      walletAddress: null,
      currentStep: 'select-type',
    });
  },

  getSubmitData: () => {
    const state = get();
    console.log('state', state);
    const {
      selectedUserType,
      generalUserInfo,
      galleryUserInfo,
      walletAddress,
    } = state;

    if (!selectedUserType || !walletAddress) {
      return null;
    }

    const userInfo =
      selectedUserType === UserRole.USER ? generalUserInfo : galleryUserInfo;

    return {
      userType: selectedUserType,
      userInfo,
      walletAddress,
    };
  },
}));
