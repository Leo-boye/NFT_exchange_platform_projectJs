import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserCreatedDto, UserCreateDto } from './dtos/users';
import { ErrorRequestDto } from '../common/dtos/errors';

@Controller('users')
@ApiTags('Users management')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('')
  @ApiResponse({ status: 200, type: UserCreatedDto })
  @ApiResponse({ status: 400, type: ErrorRequestDto })
  @ApiResponse({ status: 409, type: ErrorRequestDto })
  async createUser(@Body() user: UserCreateDto): Promise<UserCreatedDto> {
    return await this.usersService.createUser(user);
  }
}
