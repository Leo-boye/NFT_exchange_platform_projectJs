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
import {
  NftCreateDto,
  NftDto,
  NftUpdateRatingDto,
  NftUpdateStatusDto,
} from './dtos/nfts';

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

  @Patch('status/:id')
  @ApiResponse({ status: 200, type: NftDto })
  @ApiResponse({ status: 400, type: ErrorBadRequestDto })
  @ApiResponse({ status: 404, type: ErrorNotFoundDto })
  async updateNftStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() nftStatus: NftUpdateStatusDto,
  ): Promise<NftDto> {
    // TODO
    throw new NotImplementedException();
  }

  @Patch('rate/:id')
  @ApiResponse({ status: 200, type: NftDto })
  @ApiResponse({ status: 400, type: ErrorBadRequestDto })
  @ApiResponse({ status: 404, type: ErrorNotFoundDto })
  async rateNft(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() nftRating: NftUpdateRatingDto,
  ): Promise<NftDto> {
    // TODO
    throw new NotImplementedException();
  }

  @Patch('sold/:id')
  @ApiResponse({ status: 200, type: NftDto })
  @ApiResponse({ status: 400, type: ErrorBadRequestDto })
  @ApiResponse({ status: 404, type: ErrorNotFoundDto })
  async soldNft(@Param('id', ParseUUIDPipe) id: string): Promise<NftDto> {
    // TODO
    throw new NotImplementedException();
  }
}
