import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserCreatedDto } from './dtos/users';
import { ErrorBadRequestDto } from '../common/dtos/errors';
import { CreateUserDto } from './dtos/create-user';
import { User } from '@prisma/client';

@Controller('users')
@ApiTags('Users management')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('')
  @ApiResponse({ status: 200, type: UserCreatedDto })
  @ApiResponse({ status: 400, type: ErrorBadRequestDto })
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    // TODO
    return this.usersService.createUser(user);
  }
}
