import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as Crypto from 'crypto-js';
import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';
import { User } from 'src/users/User.model';
import { Repository } from 'typeorm';
import { AccessTokenType } from './types/accessTokenType';

interface configMailer {
  code: number;
  email: string;
  fromText?: string;
  subject?: string;
  text?: string;
  errMessage?: string;
}

@Injectable()
export class AuthsService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateLogin(username: string, password: string): Promise<any> {
    const user = await this.userRepository.query(
      `select * from Users where Email = '${username}'`,
    );
    if (!user[0]) {
      throw new UnauthorizedException('Tài khoản không tồn tại!');
    }
    if (Crypto.SHA512(password).toString() != user[0].Password) {
      throw new UnauthorizedException('Mật khẩu không chính xác_Js!');
    }
    return user[0];
  }

  async validateRegister(username: string, password: string): Promise<any> {
    const user = await this.userRepository.query(
      `select * from Users where Email = '${username}'`,
    );
    if (user[0]) {
      throw new UnauthorizedException('Tài khoản này đã tồn tại!');
    }
    return { username, password };
  }

  async login(req: Request, res: Response): Promise<AccessTokenType> {
    const user = req.user as User;

    const payload = {
      UserID: user.UserID,
      Username: user.Username,
      Email: user.Email,
    };

    const access_token = this.jwtService.sign(payload, {
      expiresIn: process.env.expiresInToken as string,
      secret: process.env.SECRETOKEN as string,
    });

    const refresh_token = this.jwtService.sign(
      {
        ...payload,
        Password: user.Password,
      },
      {
        expiresIn: process.env.expiresInRefreshToken as string,
        secret: process.env.SECREREFRESHTOKEN as string,
      },
    );

    const fcmTokens = await this.userRepository.query(`
      select * from FCMTokens where userId = ${user.UserID}
      `);

    res.cookie(process.env.REFRESHTOKENCOOKIENAME as string, refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/refresh_token',
    });

    return {
      access_token,
      refresh_token,
      user: { ...user, fcmTokens },
    };
  }

  async handleSendMail(configMailer: configMailer) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      // secure: true,
      auth: {
        user: process.env.USERNAME_GMAIL,
        pass: process.env.PASSWORD_UD_GMAIL,
      },
    });
    try {
      await transporter.sendMail({
        from: configMailer.fromText, // sender address
        to: configMailer.email, // list of receivers
        subject: configMailer.subject, // Subject line
        text: configMailer.text, // plain text body
        html: `<h1>${configMailer.code}</h1>`, // html body
      });
      return configMailer.code;
    } catch (error) {
      console.log(configMailer.errMessage, error);
    }
  }

  async verification(req: Request) {
    const { username } = req.body;
    const code = Math.round(1000 + Math.random() * 9000);
    const verificationCode = await this.handleSendMail({
      code,
      email: username,
      fromText: `Support evenhubfull Application" <${process.env.USERNAME_GMAIL}>`,
      subject: 'Verification email code',
      text: 'Your code to verification email',
      errMessage: 'Can not send email: ',
    });
    return { code: verificationCode, email: username };
  }

  async register(req: Request) {
    const { username, password, email } = req.body;

    const hashPassword = Crypto.SHA512(password).toString();
    const newAccount = this.userRepository.create({
      Username: username,
      Password: hashPassword,
      Email: email,
    });
    await this.userRepository.save(newAccount);
    return newAccount;
  }

  async forgotPassword(req: Request) {
    const { email } = req.body;
    const user = await this.userRepository.query(
      `select * from Users where Email = '${email}'`,
    );
    if (user[0]) {
      const newVerificationCode = Math.round(100000 + Math.random() * 99000);
      const newPassword = Crypto.SHA512(`${newVerificationCode}`).toString();
      await this.userRepository.query(
        `update Users set Password = '${newPassword}', isChangePassword = 1  where Email = '${email}'`,
      );

      const verificationCode = await this.handleSendMail({
        code: newVerificationCode,
        email,
        fromText: `Support evenhubfull Application" <${process.env.USERNAME_GMAIL}>`,
        subject: 'New password Application evenhub',
        text: 'Your new password to login Evenhub',
        errMessage: 'Can not reset your password',
      });
      return verificationCode;
    } else {
      throw new UnauthorizedException(
        'Tài khoản này không tồn tại hoặc chưa đăng ký !',
      );
    }
  }

  async refresh_token(req: Request, res: Response): Promise<AccessTokenType> {
    const refreshToken = req.body.refresh_token;
    if (!refreshToken) {
      throw new UnauthorizedException('refresh token not exist!');
    }

    try {
      const decodeUser = this.jwtService.verify(refreshToken, {
        secret: process.env.SECREREFRESHTOKEN as string,
      }) as JwtPayload;

      const existingUser = await this.userRepository.query(
        `select * from Users where Email = '${decodeUser.Email}'`,
      );
      if (!existingUser[0]) {
        throw new UnauthorizedException('User not exist in Database !');
      }
      const fcmTokens = await this.userRepository.query(
        `select * from FCMTokens where userId = ${existingUser[0].UserID}`,
      );

      const payload = {
        UserID: existingUser[0].UserID,
        Username: existingUser[0].Username,
        Email: existingUser[0].Email,
      };

      const refresh_token = this.jwtService.sign(
        {
          ...payload,
          Password: existingUser.Password,
        },
        {
          expiresIn: process.env.expiresInRefreshToken as string,
          secret: process.env.SECREREFRESHTOKEN as string,
        },
      );

      res.cookie(process.env.REFRESHTOKENCOOKIENAME as string, refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/refresh_token',
      });

      return {
        access_token: this.jwtService.sign(payload, {
          expiresIn: process.env.expiresInToken as string,
          secret: process.env.SECRETOKEN as string,
        }),
        refresh_token,
        user: { ...existingUser[0], fcmTokens },
      };
    } catch (error) {
      throw new UnauthorizedException('Refresh token not valid!');
    }
  }

  //   async logout(req: any, res: Response): Promise<boolean> {
  //     res.clearCookie(process.env.REFRESHTOKENCOOKIENAME, {
  //       httpOnly: true,
  //       secure: true,
  //       sameSite: 'lax',
  //       path: '/refresh_token',
  //     });

  //     await this.accountRepository.query(
  //       SP_CHANGE_DATA(
  //         `'EDIT'`,
  //         'Histories',
  //         null,
  //         null,
  //         null,
  //         `N' TimeLogout = N''${moment().format()}''
  //         '`,
  //         `'MaHistory = ${req.body?.MaHistory}'`,
  //       ),
  //     );
  //     return true;
  //   }

  //   async getAccountLogin(AccountID: number): Promise<Account> {
  //     const account = await this.accountRepository.query(
  //       SP_GET_DATA('Accounts', `'AccountID = ${AccountID}'`, 'AccountID', 0, 0),
  //     );
  //     return account;
  //   }
}
