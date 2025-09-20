import type {
  RegisterMintRequestDTO,
  RegisterMintResponseDTO,
  RegisterArtwork,
  ArtworkDetail,
  ArtworkListResponseDTO,
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

  /**
   * API ArtworkResponse를 프론트엔드에서 사용할 형식으로 변환
   */
  static toArtworkDetail(response: ArtworkDetail) {
    return {
      id: response.id,
      title: response.title,
      description: response.description,
      size: response.size,
      priceUsd: response.price_usd,
      gridN: response.grid_n,
      imageUrl: response.image_url,
      metadataUriBase: response.metadata_uri_base,
      artistAddress: response.artist_address,
      createdAt: response.created_at,
      // 가격을 센트 단위에서 달러 단위로 변환
      priceInDollars: response.price_usd / 100,
      // 프래그먼트 가격 계산
      fragmentPrice: Math.floor(
        response.price_usd / (response.grid_n * response.grid_n)
      ),
      fragmentPriceInDollars:
        Math.floor(response.price_usd / (response.grid_n * response.grid_n)) /
        100,
    };
  }

  /**
   * 작품 ID를 URL 파라미터에서 추출
   */
  static parseArtworkId(id: string): number | null {
    const artworkId = parseInt(id, 10);
    return isNaN(artworkId) ? null : artworkId;
  }

  /**
   * API ArtworkListResponse를 마켓플레이스에서 사용할 형식으로 변환
   */
  static toMarketplaceArtwork(response: ArtworkListResponseDTO) {
    return {
      id: response.id,
      title: response.title,
      artist: response.artist_address, // artist_address를 artist로 매핑
      verifier: 'Verified by Gallery', // 임시로 고정값 사용
      price: `$${(response.price_usd / 100).toLocaleString()} RLUSD`,
      imageUrl: response.image_url,
      soldFragments: 0, // 임시로 0으로 설정 (실제로는 NFT 상태를 확인해야 함)
      totalFragments: 9, // 임시로 9로 설정 (실제로는 grid_n 정보가 필요함)
      size: response.size,
      createdAt: response.created_at,
      priceUsd: response.price_usd,
    };
  }

  /**
   * 작품 목록을 마켓플레이스 형식으로 변환
   */
  static toMarketplaceArtworks(responses: ArtworkListResponseDTO[]) {
    return responses.map((response) => this.toMarketplaceArtwork(response));
  }
}
