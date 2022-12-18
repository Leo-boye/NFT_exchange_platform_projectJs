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
} from '@nestjs/common';
import { NftsService } from './nfts.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorRequestDto } from '../common/dtos/errors';
import { NftCreateDto, NftDto, NftRatingDto, NftStatusDto } from './dtos/nfts';
import { TeamsService } from '../teams/teams.service';
import { JwtDto } from '../auth/dtos/auth';
import { UsersService } from '../users/users.service';
import { canChangeStatus, isPublished } from '../common/utils/status';
import { isAdmin } from '../common/utils/role';
import { OptionalJwtAuth } from '../auth/jwt-auth.decorator';
import { SellsService } from '../sells/sells.service';

@Controller('nfts')
@ApiTags('NFTs management')
@ApiBearerAuth('JWT-auth')
@ApiResponse({ status: 401, type: ErrorRequestDto })
export class NftsController {
  constructor(
    private readonly nftsService: NftsService,
    private readonly teamsService: TeamsService,
    private readonly usersService: UsersService,
    private readonly sellsService: SellsService,
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

  @Get('/topRated')
  @OptionalJwtAuth()
  @ApiOperation({ description: 'Show best rated nfts' })
  @ApiQuery({ name: 'offset', required: false, example: 0 })
  @ApiQuery({ name: 'limit', required: false, example: 5 })
  @ApiResponse({ status: 200, type: Array<NftDto> })
  async bestRatedNfts(
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ): Promise<Array<NftDto>> {
    return await this.nftsService.getBestRatedNfts(offset, limit);
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
  @ApiOperation({ description: 'Create nft and set user as owner of this nft' })
  @ApiResponse({ status: 201, type: NftDto })
  @ApiResponse({ status: 400, type: ErrorRequestDto })
  @ApiResponse({ status: 409, type: ErrorRequestDto })
  async createNft(@Body() nft: NftCreateDto, @Req() req): Promise<NftDto> {
    const requestUser = req.user as JwtDto;
    const user = await this.usersService.getUserById(requestUser.id);
    if (!isAdmin(user.role) && !user.teamId)
      throw new BadRequestException('You not in a team');

    const res = await this.nftsService.createNft(nft, user.id);
    console.log(
      `[${Date.now()}] Nft created\n  owner: ${res.ownerId}\n  status: ${
        res.status
      }\nimage: ${res.image}`,
    );
    return res;
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

    return await this.nftsService.updateNftStatus(nftId, nftStatus.status);
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
    if (!isAdmin(user.role) && !user.teamId)
      throw new BadRequestException('You not in a team');

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
    await this.sellsService.createNewSell({
      buyerId: user.id,
      sellerId: oldOwner.id,
      nftId: nft.id,
      collectionId: nft.collectionId,
    });
    const res = await this.nftsService.updateNftOwner(nftId, user.id);
    console.log(
      `[${Date.now()}] Nft buy\n  buyer: ${user.id}\n  seller: ${
        oldOwner.id
      }\n  nft: ${nft.id}` + nft.collectionId
        ? `\n  collection: ${nft.collectionId}`
        : '',
    );
    return res;
  }
}
