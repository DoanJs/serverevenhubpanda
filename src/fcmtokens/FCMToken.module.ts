import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FCMToken } from './FCMToken.model';
import { FCMTokensResolver } from './FCMTokens.resolver';
import { FCMTokensService } from './FCMTokens.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FCMToken]),
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [FCMTokensResolver, FCMTokensService],
  exports: [],
})
export class FCMTokenModule {}
