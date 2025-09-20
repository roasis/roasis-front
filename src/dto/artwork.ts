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
