import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthsService } from '.';

@Injectable()
export class LoginLocalStrategy extends PassportStrategy(
  Strategy,
  'login.local',
) {
  constructor(private authsService: AuthsService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authsService.validateLogin(username, password);
    if (!user) {
      throw new UnauthorizedException('Tài khoản không tồn tại!');
    }
    return user;
  }
}
