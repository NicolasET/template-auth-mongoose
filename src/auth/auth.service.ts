import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  signIn(authDto: AuthDto) {
    return 'This action adds a new auth';
  }
}
