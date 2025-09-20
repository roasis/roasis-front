import httpV1 from './http';
import type { Gallery, GalleryArtist } from '../dto/gallery';

export const getGalleries = async (): Promise<Gallery[]> => {
  const response = await httpV1.get('/galleries/');
  return response.data;
};

export const getGalleryById = async (id: string): Promise<Gallery> => {
  const response = await httpV1.get(`/galleries/${id}`);
  return response.data;
};

export const getArtistsByGalleryId = async (id: string): Promise<GalleryArtist[]> => {
  const response = await httpV1.get(`/galleries/${id}/artists`);
  return response.data;
};
