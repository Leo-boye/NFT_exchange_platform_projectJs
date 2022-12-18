import { Injectable } from '@nestjs/common';
import { Status } from '@prisma/client';
import { PrismaService } from '../common/utils/prisma.service';
import { NftCreateDto, NftDto } from './dtos/nfts';
import { isAdmin } from '../common/utils/role';
import { UserDto } from '../users/dtos/users';

@Injectable()
export class NftsService {
  constructor(private prisma: PrismaService) {}

  async getAllNfts(
    offset: number,
    limit: number,
    user: UserDto | null,
  ): Promise<Array<NftDto>> {
    let filter;
    if (user && isAdmin(user.role)) {
      filter = {};
    } else if (user) {
      filter = { OR: [{ status: 'PUBLISHED' }, { ownerId: user.id }] };
    } else {
      filter = { status: 'PUBLISHED' };
    }
    return await this.prisma.nft.findMany({
      where: filter,
      skip: offset,
      take: limit,
    });
  }

  async getNftById(nftId: string): Promise<NftDto | null> {
    return await this.prisma.nft.findUnique({
      where: { id: nftId },
    });
  }

  async getNftsByTeamId(teamId: string): Promise<Array<NftDto>> {
    return await this.prisma.nft.findMany({
      where: {
        owner: {
          teamId: teamId,
        },
      },
      include: { owner: true },
    });
  }

  async createNft(nft: NftCreateDto, ownerId: string): Promise<NftDto> {
    return await this.prisma.nft.create({
      data: {
        name: nft.name,
        image: nft.file.path,
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

  async getBestRatedNfts(
    offset: number,
    limit: number,
  ): Promise<Array<NftDto>> {
    return await this.prisma.nft.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: [
        {
          rating: 'desc',
        },
        {
          ratingCount: 'desc',
        },
        {
          name: 'desc',
        },
      ],
      skip: offset,
      take: limit,
    });
  }
}
