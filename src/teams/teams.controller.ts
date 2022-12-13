import {
  BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorRequestDto } from '../common/dtos/errors';
import { TeamCreateDto, TeamDto, TeamUpdateBalanceDto } from './dtos/teams';
import { UsersService } from '../users/users.service';

@Controller('teams')
@ApiTags('Teams management')
export class TeamsController {
  constructor(
    private readonly teamsService: TeamsService,
    private readonly usersService: UsersService,
  ) {}

  @Get('')
  @ApiOperation({
    summary: 'ADMIN ONLY',
    description: 'Get all teams',
  })
  @ApiQuery({ name: 'offset', required: false, example: 0 })
  @ApiQuery({ name: 'limit', required: false, example: 100 })
  @ApiResponse({ status: 200, type: Array<TeamDto> })
  async getAllTeams(
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe) limit: number,
  ): Promise<Array<TeamDto>> {
    return await this.teamsService.getAllTeams(offset, limit);
  }

  @Get(':teamId')
  @ApiOperation({
    summary: 'ADMIN ONLY',
    description: 'Get team from ID',
  })
  @ApiParam({
    name: 'teamId',
    required: true,
    allowEmptyValue: false,
    example: '59c78745-aa9e-4930-b338-214aff8b07be',
  })
  @ApiResponse({ status: 200, type: TeamDto })
  @ApiResponse({ status: 400, type: ErrorRequestDto })
  @ApiResponse({ status: 404, type: ErrorRequestDto })
  async getTeamById(
    @Param('teamId', ParseUUIDPipe) teamId: string,
  ): Promise<TeamDto> {
    const res = await this.teamsService.getTeamById(teamId);
    if (res) return res;
    throw new NotFoundException('Team ID not found');
  }

  @Post('')
  @ApiOperation({
    description: 'Create team, add user on it and set user as team leader',
  })
  @ApiResponse({ status: 201, type: TeamDto })
  @ApiResponse({ status: 400, type: ErrorRequestDto })
  @ApiResponse({ status: 409, type: ErrorRequestDto })
  async createTeam(@Body() team: TeamCreateDto): Promise<TeamDto> {
    // FIXME
    return await this.teamsService.createTeam(team);
  }

  @Patch('invite/:userId')
  @ApiOperation({
    description: 'Invite user on team',
  })
  @ApiParam({
    name: 'userId',
    required: true,
    allowEmptyValue: false,
    example: '59c78745-aa9e-4930-b338-214aff8b07be',
  })
  @ApiResponse({ status: 200, type: Boolean })
  @ApiResponse({ status: 400, type: ErrorRequestDto })
  @ApiResponse({ status: 404, type: ErrorRequestDto })
  @ApiResponse({ status: 409, type: ErrorRequestDto })
  async inviteUserOnTeam(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<boolean> {
    const user = await this.usersService.getUserById(userId);
    if (!user) throw new NotFoundException('User ID not found');
    if (user.teamId) throw new BadRequestException('User already in a team');
    // FIXME
    const teamId = 'c6365738-7d4b-4ae3-b638-93542288f500';
    await this.usersService.updateTeamUser(userId, teamId);
    return true;
  }

  @Patch('add/:teamId/:userId')
  @ApiOperation({
    summary: 'ADMIN ONLY',
    description: 'Add user on team',
  })
  @ApiParam({
    name: 'teamId',
    required: true,
    allowEmptyValue: false,
    example: '59c78745-aa9e-4930-b338-214aff8b07be',
  })
  @ApiParam({
    name: 'userId',
    required: true,
    allowEmptyValue: false,
    example: '59c78745-aa9e-4930-b338-214aff8b07be',
  })
  @ApiResponse({ status: 200, type: Boolean })
  @ApiResponse({ status: 400, type: ErrorRequestDto })
  @ApiResponse({ status: 404, type: ErrorRequestDto })
  @ApiResponse({ status: 409, type: ErrorRequestDto })
  async addUserOnTeam(
    @Param('teamId', ParseUUIDPipe) teamId: string,
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<boolean> {
    const team = await this.teamsService.getTeamById(teamId);
    if (!team) throw new NotFoundException('Team ID not found');

    const user = await this.usersService.getUserById(userId);
    if (!user) throw new NotFoundException('User ID not found');
    if (user.teamId) throw new BadRequestException('User already in a team');

    await this.usersService.updateTeamUser(userId, teamId);
    return true;
  }

  @Patch('balance/:teamId')
  @ApiOperation({
    summary: 'ADMIN ONLY',
    description: 'Set balance of team',
  })
  @ApiParam({
    name: 'teamId',
    required: true,
    allowEmptyValue: false,
    example: '59c78745-aa9e-4930-b338-214aff8b07be',
  })
  @ApiResponse({ status: 200, type: TeamDto })
  @ApiResponse({ status: 400, type: ErrorRequestDto })
  @ApiResponse({ status: 404, type: ErrorRequestDto })
  @ApiResponse({ status: 409, type: ErrorRequestDto })
  async updateTeamBalance(
    @Param('teamId', ParseUUIDPipe) teamId: string,
    @Body() teamBalance: TeamUpdateBalanceDto,
  ): Promise<TeamDto> {
    const team = await this.teamsService.getTeamById(teamId);
    if (!team) throw new NotFoundException('Team ID not found');
    return await this.teamsService.updateTeamBalance(
      teamId,
      teamBalance.balance,
    );
  }
}
