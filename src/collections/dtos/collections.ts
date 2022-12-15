import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsUrl, IsUUID, ValidateIf } from 'class-validator';

export class CollectionCreateDto {
  @ApiProperty({ example: 'My super collection' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'https://example.org', required: false })
  @ValidateIf((object, value) => value !== undefined)
  @IsUrl()
  logo?: string;

  @ApiProperty({ example: 'DRAFT' })
  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;
}

export class CollectionUpdateDto extends PartialType(CollectionCreateDto) {}

export class CollectionDto extends CollectionCreateDto {
  @ApiProperty({ example: '59c78745-aa9e-4930-b338-214aff8b07be' })
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
