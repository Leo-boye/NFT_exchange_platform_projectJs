import {
  BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  NotFoundException,
  NotImplementedException,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { NftsService } from './nfts.service';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorRequestDto } from '../common/dtos/errors';
import { NftCreateDto, NftDto, NftRatingDto, NftStatusDto } from './dtos/nfts';

@Controller('nfts')
@ApiTags('NFTs management')
export class nftsController {
  constructor(private readonly nftsService: NftsService) {}

  @Get('')
  @ApiOperation({
    summary: 'ADMIN ONLY',
    description: 'Get all nfts',
  })
  @ApiQuery({ name: 'offset', required: false, example: 0 })
  @ApiQuery({ name: 'limit', required: false, example: 100 })
  @ApiResponse({ status: 200, type: Array<NftDto> })
  async getAllNft(
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe) limit: number,
  ): Promise<Array<NftDto>> {
    return this.nftsService.getAllNfts(offset, limit);
  }

  @Get(':nftId')
  @ApiOperation({
    summary: 'ADMIN ONLY',
    description: 'Get nft from ID',
  })
  @ApiParam({
    name: 'nftId',
    required: true,
    allowEmptyValue: false,
    example: '59c78745-aa9e-4930-b338-214aff8b07be',
  })
  @ApiResponse({ status: 200, type: NftDto })
  @ApiResponse({ status: 400, type: ErrorRequestDto })
  @ApiResponse({ status: 404, type: ErrorRequestDto })
  async getNftById(
    @Param('nftId', ParseUUIDPipe) nftId: string,
  ): Promise<NftDto> {
    const res = await this.nftsService.getNftById(nftId);
    if (res) return res;
    throw new NotFoundException('NFT ID not found');
  }

  @Post('')
  @ApiOperation({
    description: 'Create nft and set user as owner of this nft',
  })
  @ApiResponse({ status: 201, type: NftDto })
  @ApiResponse({ status: 400, type: ErrorRequestDto })
  @ApiResponse({ status: 409, type: ErrorRequestDto })
  async createNft(@Body() nft: NftCreateDto): Promise<NftDto> {
    // FIXME
    const userId = 'c6365738-7d4b-4ae3-b638-93542288f500';
    return this.nftsService.createNft(nft, userId);
  }

  @Patch(':nftId')
  @ApiOperation({
    summary: 'ADMIN ONLY',
    description: 'Update nft status',
  })
  @ApiParam({
    name: 'nftId',
    required: true,
    allowEmptyValue: false,
    example: '59c78745-aa9e-4930-b338-214aff8b07be',
  })
  @ApiResponse({ status: 200, type: NftDto })
  @ApiResponse({ status: 400, type: ErrorRequestDto })
  @ApiResponse({ status: 404, type: ErrorRequestDto })
  @ApiResponse({ status: 409, type: ErrorRequestDto })
  async updateNftStatus(
    @Param('nftId', ParseUUIDPipe) nftId: string,
    @Body() nftStatus: NftStatusDto,
  ): Promise<NftDto> {
    const nft = await this.nftsService.getNftById(nftId);
    if (!nft) throw new NotFoundException('NFT ID not found');
    if (nftStatus.status < nft.status)
      throw new BadRequestException('Cannot downgrade status');
    return this.nftsService.updateNftStatus(nftId, nftStatus.status);
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
