import type { GeneralUserInfo, GalleryUserInfo } from '@/src/stores/authStore';
import { GeneralUserInfoRequest, GalleryUserInfoRequest } from '@/src/dto/auth';

export class AuthMapper {
  static toGeneralUserInfoDTO(
    userInfo: GeneralUserInfo,
    walletAddress: string
  ): GeneralUserInfoRequest {
    return {
      wallet_address: walletAddress,
      profile: {
        name: userInfo.name,
        email: userInfo.email,
        image_url: userInfo.imageUrl,
      },
    };
  }

  static toGalleryUserInfoDTO(
    userInfo: GalleryUserInfo,
    walletAddress: string
  ): GalleryUserInfoRequest {
    return {
      wallet_address: walletAddress,
      profile: {
        name: userInfo.name,
        email: userInfo.email,
        image_url: userInfo.imageUrl,
        description: userInfo.description,
        website: userInfo.website,
        file_urls: userInfo.fileUrls,
      },
    };
  }
}
