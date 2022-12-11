import {
  Body,
  Controller,
  NotImplementedException,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserCreatedDto, UserCreateDto } from './dtos/users';
import { BadRequestErrorDto } from '../common/dtos/errors';
import { TeamCreateDto, TeamDto } from './dtos/teams';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/users')
  @ApiTags('Users management')
  @ApiResponse({ status: 200, type: UserCreatedDto })
  @ApiResponse({ status: 400, type: BadRequestErrorDto })
  async createUser(@Body() user: UserCreateDto): Promise<UserCreatedDto> {
    // TODO
    throw new NotImplementedException();
  }

  @Post('/teams/create')
  @ApiTags('Teams management')
  @ApiResponse({ status: 200, type: TeamDto })
  @ApiResponse({ status: 400, type: BadRequestErrorDto })
  async createTeam(@Body() team: TeamCreateDto): Promise<TeamDto> {
    // TODO
    throw new NotImplementedException();
  }

  @Post('/teams/invite/:id')
  @ApiTags('Teams management')
  @ApiResponse({ status: 200, type: Boolean })
  @ApiResponse({ status: 400, type: BadRequestErrorDto })
  async inviteUserOnTeam(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<boolean> {
    // TODO
    throw new NotImplementedException();
  }

  @Post('/teams/add/:id')
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
