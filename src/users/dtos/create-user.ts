import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'username' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'user@email.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'TODO' })
  @IsNotEmpty()
  @Matches('^0x[a-fA-F0-9]{40}$')
  blockchainAddress: string;
}
