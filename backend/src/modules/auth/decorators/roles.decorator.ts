import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/shared/enums';

export const Roles = (role: UserRole) => SetMetadata('roles', role);
