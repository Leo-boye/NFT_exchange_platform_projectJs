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
    return this.prisma.nft.create({
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
    return this.prisma.nft.update({
      where: { id: nftId },
      data: { status: status },
    });
  }
}
