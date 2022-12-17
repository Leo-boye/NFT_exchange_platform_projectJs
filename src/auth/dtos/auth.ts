import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UserWithPasswordDto } from '../../users/dtos/users';

export class LoginDto {
  @ApiProperty({ example: 'admin' })
  username: string;

  @ApiProperty({ example: '123456' })
  password: string;
}

export class LoginResponseDto {
  @ApiProperty({ example: 'eyJhbGci...' })
  @IsNotEmpty()
  access_token: string;
}

export class JwtDto extends PickType(UserWithPasswordDto, [
  'id',
  'email',
  'role',
] as const) {}
