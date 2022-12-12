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
import { BadRequestErrorDto, NotFoundErrorDto } from '../common/dtos/errors';
import { TeamCreateDto, TeamDto } from './dtos/teams';

@Controller('teams')
@ApiTags('Teams management')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post('create')
  @ApiResponse({ status: 200, type: TeamDto })
  @ApiResponse({ status: 400, type: BadRequestErrorDto })
  async createTeam(@Body() team: TeamCreateDto): Promise<TeamDto> {
    // TODO
    throw new NotImplementedException();
  }

  @Patch('invite/:id')
  @ApiResponse({ status: 200, type: Boolean })
  @ApiResponse({ status: 400, type: BadRequestErrorDto })
  @ApiResponse({ status: 404, type: NotFoundErrorDto })
  async inviteUserOnTeam(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<boolean> {
    // TODO
    throw new NotImplementedException();
  }

  // TODO: setup route as admin only route
  @Patch('add/:id')
  @ApiResponse({ status: 200, type: Boolean })
  @ApiResponse({ status: 400, type: BadRequestErrorDto })
  @ApiResponse({ status: 404, type: NotFoundErrorDto })
  async addUserOnTeam(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<boolean> {
    // TODO
    throw new NotImplementedException();
  }
}
