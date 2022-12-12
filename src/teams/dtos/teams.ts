import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class TeamCreateDto {
  @ApiProperty({ example: 'TODO' })
  @IsNotEmpty()
  name: string;
}

export class TeamDto extends TeamCreateDto {
  @ApiProperty({ example: 'TODO' })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'TODO' })
  @IsNotEmpty()
  balance: string;
}
