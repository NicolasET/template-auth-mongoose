import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Response, ResponseCount } from 'src/common/interfaces';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateUserDto, UpdateUserDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Response<User>> {
    try {
      const { password, ...userData } = createUserDto;
      await this.userModel.create({
        ...userData,
        password: this.encryptPassword(password),
      });

      return {
        message: 'Usuario creado satisfactoriamente.',
        statusCode: 201,
      };
    } catch (error) {
      this.exceptionHanlder(error);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ResponseCount<User>> {
    const { limit = 10, offset = 0 } = paginationDto;
    const users = await this.userModel.find().limit(limit).skip(offset);
    const count = await this.userModel
      .countDocuments()
      .limit(limit)
      .skip(offset);

    return {
      data: {
        count: count,
        rows: users,
      },
      message: 'Usuarios obtenidos satisfactoriamente.',
      statusCode: 200,
    };
  }

  async findOne(id: string): Promise<Response<User>> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`El usuario con ID: ${id} no existe.`);
    }

    return {
      data: user,
      message: 'Usuario obtenido satisfactoriamente.',
      statusCode: 200,
    };
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<Response<User>> {
    const { password } = updateUserDto;
    if (password) {
      updateUserDto.password = this.encryptPassword(password);
    }

    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto);
    if (!user) {
      throw new NotFoundException(`El usuario con ID: ${id} no existe.`);
    }

    return {
      message: 'Usuario actualizado satisfactoriamente.',
      statusCode: 200,
    };
  }

  async remove(id: string): Promise<Response<User>> {
    const user = await this.userModel.findByIdAndRemove(id);
    if (!user) {
      throw new NotFoundException(`El usuario con ID: ${id} no existe.`);
    }

    return {
      data: user,
      message: 'Usuario eliminado satisfactoriamente.',
      statusCode: 200,
    };
  }

  private encryptPassword(password: string): string {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
  }

  private exceptionHanlder(error: any) {
    if (error.code === 11000) {
      const { username } = error.keyValue;
      throw new BadRequestException(
        `El nombre de usuario: ${username} ya existe.`,
      );
    }

    console.log(error);
    throw new InternalServerErrorException(
      'Error interno en el servidor, revisa los logs.',
    );
  }
}
