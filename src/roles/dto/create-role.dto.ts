import { IsIn } from 'class-validator';
import { ROLES } from '../constants/role.constant';
import { Role } from '../types/role.type';

export class CreateRoleDto {
  @IsIn(ROLES, {
    message: (validationArguments) => {
      const constraints: string[][] = validationArguments.constraints;
      return `El nombre del rol debe de ser uno de los siguientes valores: ${constraints[0].join(
        ', ',
      )}`;
    },
  })
  name: Role;
}
