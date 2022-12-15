import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const skipJwtAuth = this.reflector.get<boolean>(
      'skipJwtAuth',
      context.getHandler(),
    );
    if (skipJwtAuth) {
      return true;
    }
    return super.canActivate(context);
  }
}
