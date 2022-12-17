import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { PrismaService } from '../common/utils/prisma.service';
import { UsersService } from '../users/users.service';

@Module({
  imports: [],
  controllers: [TeamsController],
  providers: [TeamsService, PrismaService, UsersService],
  exports: [TeamsService],
})
export class TeamsModule {}
