import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './User.model';
import { UsersService } from './User.service';
import { UsersResolver } from './Users.resolver';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), DataLoaderModule],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
