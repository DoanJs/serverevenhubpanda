import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { Bill } from './Bill.model';
import { BillsResolver } from './Bills.resolver';
import { BillsService } from './Bills.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bill]),
    DataLoaderModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [BillsResolver, BillsService],
  exports: [],
})
export class BillModule {}
