import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/utils/prisma.service';
import { TeamCreateDto, TeamDto } from './dtos/teams';

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}

  async getAllTeams(offset: number, limit: number): Promise<Array<TeamDto>> {
    return await this.prisma.team.findMany({
      skip: offset,
      take: limit,
    });
  }

  async getTeamById(teamId: string): Promise<TeamDto | null> {
    return await this.prisma.team.findUnique({
      where: { id: teamId },
    });
  }

  async createTeam(team: TeamCreateDto): Promise<TeamDto> {
    return await this.prisma.team.create({
      data: {
        name: team.name,
      },
    });
  }

  async updateTeamBalance(
    teamId: string,
    balance: number,
    operationType: 'replace' | 'add' | 'remove',
  ): Promise<TeamDto> {
    let data;
    switch (operationType) {
      case 'replace':
        data = { balance: balance };
        break;
      case 'add':
        data = { balance: { increment: balance } };
        break;
      case 'remove':
        data = { balance: { decrement: balance } };
        break;
    }
    // FIXME: check if balance < 0 with "remove" operation
    return await this.prisma.team.update({
      where: { id: teamId },
      data: data,
    });
  }

  async getBestSellerTeams(
    offset: number,
    limit: number,
  ): Promise<Array<TeamDto>> {
    return await this.prisma.team.findMany({
      orderBy: [
        {
          // TODO
          name: 'asc',
        },
      ],
      skip: offset,
      take: limit,
    });
  }
}
