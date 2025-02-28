import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/User.model';
import { AuthsController } from './Auths.controller';
import { AuthsService } from './Auths.service';
import { LoginLocalStrategy } from './Loginlocal.strategy';
import { RegisterLocalStrategy } from './RegisterLocal.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  controllers: [AuthsController],
  providers: [AuthsService, LoginLocalStrategy, RegisterLocalStrategy], //RegisterLocalStrategy
})
export class AuthModule {}
