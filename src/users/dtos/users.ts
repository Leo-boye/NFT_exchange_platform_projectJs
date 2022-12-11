import { IsEmail, IsNotEmpty, IsUUID, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  ADMIN = 'ADMIN',
  BASIC = 'BASIC',
}

export class UserCreateDto {
  @ApiProperty({ example: 'TODO' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'TODO' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'TODO' })
  @IsNotEmpty()
  @Matches('^0x[a-fA-F0-9]{40}$')
  blockchainAddress: string;
}

export class UserDto extends UserCreateDto {
  @ApiProperty({ example: 'TODO' })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'TODO' })
  @IsNotEmpty()
  role: UserRole;

  @ApiProperty({ example: 'TODO' })
  teamId?: string;

  @ApiProperty({ example: 'TODO' })
  @IsNotEmpty()
  isTeamOwner: boolean;
}

export class UserCreatedDto extends UserDto {
  @ApiProperty({ example: 'TODO' })
  @IsNotEmpty()
  password: string;
}
