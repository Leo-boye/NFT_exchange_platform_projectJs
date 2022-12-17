import { ApiProperty, OmitType } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsUrl,
  IsUUID,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Status } from '@prisma/client';

export class NftStatusDto {
  @ApiProperty({ example: 'DRAFT' })
  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;
}

export class NftRatingDto {
  @ApiProperty({ example: '2.5' })
  @ApiProperty({ example: '2.5' })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  rate: number;
}

export class NftCreateDto {
  @ApiProperty({ example: 'My super NFT' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  imageFile: Express.Multer.File;

  @ApiProperty({ example: '100' })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: 'DRAFT',
    description: 'DRAFT -> PUBLISHED -> ARCHIVED',
  })
  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;
}

export class NftDto extends OmitType(NftCreateDto, ['imageFile'] as const) {
  @ApiProperty({ example: '59c78745-aa9e-4930-b338-214aff8b07be' })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'https://example.org/nft/xxx.png' })
  @IsUrl()
  @IsNotEmpty()
  image: string;

  @ApiProperty({ example: '2.5' })
  @Type(() => Number)
  @IsPositive()
  @IsNotEmpty()
  rating: number;

  @ApiProperty({ example: '42' })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  ratingCount: number;

  @ApiProperty({ example: '59c78745-aa9e-4930-b338-214aff8b07be' })
  @IsUUID()
  @IsNotEmpty()
  ownerId: string;

  @ApiProperty({
    example: '59c78745-aa9e-4930-b338-214aff8b07be',
    required: false,
  })
  @ValidateIf((object, value) => value !== undefined)
  @IsUUID()
  collectionId?: string;
}
