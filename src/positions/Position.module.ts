import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Position } from './Position.model';
import { PositionsResolver } from './Position.resolver';
import { PositionsService } from './Position.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Position]),
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [PositionsResolver, PositionsService],
  exports: [],
})
export class PositionModule {}
