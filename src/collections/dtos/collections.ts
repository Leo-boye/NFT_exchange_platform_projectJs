import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsPositive,
  IsUrl,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CollectionCreateDto {
  @ApiProperty({ example: 'My super collection' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'https://example.org', required: false })
  @ValidateIf((object, value) => value !== undefined)
  @IsUrl()
  logo?: string;

  @ApiProperty({
    example: 'DRAFT',
    description: 'DRAFT -> PUBLISHED -> ARCHIVED',
  })
  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;

  @ApiProperty({ example: '1234' })
  @ValidateIf((object, value) => value !== undefined)
  @Type(() => Number)
  @IsPositive()
  autoArchivingTimeInSecondes?: number;
}

export class CollectionUpdateDto extends PartialType(CollectionCreateDto) {}

export class CollectionDto extends CollectionCreateDto {
  @ApiProperty({ example: '59c78745-aa9e-4930-b338-214aff8b07be' })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: '59c78745-aa9e-4930-b338-214aff8b07be' })
  @IsUUID()
  @IsNotEmpty()
  teamId: string;

  @ApiProperty({ example: 'username' })
  @IsNotEmpty()
  userName: string;
}
