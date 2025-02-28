import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthsService } from '.';

@Injectable()
export class RegisterLocalStrategy extends PassportStrategy(
  Strategy,
  'register.local',
) {
  constructor(private authsService: AuthsService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    console.log(username, password);
    const account = await this.authsService.validateRegister(
      username,
      password,
    );
    if (account === undefined) {
      // theo mã đúng là if(!account){...}
      throw new UnauthorizedException('Tài khoản này đã tồn tại!');
    }
    return account;
  }
}
