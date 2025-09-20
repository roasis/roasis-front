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
  dimensions: string;
  totalPrice: number;
  count: number;
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

export interface ArtistRegisterFormDTO {
  artist_wallet_address: 'string';
}
