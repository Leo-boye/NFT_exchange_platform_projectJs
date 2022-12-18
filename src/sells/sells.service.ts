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

  async createNewSell(sell: SellCreateDto): Promise<SellDto> {
    return this.prisma.sell.create({
      data: {
        timestamp: Date.now().toString(),
        nftID: sell.nftID,
        sellerId: sell.sellerId,
        buyerId: sell.buyerId,
        collectionId: sell.collectionId,
      },
    });
  }
}
