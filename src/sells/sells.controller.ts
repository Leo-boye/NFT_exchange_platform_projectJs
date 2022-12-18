import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SellsService } from './sells.service';
import { SellDto } from './dto/sells';
import { AdminOnly } from '../common/guards/roles.decorator';
import { ErrorRequestDto } from '../common/dtos/errors';

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
  @ApiResponse({ status: 200, type: Array<SellDto> })
  async getAllSells(
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe) limit: number,
  ): Promise<Array<SellDto>> {
    return await this.sellsService.getAllSells(offset, limit);
  }

  @Get(':sellId')
  @AdminOnly()
  @ApiOperation({ description: 'Get nft sell by ID' })
  @ApiParam({
    name: 'sellId',
    required: true,
    allowEmptyValue: false,
    example: '59c78745-aa9e-4930-b338-214aff8b07be',
  })
  @ApiResponse({ status: 200, type: SellDto })
  @ApiResponse({ status: 400, type: ErrorRequestDto })
  @ApiResponse({ status: 404, type: ErrorRequestDto })
  async getSellById(@Param('sellId') sellId: string): Promise<SellDto> {
    return await this.sellsService.getSellById(sellId);
  }
}
