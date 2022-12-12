import {
  Body,
  Controller,
  NotImplementedException,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserCreatedDto, UserCreateDto } from './dtos/users';
import { BadRequestErrorDto } from '../common/dtos/errors';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('')
  @ApiTags('Users management')
  @ApiResponse({ status: 200, type: UserCreatedDto })
  @ApiResponse({ status: 400, type: BadRequestErrorDto })
  async createUser(@Body() user: UserCreateDto): Promise<UserCreatedDto> {
    // TODO
    throw new NotImplementedException();
  }
}
