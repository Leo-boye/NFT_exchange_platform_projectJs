import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsUrl, IsUUID } from 'class-validator';

export class CollectionCreateDto {
  @ApiProperty({ example: 'TODO' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'TODO', required: false })
  @IsUrl()
  logo?: string;

  @ApiProperty({ example: 'TODO' })
  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;
}

export class CollectionUpdateDto extends PartialType(CollectionCreateDto) {}

export class CollectionDto extends CollectionCreateDto {
  @ApiProperty({ example: 'TODO' })
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
