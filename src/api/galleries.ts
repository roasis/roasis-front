import httpV1 from './http';
import type { Gallery } from '../dto/gallery';

export const getGalleries = async (): Promise<Gallery[]> => {
  const response = await httpV1.get('/galleries/');
  return response.data;
};
