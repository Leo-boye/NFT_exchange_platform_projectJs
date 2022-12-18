import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SellsService } from './sells.service';
import { SellCreateDto, SellDto } from './dto/sells';
import { AdminOnly } from '../common/guards/roles.decorator';

@Controller('sells')
@ApiTags('NFTs sells management')
@ApiBearerAuth('JWT-auth')
export class SellsController {
  constructor(private readonly sellsService: SellsService) {}

  @Get()
  @AdminOnly()
  @ApiOperation({ description: 'Get all nft sells' })
  @ApiQuery({ name: 'offset', required: false, example: 0 })
  @ApiQuery({ name: 'limit', required: false, example: 100 })
  @ApiResponse({ status: 201, type: Array<SellDto> })
  async getSells(
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe) limit: number,
  ): Promise<Array<SellDto>> {
    return await this.sellsService.getAllSells(offset, limit);
  }

  @Post()
  @ApiOperation({ description: 'Create new sell between two user' })
  @ApiResponse({ status: 201, type: SellDto })
  async postSells(@Body() sell: SellCreateDto): Promise<SellDto> {
    return await this.sellsService.createNewSell(sell);
  }
}
