import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from 'src/users/schemas/user.schema';
import { AuthDto } from './dto/auth.dto';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(authDto: AuthDto) {
    const { password, username } = authDto;
    const user = await this.userModel
      .findOne({ username: username })
      .select('password');
    if (!user) {
      throw new UnauthorizedException('Usuario o contraseña incorrecta.');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Usuario o contraseña incorrecta.');
    }

    return {
      jwtToken: this.generateJwt({ id: user.id }),
    };
  }

  private generateJwt(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
