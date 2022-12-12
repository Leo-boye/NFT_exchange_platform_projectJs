import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsUrl, IsUUID } from 'class-validator';

export enum NftStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export class NftUpdateStatusDto {
  status: NftStatus;
}

export class NftUpdateRatingDto {
  rate: number;
}

export class NftCreateDto {
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
}

export class NftDto extends NftCreateDto {
  @ApiProperty({ example: 'TODO' })
  @IsUUID()
  @IsNotEmpty()
  id: string;

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