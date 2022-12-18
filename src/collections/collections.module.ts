import { Module } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CollectionsController } from './collections.controller';
import { PrismaService } from '../common/utils/prisma.service';
import { UsersService } from '../users/users.service';
import { NftsService } from '../nfts/nfts.service';

@Module({
  controllers: [CollectionsController],
  providers: [CollectionsService, PrismaService, UsersService, NftsService],
})
export class CollectionsModule {}
