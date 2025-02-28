import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { Message } from './Message.model';
import { MessagesResolver } from './Messages.resolver';
import { MessagesService } from './Messages.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
    DataLoaderModule,
  ],
  providers: [MessagesResolver, MessagesService],
  exports: [],
})
export class MessageModule {}
