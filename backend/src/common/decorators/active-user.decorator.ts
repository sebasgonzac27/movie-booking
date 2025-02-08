import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithUser } from '../interfaces';

export const ActiveUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest<RequestWithUser>();
    return user;
  },
);
