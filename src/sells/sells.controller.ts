import {
  BadRequestException,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SellsService } from './sells.service';
import { SellDto } from './dto/sells';
import { AdminOnly } from '../common/guards/roles.decorator';
import { ErrorRequestDto } from '../common/dtos/errors';
import { OptionalJwtAuth } from '../auth/jwt-auth.decorator';
import { JwtDto } from '../auth/dtos/auth';
import { UsersService } from '../users/users.service';
import { isAdmin } from '../common/utils/role';

@Controller('sells')
@ApiTags('NFTs sells management')
@ApiBearerAuth('JWT-auth')
export class SellsController {
  constructor(
    private readonly sellsService: SellsService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  @AdminOnly()
  @ApiOperation({ description: 'Get all nft sells' })
  @ApiQuery({ name: 'offset', required: false, example: 0 })
  @ApiQuery({ name: 'limit', required: false, example: 100 })
  @ApiResponse({ status: 200, type: Array<SellDto> })
  async getAllSells(
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe) limit: number,
  ): Promise<Array<SellDto>> {
    return await this.sellsService.getAllSells(offset, limit);
  }

  @Get('/latest')
  @OptionalJwtAuth()
  @ApiOperation({ description: 'Get latest sells' })
  @ApiQuery({ name: 'offset', required: false, example: 0 })
  @ApiQuery({ name: 'limit', required: false, example: 5 })
  @ApiResponse({ status: 200, type: Array<SellDto> })
  async getLatestSells(
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ): Promise<Array<SellDto>> {
    return await this.sellsService.getLatestSells(offset, limit);
  }

  @Get('/own')
  @ApiOperation({ description: 'Get own sells' })
  @ApiQuery({ name: 'offset', required: false, example: 0 })
  @ApiQuery({ name: 'limit', required: false, example: 5 })
  @ApiResponse({ status: 200, type: Array<SellDto> })
  async getOwnSells(
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
    @Req() req,
  ): Promise<Array<SellDto>> {
    const requestUser = req.user as JwtDto;
    const user = await this.usersService.getUserById(requestUser.id);
    // Weird but 'A user without team can only create a team or be invited to a team'
    if (!isAdmin(user.role) && !user.teamId)
      throw new BadRequestException('You not in a team');

    return await this.sellsService.getOwnSells(offset, limit, user.id);
  }

  @Get(':sellId')
  @AdminOnly()
  @ApiOperation({ description: 'Get nft sell by ID' })
  @ApiParam({
    name: 'sellId',
    required: true,
    allowEmptyValue: false,
    example: '59c78745-aa9e-4930-b338-214aff8b07be',
  })
  @ApiResponse({ status: 200, type: SellDto })
  @ApiResponse({ status: 400, type: ErrorRequestDto })
  @ApiResponse({ status: 404, type: ErrorRequestDto })
  async getSellById(@Param('sellId') sellId: string): Promise<SellDto> {
    return await this.sellsService.getSellById(sellId);
  }
}
