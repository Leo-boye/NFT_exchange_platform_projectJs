import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsUrl, IsUUID } from 'class-validator';

export enum NftStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export class UpdateNftStatusDto {
  status: NftStatus;
}

export class UpdateNftRatingDto {
  rate: number;
}

export class NftDto {
  @ApiProperty({ example: 'TODO' })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'TODO' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'TODO' })
  @IsUrl()
  @IsNotEmpty()
  image: string;

  @ApiProperty({ example: 'TODO' })
  @IsPositive()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: 'TODO' })
  @IsNotEmpty()
  status: NftStatus;

  @ApiProperty({ example: 'TODO' })
  @IsPositive()
  @IsNotEmpty()
  rating: number;

  @ApiProperty({ example: 'TODO' })
  @IsPositive()
  @IsNotEmpty()
  rating_count: number;

  @ApiProperty({ example: 'TODO' })
  @IsUUID()
  @IsNotEmpty()
  ownerId: string;

  @ApiProperty({ example: 'TODO' })
  @IsUUID()
  collectionId?: string;
}
