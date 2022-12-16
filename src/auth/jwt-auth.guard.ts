import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const skipAuth = this.reflector.get<boolean>(
      'skipJwtAuth',
      context.getHandler(),
    );
    if (skipAuth) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest(err, user, info, context) {
    const optionalAuth = this.reflector.get<boolean>(
      'optionalJwtAuth',
      context.getHandler(),
    );
    if (optionalAuth && !user) {
      return null;
    }
    return super.handleRequest(err, user, info, context);
  }
}
