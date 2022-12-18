import {
  BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { CollectionsService } from './collections.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorRequestDto } from '../common/dtos/errors';
import {
  CollectionCreateDto,
  CollectionDto,
  CollectionUpdateDto,
} from './dtos/collections';
import { JwtDto } from '../auth/dtos/auth';
import { UsersService } from '../users/users.service';
import {
  canChangeStatus,
  canEditElement,
  isPublished,
} from '../common/utils/status';
import { isAdmin } from '../common/utils/role';
import { OptionalJwtAuth } from '../auth/jwt-auth.decorator';

@Controller('collections')
@ApiTags('Collections management')
@ApiBearerAuth('JWT-auth')
@ApiResponse({ status: 401, type: ErrorRequestDto })
export class CollectionsController {
  constructor(
    private readonly collectionsService: CollectionsService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  @OptionalJwtAuth()
  @ApiOperation({ description: 'Get all collections' })
  @ApiQuery({ name: 'offset', required: false, example: 0 })
  @ApiQuery({ name: 'limit', required: false, example: 100 })
  @ApiResponse({ status: 200, type: Array<CollectionDto> })
  async getAllCollections(
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe) limit: number,
    @Req() req,
  ): Promise<Array<CollectionDto>> {
    const requestUser = req.user as JwtDto;
    const user = requestUser
      ? await this.usersService.getUserById(requestUser.id)
      : null;
    return await this.collectionsService.getAllCollections(offset, limit, user);
  }

  @Get('/bestSeller')
  @OptionalJwtAuth()
  @ApiOperation({ description: 'Get best seller collections' })
  @ApiQuery({ name: 'offset', required: false, example: 0 })
  @ApiQuery({ name: 'limit', required: false, example: 5 })
  @ApiResponse({ status: 200, type: Array<CollectionDto> })
  async getBestSellerCollections(
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ): Promise<Array<CollectionDto>> {
    return await this.collectionsService.getBestSellerCollections(
      offset,
      limit,
    );
  }

  @Get(':collectionId')
  @OptionalJwtAuth()
  @ApiOperation({ description: 'Get all collections' })
  @ApiParam({
    name: 'collectionId',
    required: true,
    allowEmptyValue: false,
    example: '59c78745-aa9e-4930-b338-214aff8b07be',
  })
  @ApiResponse({ status: 200, type: CollectionDto })
  @ApiResponse({ status: 400, type: ErrorRequestDto })
  @ApiResponse({ status: 404, type: ErrorRequestDto })
  async getCollectionById(
    @Param('collectionId', ParseUUIDPipe) collectionId: string,
    @Req() req,
  ): Promise<CollectionDto> {
    const requestUser = req.user as JwtDto;
    const user = requestUser
      ? await this.usersService.getUserById(requestUser.id)
      : null;

    const res = await this.collectionsService.getCollectionById(collectionId);
    if (
      res &&
      ((user && isAdmin(user.role)) ||
        isPublished(res.status) ||
        (user && user.isTeamOwner && res.teamId === user.teamId))
    )
      return res;
    throw new BadRequestException('Collection ID not found');
  }

  @Post()
  @ApiOperation({ description: 'Create collection' })
  @ApiResponse({ status: 201, type: CollectionDto })
  @ApiResponse({ status: 400, type: ErrorRequestDto })
  @ApiResponse({ status: 409, type: ErrorRequestDto })
  async createCollection(
    @Body() collection: CollectionCreateDto,
    @Req() req,
  ): Promise<CollectionDto> {
    const requestUser = req.user as JwtDto;
    const user = await this.usersService.getUserById(requestUser.id);
    if (!user.teamId) throw new BadRequestException('You not in a team');

    return await this.collectionsService.createCollection(
      collection,
      user.teamId,
      user.name,
    );
  }

  @Patch(':collectionId')
  @ApiOperation({ description: 'Update collection' })
  @ApiParam({
    name: 'collectionId',
    required: true,
    allowEmptyValue: false,
    example: '59c78745-aa9e-4930-b338-214aff8b07be',
  })
  @ApiResponse({ status: 200, type: CollectionDto })
  @ApiResponse({ status: 400, type: ErrorRequestDto })
  @ApiResponse({ status: 404, type: ErrorRequestDto })
  @ApiResponse({ status: 409, type: ErrorRequestDto })
  async updateCollection(
    @Param('collectionId', ParseUUIDPipe) collectionId: string,
    @Body() collection: CollectionUpdateDto,
    @Req() req,
  ): Promise<CollectionDto> {
    const requestUser = req.user as JwtDto;
    const user = await this.usersService.getUserById(requestUser.id);
    if (!user.teamId) throw new BadRequestException('You not in a team');

    const currentCollection = await this.collectionsService.getCollectionById(
      collectionId,
    );

    if (!isAdmin(user.role)) {
      if (!user.isTeamOwner || user.teamId !== currentCollection.teamId)
        throw new BadRequestException('You not the team owner');
      if (!canEditElement(currentCollection.status))
        throw new BadRequestException('Cannot edit archived collection');
      if (
        collection.status &&
        !canChangeStatus(currentCollection.status, collection.status)
      )
        throw new BadRequestException('Cannot downgrade status');
    }

    return await this.collectionsService.updateCollection(
      collection,
      collectionId,
    );
  }
}
