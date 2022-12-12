import {
  Body,
  Controller,
  NotImplementedException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestErrorDto } from '../common/dtos/errors';
import { TeamCreateDto, TeamDto } from './dtos/teams';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post('create')
  @ApiTags('Teams management')
  @ApiResponse({ status: 200, type: TeamDto })
  @ApiResponse({ status: 400, type: BadRequestErrorDto })
  async createTeam(@Body() team: TeamCreateDto): Promise<TeamDto> {
    // TODO
    throw new NotImplementedException();
  }

  @Patch('invite/:id')
  @ApiTags('Teams management')
  @ApiResponse({ status: 200, type: Boolean })
  @ApiResponse({ status: 400, type: BadRequestErrorDto })
  async inviteUserOnTeam(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<boolean> {
    // TODO
    throw new NotImplementedException();
  }

  // TODO: setup route as admin only route
  @Patch('add/:id')
  @ApiTags('Teams management')
  @ApiResponse({ status: 200, type: Boolean })
  @ApiResponse({ status: 400, type: BadRequestErrorDto })
  async addUserOnTeam(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<boolean> {
    // TODO
    throw new NotImplementedException();
  }
}
