import { Status } from '../../common/dtos/status';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl, IsUUID } from 'class-validator';

export class CollectionCreateDto {
  @ApiProperty({ example: 'TODO' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'TODO' })
  @IsUrl()
  logo?: string;

  @ApiProperty({ example: 'TODO' })
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
