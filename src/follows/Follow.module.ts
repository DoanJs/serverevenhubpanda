import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follow } from './Follow.model';
import { FollowsResolver } from './Follows.resolver';
import { FollowsService } from './Follows.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Follow]),
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [FollowsResolver, FollowsService],
  exports: [],
})
export class FollowModule {}
