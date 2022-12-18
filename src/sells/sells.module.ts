import { Module } from '@nestjs/common';
import { SellsService } from './sells.service';
import { SellsController } from './sells.controller';
import { PrismaService } from '../common/utils/prisma.service';

@Module({
  providers: [SellsService, PrismaService],
  controllers: [SellsController],
})
export class SellsModule {}
