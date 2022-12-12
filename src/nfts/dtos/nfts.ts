import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsPositive, IsUUID } from 'class-validator';
import { Status } from '../../common/dtos/status';
import { Type } from 'class-transformer';

export class NftRatingDto {
  @ApiProperty({ example: 'TODO' })
  @Type(() => Number)
  @IsPositive()
  @IsNotEmpty()
  rate: number;
}

export class NftCreateDto {
  @ApiProperty({ example: 'TODO' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: 'string', format: 'binary', example: 'TODO' })
  file: Express.Multer.File;

  @ApiProperty({ example: 'TODO' })
  @Type(() => Number)
  @IsPositive()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: 'TODO' })
  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;
}

export class NftDto extends NftCreateDto {
  @ApiProperty({ example: 'TODO' })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'TODO' })
  @Type(() => Number)
  @IsPositive()
  @IsNotEmpty()
  rating: number;

  @ApiProperty({ example: 'TODO' })
  @Type(() => Number)
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
