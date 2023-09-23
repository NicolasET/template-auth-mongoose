import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';
import { User } from 'src/users/schemas/user.schema';

export const GetUserData = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext) => {
    const { user }: { user: User } = ctx.switchToHttp().getRequest();

    if (!user) {
      throw new InternalServerErrorException();
    }

    return !data ? user : user[data];
  },
);
