import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../../common/dtos/status';

export class CreateNftDto {
  @ApiProperty() name: string;
  @ApiProperty() image: string;
  @ApiProperty() price: number;
  @ApiProperty() status: Status;
  @ApiProperty() userId: string;
}
