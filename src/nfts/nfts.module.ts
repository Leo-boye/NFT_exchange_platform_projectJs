import { Module } from '@nestjs/common';
import { NftsService } from './nfts.service';
import { nftsController } from './nfts.controller';
import { PrismaService } from '../common/utils/prisma.service';
import { TeamsService } from '../teams/teams.service';

@Module({
  controllers: [nftsController],
  providers: [NftsService, PrismaService, TeamsService],
})
export class NftsModule {}
