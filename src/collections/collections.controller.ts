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
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorRequestDto } from '../common/dtos/errors';
import {
  CollectionCreateDto,
  CollectionDto,
  CollectionUpdateDto,
} from './dtos/collections';

@Controller('collections')
@ApiTags('Collections management')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Get()
  @ApiQuery({ name: 'offset', required: false, example: 0 })
  @ApiQuery({ name: 'limit', required: false, example: 100 })
  @ApiResponse({ status: 201, type: CollectionDto })
  @ApiResponse({ status: 400, type: ErrorRequestDto })
  async getCollection(
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe) limit: number,
  ): Promise<CollectionDto[]> {
    return this.collectionsService.getAllCollection(offset, limit);
  }

  @Post()
  @ApiResponse({ status: 201, type: CollectionDto })
  @ApiResponse({ status: 400, type: ErrorRequestDto })
  async createCollection(
    @Body() collection: CollectionCreateDto,
  ): Promise<CollectionDto> {
    return this.collectionsService.createCollection(collection);
  }

  @Patch(':collectionId')
  @ApiResponse({ status: 200, type: CollectionDto })
  @ApiResponse({ status: 400, type: ErrorRequestDto })
  @ApiResponse({ status: 404, type: ErrorRequestDto })
  async updateCollection(
    @Param('collectionId', ParseUUIDPipe) id: string,
    @Body() collection: CollectionUpdateDto,
  ): Promise<CollectionDto> {
    // TODO
    return this.collectionsService.updateCollection(collection, id);
  }
}
