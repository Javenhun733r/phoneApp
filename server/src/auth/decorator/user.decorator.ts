import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { User } from '../../generated/client';

interface CustomRequest extends Request {
  user: User;
}

export const CurrentUser = createParamDecorator(
  (data: keyof User | undefined, ctx: ExecutionContext) => {
    const request: CustomRequest = ctx.switchToHttp().getRequest();

    const user: User = request.user;

    if (data && user) {
      return user[data];
    }
    return user;
  },
);
