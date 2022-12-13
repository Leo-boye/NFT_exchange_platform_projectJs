import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/utils/prisma.service';
import { generate } from 'generate-password';
import { UserCreatedDto, UserCreateDto, UserDto } from './dtos/users';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  constructor(private prisma: PrismaService) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

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

  async createUser(user: UserCreateDto): Promise<UserCreatedDto> {
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
}
