import { IsEmail, IsEnum, IsNotEmpty, IsUUID, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';

export class UserCreateDto {
  @ApiProperty({ example: 'username' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'user@email.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '0x58d7e25323715ba753f8221fc69ce75feb3a3245' })
  @IsNotEmpty()
  @Matches('^0x[a-fA-F0-9]{40}$')
  blockchainAddress: string;
}

export class UserDto extends UserCreateDto {
  @ApiProperty({ example: '59c78745-aa9e-4930-b338-214aff8b07be' })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'BASIC' })
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;

  @ApiProperty({
    example: '59c78745-aa9e-4930-b338-214aff8b07be',
    required: false,
  })
  teamId?: string;

  @ApiProperty({ example: 'false' })
  @IsNotEmpty()
  isTeamOwner: boolean;
}

export class UserWithPasswordDto extends UserDto {
  @ApiProperty({ example: 'MyStr0ngP@ssw0rd' })
  @IsNotEmpty()
  password: string;
}
