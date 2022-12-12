import { Module } from '@nestjs/common';
import { NftsService } from './nfts.service';
import { nftsController } from './nfts.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [nftsController],
  providers: [NftsService, PrismaService],
})
export class NftsModule {}
