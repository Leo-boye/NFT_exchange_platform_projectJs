import { Module } from '@nestjs/common';
import { SellsService } from './sells.service';
import { SellsController } from './sells.controller';
import { PrismaService } from '../common/utils/prisma.service';
import { UsersService } from '../users/users.service';

@Module({
  providers: [SellsService, PrismaService, UsersService],
  controllers: [SellsController],
})
export class SellsModule {}
