import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export enum Status {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export class StatusDto {
  @ApiProperty({ example: 'TODO' })
  @IsNotEmpty()
  status: Status;
}
