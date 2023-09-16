import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { Response } from 'src/common/interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './schemas/role.schema';
import { Model } from 'mongoose';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name)
    private readonly roleModel: Model<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Response<Role>> {
    try {
      const role = await this.roleModel.create(createRoleDto);

      return {
        data: role,
        message: 'Rol creado satisfactoriamente.',
        statusCode: 201,
      };
    } catch (error) {
      this.exceptionHanlder(error);
    }
  }

  async findAll(): Promise<Role[]> {
    return this.roleModel.find().exec();
  }

  private exceptionHanlder(error: any) {
    if (error.code === 11000) {
      const { name } = error.keyValue;
      throw new BadRequestException(`El rol: ${name} ya existe.`);
    }

    console.log(error);
    throw new InternalServerErrorException(
      'Error interno en el servidor, revisa los logs.',
    );
  }
}
