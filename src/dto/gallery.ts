export interface Gallery {
  id: number;
  wallet_address: string;
  name: string;
  email: string;
  description: string;
  website: string;
  profile_image_url: string;
}

export interface GalleryArtist {
  id: number;
  wallet_address: string;
  name: string;
  email: string;
  profile_image_url: string;
  gallery_id: number;
}
