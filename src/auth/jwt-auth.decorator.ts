import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export function SkipJwtAuth() {
  return applyDecorators(SetMetadata('skipJwtAuth', true));
}

export function OptionalJwtAuth() {
  return applyDecorators(
    SetMetadata('optionalJwtAuth', true),
    ApiOperation({ summary: 'Optional JWT Auth' }),
  );
}
