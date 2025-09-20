export interface AuthLoginRequest {
  wallet_address: string;
}

export interface AuthLoginResponse {
  access_token: string;
}

export interface AuthLogin422Response {
  detail: [
    {
      loc: ['string', 0];
      msg: 'string';
      type: 'string';
    }
  ];
}

export const enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GALLERY = 'gallery',
}

export interface GalleryUserInfoRequest {
  wallet_address: string;
  profile: {
    name: string;
    email: string;
    image_url?: string;
    description?: string;
    website?: string;
    file_urls?: string[];
  };
}

export interface GalleryUserInfoResponse {
  access_token: string;
}

export interface GalleryUserInfo422Response {
  detail: [
    {
      loc: ['string', 0];
      msg: 'string';
      type: 'string';
    }
  ];
}
export interface GeneralUserInfoRequest {
  wallet_address: string;
  profile: {
    name: string;
    email: string;
    image_url?: string;
  };
}

export interface GeneralUserInfoResponse {
  access_token: string;
}

export interface GeneralUserInfo422Response {
  detail: [
    {
      loc: ['string', 0];
      msg: 'string';
      type: 'string';
    }
  ];
}
