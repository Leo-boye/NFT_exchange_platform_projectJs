import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Nft, Prisma } from '@prisma/client';
import { CreateNftDto } from './dtos/create-nft.dto';

@Injectable()
export class NftsService {
  constructor(private prisma: PrismaService) {}

  async getAllNft(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<Nft[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.nft.findMany({ skip, take, cursor, where, orderBy });
  }

  async createNft(nft: CreateNftDto): Promise<Nft> {
    return this.prisma.nft.create({
      data: {
        name: nft.name,
        image: nft.image,
        price: nft.price,
        status: 'DRAFT',
        owner: {
          connect: {
            id: nft.userId,
          },
        },
      },
    });
  }
}
