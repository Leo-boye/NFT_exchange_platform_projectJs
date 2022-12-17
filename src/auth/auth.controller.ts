import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto } from './dtos/auth';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorRequestDto } from '../common/dtos/errors';
import { SkipJwtAuth } from './jwt-auth.decorator';

@Controller('auth')
@ApiTags('Authentification')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @SkipJwtAuth()
  @ApiOperation({ description: 'Login with account' })
  @ApiResponse({ status: 200, type: LoginResponseDto })
  @ApiResponse({ status: 400, type: ErrorRequestDto })
  @ApiResponse({ status: 401, type: ErrorRequestDto })
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
}
