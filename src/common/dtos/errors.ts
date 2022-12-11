import { ApiProperty } from '@nestjs/swagger';

export class BadRequestErrorDto {
  @ApiProperty({ example: '400' })
  statusCode: number;

  @ApiProperty({ example: 'Validation failed' })
  message: string;

  @ApiProperty({ example: 'Bad Request' })
  error: string;
}

export class NotFoundErrorDto {
  @ApiProperty({ example: '404' })
  statusCode: number;

  @ApiProperty({ example: 'User ID not found' })
  message: string;

  @ApiProperty({ example: 'Not found' })
  error: string;
}
