import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/utils/prisma.service';
import { generate } from 'generate-password';
import { UserCreateDto, UserDto, UserWithPasswordDto } from './dtos/users';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(offset: number, limit: number): Promise<Array<UserDto>> {
    return await this.prisma.user.findMany({
      skip: offset,
      take: limit,
    });
  }

  async getUserById(userId: string): Promise<UserDto | null> {
    return await this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async getUserCredentials(email: string): Promise<UserWithPasswordDto | null> {
    return await this.prisma.user.findUnique({
      where: { email: email },
    });
  }

  async createUser(user: UserCreateDto): Promise<UserWithPasswordDto> {
    const password = generate({
      length: 16,
      numbers: true,
      symbols: true,
      excludeSimilarCharacters: true,
    });
    return await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: password,
        blockchainAddress: user.blockchainAddress,
      },
    });
  }

  async updateTeamUser(
    userId: string,
    teamId: string,
    isTeamOwner?: boolean,
  ): Promise<UserDto> {
    let data;
    switch (isTeamOwner) {
      case undefined:
        data = { teamId: teamId };
        break;
      default:
        data = { teamId: teamId, isTeamOwner: isTeamOwner };
    }
    return await this.prisma.user.update({
      where: { id: userId },
      data: data,
    });
  }
}
