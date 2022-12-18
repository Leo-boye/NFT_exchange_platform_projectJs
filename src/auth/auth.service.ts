import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../users/dtos/users';
import { JwtDto, LoginDto } from './dtos/auth';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserDto | null> {
    const user = await this.usersService.getUserCredentials(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginUser: LoginDto) {
    const user = await this.validateUser(loginUser.email, loginUser.password);
    if (!user) {
      return { access_token: null };
    }
    const payload: JwtDto = { id: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
