import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsUrl, IsUUID } from 'class-validator';
import { Status } from '../../common/dtos/status';

export class NftRatingDto {
  @ApiProperty({ example: 'TODO' })
  @IsPositive()
  @IsNotEmpty()
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
  status: Status;
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

  @ApiProperty({ example: 'TODO', required: false })
  @IsUUID()
  collectionId?: string;
}

export class NftUpdateDto extends PartialType(
  PickType(NftDto, ['status', 'collectionId']),
) {}
