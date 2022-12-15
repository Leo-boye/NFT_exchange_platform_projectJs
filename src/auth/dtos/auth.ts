import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

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
