import {
  Body,
  Controller,
  Get,
  NotImplementedException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { NftsService } from './nfts.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorRequestDto } from '../common/dtos/errors';
import { NftDto, NftRatingDto, NftUpdateDto } from './dtos/nfts';
import { Nft } from '@prisma/client';
import { CreateNftDto } from './dtos/create-nft.dto';

@Controller('nfts')
@ApiTags('NFTs management')
export class nftsController {
  constructor(private readonly nftsService: NftsService) {}

  // FIXME: do not return Prisma type "Nft"
  @Get('')
  @ApiResponse({ status: 200, type: Array<Nft> })
  @ApiResponse({ status: 400, type: ErrorRequestDto })
  async getAllNft(): Promise<Array<Nft>> {
    return this.nftsService.getAllNft({});
  }

  @Get(':nftId')
  @ApiResponse({ status: 200, type: Array<NftDto> })
  @ApiResponse({ status: 400, type: ErrorRequestDto })
  async getNft(
    @Param('nftId', ParseUUIDPipe) nftId: string,
  ): Promise<Array<NftDto>> {
    // TODO
    throw new NotImplementedException();
  }

  @Post('')
  @ApiResponse({ status: 200, type: NftDto })
  @ApiResponse({ status: 400, type: ErrorRequestDto })
  async createNft(@Body() nft: CreateNftDto): Promise<Nft> {
    return this.nftsService.createNft(nft);
  }

  @Patch(':nftId')
  @ApiResponse({ status: 200, type: NftDto })
  @ApiResponse({ status: 400, type: ErrorRequestDto })
  @ApiResponse({ status: 404, type: ErrorRequestDto })
  async updateNft(
    @Param('nftId', ParseUUIDPipe) id: string,
    @Body() nft: NftUpdateDto,
  ): Promise<NftDto> {
    // TODO
    throw new NotImplementedException();
  }

  @Patch('rate/:nftId')
  @ApiResponse({ status: 200, type: NftDto })
  @ApiResponse({ status: 400, type: ErrorRequestDto })
  @ApiResponse({ status: 404, type: ErrorRequestDto })
  async rateNft(
    @Param('nftId', ParseUUIDPipe) id: string,
    @Body() nftRating: NftRatingDto,
  ): Promise<NftDto> {
    // TODO
    throw new NotImplementedException();
  }

  @Patch('sold/:nftId')
  @ApiResponse({ status: 200, type: NftDto })
  @ApiResponse({ status: 400, type: ErrorRequestDto })
  @ApiResponse({ status: 404, type: ErrorRequestDto })
  async soldNft(@Param('nftId', ParseUUIDPipe) id: string): Promise<NftDto> {
    // TODO
    throw new NotImplementedException();
  }
}
