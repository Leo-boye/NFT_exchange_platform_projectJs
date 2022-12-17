import { Module } from '@nestjs/common';
import { NftsService } from './nfts.service';
import { NftsController } from './nftsController';
import { PrismaService } from '../common/utils/prisma.service';
import { TeamsService } from '../teams/teams.service';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [NftsController],
  providers: [NftsService, PrismaService, TeamsService, UsersService],
})
export class NftsModule {}
