import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLoaderService } from './Dataloader.service';
import { User } from 'src/users/User.model';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [DataLoaderService],
  exports: [DataLoaderService],
})
export class DataLoaderModule {}
