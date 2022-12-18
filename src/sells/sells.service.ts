import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/utils/prisma.service';
import { SellCreateDto, SellDto } from './dto/sells';

@Injectable()
export class SellsService {
  constructor(private prisma: PrismaService) {}

  async getAllSells(offset: number, limit: number): Promise<Array<SellDto>> {
    return await this.prisma.sell.findMany({
      skip: offset,
      take: limit,
    });
  }

  async getSellById(sellId: string): Promise<SellDto | null> {
    return await this.prisma.sell.findUnique({
      where: { id: sellId },
    });
  }

  async createNewSell(sell: SellCreateDto): Promise<SellDto> {
    return this.prisma.sell.create({
      data: {
        datetime: new Date(Date.now()),
        buyerId: sell.buyerId,
        sellerId: sell.sellerId,
        nftId: sell.nftId,
        collectionId: sell.collectionId,
      },
    });
  }
}
