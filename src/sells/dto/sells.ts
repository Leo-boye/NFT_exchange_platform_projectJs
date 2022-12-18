import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';

export class SellCreateDto {
  @ApiProperty({ example: '59c78745-aa9e-4930-b338-214aff8b07be' })
  @IsUUID()
  @IsNotEmpty()
  buyerId: string;

  @ApiProperty({ example: '59c78745-aa9e-4930-b338-214aff8b07be' })
  @IsUUID()
  @IsNotEmpty()
  sellerId: string;

  @ApiProperty({ example: '59c78745-aa9e-4930-b338-214aff8b07be' })
  @IsUUID()
  @IsNotEmpty()
  nftId: string;

  @ApiProperty({ example: '59c78745-aa9e-4930-b338-214aff8b07be' })
  @ValidateIf((object, value) => value !== undefined)
  @IsUUID()
  collectionId?: string;
}

export class SellDto extends SellCreateDto {
  @ApiProperty({ example: '59c78745-aa9e-4930-b338-214aff8b07be' })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'TODO' })
  @Type(() => Date)
  @IsNotEmpty()
  datetime: Date;
}
