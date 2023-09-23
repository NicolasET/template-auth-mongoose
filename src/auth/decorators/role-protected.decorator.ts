import { SetMetadata } from '@nestjs/common';
import MetadataKey from '../constants/metadata.constant';
import { Role } from 'src/roles/types/role.type';

export const RoleProtected = (...args: Role[]) => {
  return SetMetadata(MetadataKey, args);
};
