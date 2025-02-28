import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { Conversation } from './Conversation.model';
import { ConversationsResolver } from './Conversations.resolver';
import { ConversationsService } from './Conversations.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conversation]),
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
    DataLoaderModule,
  ],
  providers: [ConversationsResolver, ConversationsService],
  exports: [],
})
export class ConversationModule {}
