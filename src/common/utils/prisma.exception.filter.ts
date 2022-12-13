import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { BaseExceptionFilter } from '@nestjs/core';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Catch(PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status: HttpStatus;

    // See https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes for more information

    switch (exception.code) {
      case 'P2002':
        status = HttpStatus.CONFLICT;
        response.status(HttpStatus.CONFLICT).json({
          statusCode: status,
          message: `Unique constraint failed on the '${exception.meta.target}' field`,
        });
        break;
      case 'P2003':
        status = HttpStatus.CONFLICT;
        response.status(HttpStatus.CONFLICT).json({
          statusCode: status,
          message: `Foreign key constraint failed on the '${exception.meta.field_name}' field`,
        });
        break;

      default:
        super.catch(exception, host);
        break;
    }
  }
}
