import { Request } from 'express';
import { UserActive } from './user-active.interface';

export interface RequestWithUser extends Request {
  user: UserActive;
}
