import {
  Body,
  Controller,
  NotImplementedException,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { NftsService } from './nfts.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestErrorDto } from '../common/dtos/errors';
import { NftDto, UpdateNftRatingDto, UpdateNftStatusDto } from './dtos/nfts';

@Controller('nfts')
export class nftsController {
  constructor(private readonly nftsService: NftsService) {}

  @Patch('status/:id')
  @ApiTags('NFTs management')
  @ApiResponse({ status: 200, type: NftDto })
  @ApiResponse({ status: 400, type: BadRequestErrorDto })
  async updateNftStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateNftStatusDto,
  ): Promise<NftDto> {
    // TODO
    throw new NotImplementedException();
  }

  @Patch('rate/:id')
  @ApiTags('NFTs management')
  @ApiResponse({ status: 200, type: NftDto })
  @ApiResponse({ status: 400, type: BadRequestErrorDto })
  async updateNftRating(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateNftRatingDto,
  ): Promise<NftDto> {
    // TODO
    throw new NotImplementedException();
  }

  @Patch('sold/:id')
  @ApiTags('NFTs management')
  @ApiResponse({ status: 200, type: NftDto })
  @ApiResponse({ status: 400, type: BadRequestErrorDto })
  async updateNftOwner(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateNftRatingDto,
  ): Promise<NftDto> {
    // TODO
    throw new NotImplementedException();
  }
}
