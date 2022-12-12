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
import { ErrorBadRequestDto, ErrorNotFoundDto } from '../common/dtos/errors';
import { NftCreateDto, NftDto, NftRatingDto, NftUpdateDto } from './dtos/nfts';

@Controller('nfts')
@ApiTags('NFTs management')
export class nftsController {
  constructor(private readonly nftsService: NftsService) {}

  @Post('')
  @ApiResponse({ status: 200, type: NftDto })
  @ApiResponse({ status: 400, type: ErrorBadRequestDto })
  async createNft(@Body() nft: NftCreateDto): Promise<NftDto> {
    // TODO
    throw new NotImplementedException();
  }

  @Patch(':nftId')
  @ApiResponse({ status: 200, type: NftDto })
  @ApiResponse({ status: 400, type: ErrorBadRequestDto })
  @ApiResponse({ status: 404, type: ErrorNotFoundDto })
  async updateNft(
    @Param('nftId', ParseUUIDPipe) id: string,
    @Body() nft: NftUpdateDto,
  ): Promise<NftDto> {
    // TODO
    throw new NotImplementedException();
  }

  @Patch('rate/:nftId')
  @ApiResponse({ status: 200, type: NftDto })
  @ApiResponse({ status: 400, type: ErrorBadRequestDto })
  @ApiResponse({ status: 404, type: ErrorNotFoundDto })
  async rateNft(
    @Param('nftId', ParseUUIDPipe) id: string,
    @Body() nftRating: NftRatingDto,
  ): Promise<NftDto> {
    // TODO
    throw new NotImplementedException();
  }

  @Patch('sold/:nftId')
  @ApiResponse({ status: 200, type: NftDto })
  @ApiResponse({ status: 400, type: ErrorBadRequestDto })
  @ApiResponse({ status: 404, type: ErrorNotFoundDto })
  async soldNft(@Param('nftId', ParseUUIDPipe) id: string): Promise<NftDto> {
    // TODO
    throw new NotImplementedException();
  }
}
