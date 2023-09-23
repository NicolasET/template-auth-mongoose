import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import MetadataKey from '../constants/metadata.constant';
import { User } from 'src/users/schemas/user.schema';
import { Role } from 'src/roles/types/role.type';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles: Role[] = this.reflector.get(
      MetadataKey,
      context.getHandler(),
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { user }: { user: User } = context.switchToHttp().getRequest();
    if (!user) {
      throw new BadRequestException();
    }

    if (!requiredRoles.includes(user.role.name)) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
