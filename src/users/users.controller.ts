import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserCreateDto, UserDto, UserWithPasswordDto } from './dtos/users';
import { ErrorRequestDto } from '../common/dtos/errors';

@Controller('users')
@ApiTags('Users management')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  @ApiOperation({
    summary: 'ADMIN ONLY',
    description: 'Get all users',
  })
  @ApiQuery({ name: 'offset', required: false, example: 0 })
  @ApiQuery({ name: 'limit', required: false, example: 100 })
  @ApiResponse({ status: 200, type: Array<UserDto> })
  async getAllUsers(
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe) limit: number,
  ): Promise<Array<UserDto>> {
    return await this.usersService.getAllUsers(offset, limit);
  }

  @Get(':userId')
  @ApiOperation({
    summary: 'ADMIN ONLY',
    description: 'Get user from ID',
  })
  @ApiParam({
    name: 'userId',
    required: true,
    allowEmptyValue: false,
    example: '59c78745-aa9e-4930-b338-214aff8b07be',
  })
  @ApiResponse({ status: 200, type: UserDto })
  @ApiResponse({ status: 404, type: ErrorRequestDto })
  async getUserById(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<UserDto> {
    const res = await this.usersService.getUserById(userId);
    if (res) return res;
    throw new NotFoundException('User ID not found');
  }

  @Post('')
  @ApiResponse({ status: 201, type: UserWithPasswordDto })
  @ApiResponse({ status: 400, type: ErrorRequestDto })
  @ApiResponse({ status: 409, type: ErrorRequestDto })
  async createUser(@Body() user: UserCreateDto): Promise<UserWithPasswordDto> {
    return await this.usersService.createUser(user);
  }
}
