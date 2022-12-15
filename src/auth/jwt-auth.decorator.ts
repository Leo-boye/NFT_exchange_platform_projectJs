import { applyDecorators, SetMetadata } from '@nestjs/common';

export function SkipJwtAuth() {
  return applyDecorators(SetMetadata('skipJwtAuth', true));
}
