import { applyDecorators, UseGuards } from '@nestjs/common';
import { UserRole } from 'src/shared/enums';
import { AuthGuard, RolesGuard } from '../guards';
import { Roles } from './roles.decorator';

export function Auth(role: UserRole) {
  return applyDecorators(Roles(role), UseGuards(AuthGuard, RolesGuard));
}
