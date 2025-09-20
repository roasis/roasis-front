export interface MarKetPlaceArtwork {
  id: number;
  title: string;
  artist: string;
  verifier: string;
  price: string;
  imageUrl: string;
}

export interface RegisterArtwork {
  title: string;
  description: string;
  year: string;
  medium: string;
  size: string; // dimensions를 size로 변경 (API 요구사항에 맞춤)
  totalPrice: number;
  count: number; // grid_n으로 매핑됨
  image: File | null;
}

export interface Fragment {
  id: string;
  position: number;
  price: number;
  status: 'available' | 'sold' | 'reserved';
  owner?: string;
  xrplTokenId?: string;
}

export interface RegisterMintRequestDTO {
  image: File;
  title: string;
  description: string;
  year: string;
  size: string;
  medium: string;
  price_usd: number;
  grid_n: number;
  artist_address: string;
  flags?: number;
  transfer_fee?: number;
  taxon?: number;
}

export interface RegisterMintResponseDTO {
  artwork_id: number;
  image_cid: string;
  image_uri: string;
  metadata_cid: string;
  metadata_uri_base: string;
  metadata_http_url: string;
  minted: number;
  failed: number;
  tx_hashes: string[];
  nftoken_ids: (string | null)[];
  status: string;
}

export interface InviteArtistRequestDTO {
  artist_wallet_address: string;
}

export interface InviteArtistResponseDTO {
  message: string;
  artist_id: number;
  gallery_id: number;
}

export interface InviteArtist422ResponseDTO {
  detail: [
    {
      loc: ['string', 0];
      msg: 'string';
      type: 'string';
    }
  ];
}
