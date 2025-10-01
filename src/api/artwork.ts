import httpV1 from './http';
import type {
  RegisterMintRequestDTO,
  RegisterMintResponseDTO,
} from '@/src/dto/artwork';

/**
 * 작품 등록 및 NFT 민팅 API
 * @param data 작품 등록 및 민팅 요청 데이터
 * @returns RegisterMintResponse
 */
export const registerAndMintArtwork = async (
  data: RegisterMintRequestDTO
): Promise<RegisterMintResponseDTO> => {
  const formData = new FormData();

  // 필수 필드들 추가
  formData.append('image', data.image);
  formData.append('title', data.title);
  formData.append('description', data.description);
  formData.append('year', data.year);
  formData.append('size', data.size);
  formData.append('medium', data.medium);
  formData.append('price_usd', data.price_usd.toString());
  formData.append('grid_n', data.grid_n.toString());
  formData.append('artist_address', data.artist_address);

  // 선택적 필드들 추가 (기본값 설정)
  formData.append('flags', (data.flags ?? 9).toString());
  formData.append('transfer_fee', (data.transfer_fee ?? 0).toString());
  formData.append('taxon', (data.taxon ?? 0).toString());

  const response = await httpV1.post<RegisterMintResponseDTO>(
    '/nfts/artworks/register-mint',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
};
