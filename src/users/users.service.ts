import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dtos/create-user';

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

  createUser(user: CreateUserDto) {
    const password = 'password';
    return this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        blockchainAddress: user.blockchainAddress,
        password: password,
      },
    });
  }
}
