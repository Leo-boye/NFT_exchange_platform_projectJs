import { applyDecorators, SetMetadata } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ErrorRequestDto } from '../dtos/errors';

export function AdminOnly() {
  return applyDecorators(
    SetMetadata('role', UserRole.ADMIN),
    ApiOperation({ summary: 'Admin only' }),
    ApiResponse({ status: 403, type: ErrorRequestDto }),
  );
}
