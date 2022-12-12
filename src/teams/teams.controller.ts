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
import { ErrorBadRequestDto, ErrorNotFoundDto } from '../common/dtos/errors';
import { TeamCreateDto, TeamDto } from './dtos/teams';

@Controller('teams')
@ApiTags('Teams management')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post('')
  @ApiResponse({ status: 200, type: TeamDto })
  @ApiResponse({ status: 400, type: ErrorBadRequestDto })
  async createTeam(@Body() team: TeamCreateDto): Promise<TeamDto> {
    // TODO
    throw new NotImplementedException();
  }

  @Patch('invite/:userId')
  @ApiResponse({ status: 200, type: Boolean })
  @ApiResponse({ status: 400, type: ErrorBadRequestDto })
  @ApiResponse({ status: 404, type: ErrorNotFoundDto })
  async inviteUserOnTeam(
    @Param('userId', ParseUUIDPipe) id: string,
  ): Promise<boolean> {
    // TODO
    throw new NotImplementedException();
  }

  // TODO: setup route as admin only route
  @Patch('add/:userId')
  @ApiResponse({ status: 200, type: Boolean })
  @ApiResponse({ status: 400, type: ErrorBadRequestDto })
  @ApiResponse({ status: 404, type: ErrorNotFoundDto })
  async addUserOnTeam(
    @Param('userId', ParseUUIDPipe) id: string,
  ): Promise<boolean> {
    // TODO
    throw new NotImplementedException();
  }
}
