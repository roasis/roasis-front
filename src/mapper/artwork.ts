import type {
  RegisterMintRequestDTO,
  RegisterMintResponseDTO,
  RegisterArtwork,
} from '@/src/dto/artwork';

export class ArtworkMapper {
  /**
   * 프론트엔드 RegisterArtwork 형식을 API RegisterMintRequest 형식으로 변환
   */
  static toRegisterMintRequest(
    artworkData: RegisterArtwork,
    artistAddress: string
  ): RegisterMintRequestDTO {
    return {
      image: artworkData.image!,
      title: artworkData.title,
      description: artworkData.description,
      year: artworkData.year,
      size: artworkData.size,
      medium: artworkData.medium,
      price_usd: artworkData.totalPrice,
      grid_n: artworkData.count,
      artist_address: artistAddress,
      flags: 9, // 기본값
      transfer_fee: 0, // 기본값
      taxon: 0, // 기본값
    };
  }

  /**
   * API RegisterMintResponse를 프론트엔드에서 사용할 형식으로 변환
   */
  static toRegisterMintResponse(response: RegisterMintResponseDTO) {
    return {
      artworkId: response.artwork_id,
      imageCid: response.image_cid,
      imageUri: response.image_uri,
      metadataCid: response.metadata_cid,
      metadataUriBase: response.metadata_uri_base,
      metadataHttpUrl: response.metadata_http_url,
      minted: response.minted,
      failed: response.failed,
      txHashes: response.tx_hashes,
      nftokenIds: response.nftoken_ids,
      status: response.status,
    };
  }

  /**
   * API 응답을 사용자 친화적인 메시지로 변환
   */
  static toSuccessMessage(response: RegisterMintResponseDTO): string {
    const { artwork_id, minted, failed } = response;

    let message = `작품이 성공적으로 등록되었습니다!\n작품 ID: ${artwork_id}\n민팅된 NFT: ${minted}개`;

    if (failed > 0) {
      message += `\n실패한 NFT: ${failed}개`;
    }

    return message;
  }
}
