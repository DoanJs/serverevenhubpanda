import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthsService } from '.';
import { LoginAuthGuard } from './Login.Guard';
import { RegisterAuthGuard } from './Register.Guard';
import { AccessTokenType } from './types/accessTokenType';

@Controller()
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @Post('/login')
  @UseGuards(LoginAuthGuard)
  login(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AccessTokenType> {
    return this.authsService.login(req, res);
  }

  @Post('/verification')
  @UseGuards(RegisterAuthGuard)
  verification(@Req() req: Request) {
    return this.authsService.verification(req);
  }

  @Post('/register')
  register(@Req() req: Request) {
    return this.authsService.register(req);
  }

  @Post('/forgotPassword')
  forgotPassword(@Req() req: Request) {
    return this.authsService.forgotPassword(req);
  }

  @Post('/refresh_token')
  refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: any,
  ): Promise<AccessTokenType> {
    return this.authsService.refresh_token(req, res);
  }

  //   @Post('/logout')
  //   logout(
  //     @Req() req: Request,
  //     @Res({ passthrough: true }) res: Response,
  //   ): Promise<boolean> {
  //     return this.authPassportService.logout(req, res);
  //   }
}
