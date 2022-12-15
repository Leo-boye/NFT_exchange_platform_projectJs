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
  Req,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorRequestDto } from '../common/dtos/errors';
import { TeamCreateDto, TeamDto, TeamUpdateBalanceDto } from './dtos/teams';
import { UsersService } from '../users/users.service';
import { AdminOnly } from '../common/guards/roles.decorator';
import { JwtDto } from '../auth/dtos/auth';

@Controller('teams')
@ApiTags('Teams management')
@ApiBearerAuth('JWT-auth')
@ApiResponse({ status: 401, type: ErrorRequestDto })
export class TeamsController {
  constructor(
    private readonly teamsService: TeamsService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  @AdminOnly()
  @ApiOperation({ description: 'Get all teams' })
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
  @AdminOnly()
  @ApiOperation({ description: 'Get team from ID' })
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

  @Post()
  @ApiOperation({
    description: 'Create team, add user on it and set user as team leader',
  })
  @ApiResponse({ status: 201, type: TeamDto })
  @ApiResponse({ status: 400, type: ErrorRequestDto })
  @ApiResponse({ status: 409, type: ErrorRequestDto })
  async createTeam(@Body() team: TeamCreateDto, @Req() req): Promise<TeamDto> {
    const requestUser = req.user as JwtDto;
    const user = await this.usersService.getUserById(requestUser.id);
    if (user.teamId) throw new BadRequestException('User already in a team');
    const createdTeam = await this.teamsService.createTeam(team);
    await this.usersService.updateTeamUser(
      requestUser.id,
      createdTeam.id,
      true,
    );
    return createdTeam;
  }

  @Patch('invite/:userId')
  @ApiOperation({ description: 'Invite user on team' })
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
    @Req() req,
  ): Promise<boolean> {
    const requestUser = req.user as JwtDto;
    const user = await this.usersService.getUserById(requestUser.id);
    if (!user.teamId) throw new BadRequestException('You not in a team');

    const invitedUser = await this.usersService.getUserById(userId);
    if (!invitedUser) throw new NotFoundException('User ID not found');
    if (invitedUser.teamId)
      throw new BadRequestException('User already in a team');

    await this.usersService.updateTeamUser(userId, user.teamId);
    return true;
  }

  @Patch('add/:teamId/:userId')
  @AdminOnly()
  @ApiOperation({ description: 'Add user on team' })
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
  @AdminOnly()
  @ApiOperation({ description: 'Set balance of team' })
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
      'replace',
    );
  }
}
