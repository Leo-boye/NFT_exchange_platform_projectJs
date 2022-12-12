import {
  Body,
  Controller,
  NotImplementedException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { NftsService } from './nfts.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestErrorDto, NotFoundErrorDto } from '../common/dtos/errors';
import {
  NftCreateDto,
  NftDto,
  NftUpdateRatingDto,
  NftUpdateStatusDto,
} from './dtos/nfts';

@Controller('nfts')
export class nftsController {
  constructor(private readonly nftsService: NftsService) {}

  @Post('')
  @ApiTags('NFTs management')
  @ApiResponse({ status: 200, type: NftDto })
  @ApiResponse({ status: 400, type: BadRequestErrorDto })
  async createNft(@Body() nft: NftCreateDto): Promise<NftDto> {
    // TODO
    throw new NotImplementedException();
  }

  @Patch('status/:id')
  @ApiTags('NFTs management')
  @ApiResponse({ status: 200, type: NftDto })
  @ApiResponse({ status: 400, type: BadRequestErrorDto })
  @ApiResponse({ status: 404, type: NotFoundErrorDto })
  async updateNftStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() nftStatus: NftUpdateStatusDto,
  ): Promise<NftDto> {
    // TODO
    throw new NotImplementedException();
  }

  @Patch('rate/:id')
  @ApiTags('NFTs management')
  @ApiResponse({ status: 200, type: NftDto })
  @ApiResponse({ status: 400, type: BadRequestErrorDto })
  @ApiResponse({ status: 404, type: NotFoundErrorDto })
  async rateNft(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() nftRating: NftUpdateRatingDto,
  ): Promise<NftDto> {
    // TODO
    throw new NotImplementedException();
  }

  @Patch('sold/:id')
  @ApiTags('NFTs management')
  @ApiResponse({ status: 200, type: NftDto })
  @ApiResponse({ status: 400, type: BadRequestErrorDto })
  @ApiResponse({ status: 404, type: NotFoundErrorDto })
  async soldNft(@Param('id', ParseUUIDPipe) id: string): Promise<NftDto> {
    // TODO
    throw new NotImplementedException();
  }
}
