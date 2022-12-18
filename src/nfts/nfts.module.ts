import { Module } from '@nestjs/common';
import { NftsService } from './nfts.service';
import { NftsController } from './nfts.controller';
import { PrismaService } from '../common/utils/prisma.service';
import { TeamsService } from '../teams/teams.service';
import { UsersService } from '../users/users.service';
import { SellsService } from '../sells/sells.service';

@Module({
  controllers: [NftsController],
  providers: [
    NftsService,
    PrismaService,
    TeamsService,
    UsersService,
    SellsService,
  ],
})
export class NftsModule {}
