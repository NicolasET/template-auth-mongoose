import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { AuthDto } from './dto/auth.dto';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async signIn(authDto: AuthDto) {
    const { password, username } = authDto;
    const user = await this.userModel.findOne({ username: username });
    if (!user) {
      throw new UnauthorizedException('Usuario o contraseña incorrecta.');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Usuario o contraseña incorrecta.');
    }
  }
}
