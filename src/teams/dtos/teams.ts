import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class TeamCreateDto {
  @ApiProperty({ example: 'My Team' })
  @IsNotEmpty()
  name: string;
}

export class TeamDto extends TeamCreateDto {
  @ApiProperty({ example: '59c78745-aa9e-4930-b338-214aff8b07be' })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: '125' })
  @Type(() => Number)
  @IsNotEmpty()
  balance: number;
}
