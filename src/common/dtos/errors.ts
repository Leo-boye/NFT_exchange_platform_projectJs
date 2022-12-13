import { ApiProperty } from '@nestjs/swagger';

export class ErrorRequestDto {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;
}
