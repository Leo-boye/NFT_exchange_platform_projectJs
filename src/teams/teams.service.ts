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
}
