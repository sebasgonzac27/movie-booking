import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/common/enums';
import { RequestWithUser } from 'src/common/interfaces';
import { ROLES_KEY } from '../decorators';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndOverride<UserRole>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest<RequestWithUser>();

    if (user.role === UserRole.Admin) return true;

    return roles === user.role;
  }
}
