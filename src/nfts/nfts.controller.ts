import {
  Body,
  Controller,
  NotImplementedException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { NftsService } from './nfts.service';
import { ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorBadRequestDto, ErrorNotFoundDto } from '../common/dtos/errors';
import { NftCreateDto, NftDto, NftRatingDto, NftUpdateDto } from './dtos/nfts';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../common/utils/file';

@Controller('nfts')
@ApiTags('NFTs management')
export class nftsController {
  constructor(private readonly nftsService: NftsService) {}

  @Post('')
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, type: NftDto })
  @ApiResponse({ status: 400, type: ErrorBadRequestDto })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/nfts/',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async createNft(
    @Body() nft: NftCreateDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<NftDto> {
    // FIXME: file is save even if dto validator fails
    // TODO
    console.log(nft);
    console.log(file);
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
