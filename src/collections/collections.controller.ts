import {
  Body,
  Controller,
  NotImplementedException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
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

  @Post('')
  @ApiResponse({ status: 201, type: CollectionDto })
  @ApiResponse({ status: 400, type: ErrorRequestDto })
  async createCollection(
    @Body() collection: CollectionCreateDto,
  ): Promise<CollectionDto> {
    // TODO
    throw new NotImplementedException();
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
    throw new NotImplementedException();
  }
}
