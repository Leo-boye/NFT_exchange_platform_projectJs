import {
  BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { NftsService } from './nfts.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiConsumes,
} from '@nestjs/swagger';
import { ErrorRequestDto } from '../common/dtos/errors';
import { NftCreateDto, NftDto, NftRatingDto, NftStatusDto, NftUpdateDto } from './dtos/nfts';
import { TeamsService } from '../teams/teams.service';
import { JwtDto } from '../auth/dtos/auth';
import { UsersService } from '../users/users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../common/utils/file';
import { canChangeStatus, isPublished } from '../common/utils/status';
import { isAdmin } from '../common/utils/role';
import { OptionalJwtAuth } from '../auth/jwt-auth.decorator';

@Controller('nfts')
@ApiTags('NFTs management')
@ApiBearerAuth('JWT-auth')
@ApiResponse({ status: 401, type: ErrorRequestDto })
export class nftsController {
  constructor(
    private readonly nftsService: NftsService,
    private readonly teamsService: TeamsService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  @OptionalJwtAuth()
  @ApiOperation({ description: 'Get all nfts' })
  @ApiQuery({ name: 'offset', required: false, example: 0 })
  @ApiQuery({ name: 'limit', required: false, example: 100 })
  @ApiResponse({ status: 200, type: Array<NftDto> })
  async getAllNfts(
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe) limit: number,
    @Req() req,
  ): Promise<Array<NftDto>> {
    const requestUser = req.user as JwtDto;
    const user = requestUser
      ? await this.usersService.getUserById(requestUser.id)
      : null;
    return await this.nftsService.getAllNfts(offset, limit, user);
  }

  @Get(':nftId')
  @OptionalJwtAuth()
  @ApiOperation({ description: 'Get nft from ID' })
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
    @Req() req,
  ): Promise<NftDto> {
    const requestUser = req.user as JwtDto;
    const user = requestUser
      ? await this.usersService.getUserById(requestUser.id)
      : null;

    const res = await this.nftsService.getNftById(nftId);
    console.log(res);
    if (
      res &&
      ((user && isAdmin(user.role)) ||
        isPublished(res.status) ||
        (user && res.ownerId === user.id))
    )
      return res;
    throw new NotFoundException('NFT ID not found');
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ description: 'Create nft and set user as owner of this nft' })
  @ApiResponse({ status: 201, type: NftDto })
  @ApiResponse({ status: 400, type: ErrorRequestDto })
  @ApiResponse({ status: 409, type: ErrorRequestDto })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/nfts/',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async createNft(@Body() nft: NftCreateDto, @UploadedFile() file: Express.Multer.File, @Req() req): Promise<NftDto> {
    // FIXME: file is save even if dto validator fails
    const requestUser = req.user as JwtDto;
    const user = await this.usersService.getUserById(requestUser.id);
    if (!user.teamId) throw new BadRequestException('You not in a team');

    return this.nftsService.createNft(nft, user.id);
  }

  @Patch(':nftId')
  @ApiOperation({ description: 'Update nft status' })
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
    @Req() req,
  ): Promise<NftDto> {
    const requestUser = req.user as JwtDto;
    const user = await this.usersService.getUserById(requestUser.id);
    if (!isAdmin(user.role) && !user.teamId)
      throw new BadRequestException('You not in a team');

    const nft = await this.nftsService.getNftById(nftId);
    if (!nft) throw new NotFoundException('NFT ID not found');

    if (!isAdmin(user.role)) {
      if (nft.ownerId !== user.id)
        throw new BadRequestException('You not owner of this NFT');
      if (!canChangeStatus(nft.status, nftStatus.status))
        throw new BadRequestException('Cannot downgrade status');
    }

    return this.nftsService.updateNftStatus(nftId, nftStatus.status);
  }

  @Patch('rate/:nftId')
  @ApiOperation({ description: 'Rate nft (1-5)' })
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
  async rateNft(
    @Param('nftId', ParseUUIDPipe) nftId: string,
    @Body() nftRating: NftRatingDto,
    @Req() req,
  ): Promise<NftDto> {
    // FIXME: un user peut actuellement voter autant de fois qu'il veut, faudrait faire une table dédiée au vote, mais flemme
    const requestUser = req.user as JwtDto;
    const user = await this.usersService.getUserById(requestUser.id);
    if (!user.teamId) throw new BadRequestException('You not in a team');

    const nft = await this.nftsService.getNftById(nftId);
    if (!nft) throw new NotFoundException('NFT ID not found');

    if (!isAdmin(user.role)) {
      if (!isPublished(nft.status))
        throw new BadRequestException('Cannot rate non published nft');

      const teamNfts = await this.nftsService.getNftsByTeamId(user.teamId);
      if (teamNfts.find((nft) => nft.id === nftId))
        throw new BadRequestException('Cannot rate your own team NFT');
    }

    return await this.nftsService.updateNftRating(nftId, nftRating.rate);
  }

  @Patch('buy/:nftId')
  @ApiOperation({ description: 'Buy nft' })
  @ApiResponse({ status: 200, type: NftDto })
  @ApiResponse({ status: 400, type: ErrorRequestDto })
  @ApiResponse({ status: 404, type: ErrorRequestDto })
  @ApiResponse({ status: 409, type: ErrorRequestDto })
  async buyNft(
    @Param('nftId', ParseUUIDPipe) nftId: string,
    @Req() req,
  ): Promise<NftDto> {
    const requestUser = req.user as JwtDto;
    const user = await this.usersService.getUserById(requestUser.id);
    if (!user.teamId) throw new BadRequestException('You not in a team');

    const nft = await this.nftsService.getNftById(nftId);
    if (!nft) throw new NotFoundException('NFT ID not found');

    if (!isAdmin(user.role) && !isPublished(nft.status))
      throw new BadRequestException('Cannot buy non published nft');

    const team = await this.teamsService.getTeamById(user.teamId);
    if (team.balance < nft.price)
      throw new BadRequestException('Not enough money');

    const oldOwner = await this.usersService.getUserById(nft.ownerId);
    await this.teamsService.updateTeamBalance(user.teamId, nft.price, 'remove');
    await this.teamsService.updateTeamBalance(
      oldOwner.teamId,
      nft.price,
      'add',
    );
    return await this.nftsService.updateNftOwner(nftId, user.id);
  }
}
