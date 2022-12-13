import { Injectable } from '@nestjs/common';
import { Status } from '@prisma/client';
import { PrismaService } from '../common/utils/prisma.service';
import { NftCreateDto, NftDto } from './dtos/nfts';

@Injectable()
export class NftsService {
  constructor(private prisma: PrismaService) {}

  async getAllNfts(offset: number, limit: number): Promise<Array<NftDto>> {
    return await this.prisma.nft.findMany({
      skip: offset,
      take: limit,
    });
  }

  async getNftById(nftId: string): Promise<NftDto | null> {
    return await this.prisma.nft.findUnique({
      where: { id: nftId },
    });
  }

  async createNft(nft: NftCreateDto, ownerId: string): Promise<NftDto> {
    return await this.prisma.nft.create({
      data: {
        name: nft.name,
        image: nft.image,
        price: nft.price,
        status: nft.status,
        ownerId: ownerId,
      },
    });
  }

  async updateNftStatus(nftId: string, status: Status): Promise<NftDto> {
    return await this.prisma.nft.update({
      where: { id: nftId },
      data: { status: status },
    });
  }

  async updateNftRating(nftId: string, rating: number): Promise<NftDto | null> {
    const nft = await this.getNftById(nftId);
    if (!nft) return null;
    const newRatingCount = nft.ratingCount + 1;
    const newRating = (nft.rating * nft.ratingCount + rating) / newRatingCount;
    return await this.prisma.nft.update({
      where: { id: nftId },
      data: {
        rating: newRating,
        ratingCount: newRatingCount,
      },
    });
  }

  async updateNftOwner(nftId: string, ownerId: string): Promise<NftDto> {
    return await this.prisma.nft.update({
      where: { id: nftId },
      data: { ownerId: ownerId },
    });
  }
}
