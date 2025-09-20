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

aaaa;
