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
