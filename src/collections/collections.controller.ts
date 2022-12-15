import {
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
import { AdminOnly } from '../common/guards/roles.decorator';

@Controller('collections')
@ApiTags('Collections management')
@ApiBearerAuth('JWT-auth')
@ApiResponse({ status: 401, type: ErrorRequestDto })
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Get()
  @AdminOnly()
  @ApiOperation({ description: 'Get all collections' })
  @ApiQuery({ name: 'offset', required: false, example: 0 })
  @ApiQuery({ name: 'limit', required: false, example: 100 })
  @ApiResponse({ status: 200, type: Array<CollectionDto> })
  async getAllCollections(
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe) limit: number,
  ): Promise<Array<CollectionDto>> {
    return await this.collectionsService.getAllCollections(offset, limit);
  }

  @Get(':collectionId')
  @AdminOnly()
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
  ): Promise<CollectionDto> {
    return await this.collectionsService.getCollectionById(collectionId);
  }

  @Post()
  @ApiOperation({ description: 'Create collection' })
  @ApiResponse({ status: 201, type: CollectionDto })
  @ApiResponse({ status: 400, type: ErrorRequestDto })
  @ApiResponse({ status: 409, type: ErrorRequestDto })
  async createCollection(
    @Body() collection: CollectionCreateDto,
  ): Promise<CollectionDto> {
    return await this.collectionsService.createCollection(collection);
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
  ): Promise<CollectionDto> {
    return await this.collectionsService.updateCollection(
      collection,
      collectionId,
    );
  }
}
