import http from './http';
import type {
  AuthLoginRequest,
  AuthLoginResponse,
  GalleryUserInfoResponse,
  GeneralUserInfoResponse,
  UserInfoResponse,
} from '@/src/dto/auth';
import type {
  InviteArtistRequestDTO,
  InviteArtistResponseDTO,
} from '@/src/dto/artwork';
import { UserRole } from '@/src/dto/auth';
import { GalleryUserInfo, GeneralUserInfo } from '../stores/authStore';
import { AuthMapper } from '../mapper/auth';

// 로그인 API
export const login = async (
  data: AuthLoginRequest
): Promise<AuthLoginResponse> => {
  console.log('login data', data);
  const response = await http.post<AuthLoginResponse>('/auth/login', data);
  return response.data;
};

// General User 회원가입 API
export const registerGeneralUser = async (
  userInfo: GeneralUserInfo,
  walletAddress: string
): Promise<GeneralUserInfoResponse> => {
  const userInfoDTO = AuthMapper.toGeneralUserInfoDTO(userInfo, walletAddress);
  console.log('registerGeneralUser data', { userInfoDTO });
  const response = await http.post<GeneralUserInfoResponse>(
    '/auth/register/artist',
    {
      ...userInfoDTO,
    }
  );
  return response.data;
};

// Gallery User 회원가입 API
export const registerGalleryUser = async (
  userInfo: GalleryUserInfo,
  walletAddress: string
): Promise<GalleryUserInfoResponse> => {
  const userInfoDTO = AuthMapper.toGalleryUserInfoDTO(userInfo, walletAddress);
  console.log('registerGalleryUser data', { userInfoDTO });
  const response = await http.post<GalleryUserInfoResponse>(
    '/auth/register/gallery',
    {
      ...userInfoDTO,
    }
  );
  return response.data;
};

// 통합 회원가입 함수
export const registerUser = async (
  userType: UserRole,
  userInfo: GeneralUserInfo | GalleryUserInfo,
  walletAddress: string
): Promise<GeneralUserInfoResponse | GalleryUserInfoResponse> => {
  if (userType === UserRole.GALLERY) {
    return registerGalleryUser(userInfo as GalleryUserInfo, walletAddress);
  } else {
    return registerGeneralUser(userInfo as GeneralUserInfo, walletAddress);
  }
};

// 현재 사용자 정보 조회 API
export const getCurrentUser = async (): Promise<UserInfoResponse> => {
  const response = await http.get<UserInfoResponse>('/auth/me');
  return response.data;
};

// 갤러리 아티스트 초대 API
export const inviteArtist = async (
  data: InviteArtistRequestDTO
): Promise<InviteArtistResponseDTO> => {
  console.log('inviteArtist data', data);
  const response = await http.post<InviteArtistResponseDTO>(
    '/galleries/invite-artist',
    data
  );
  return response.data;
};
