// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth';
import { BillModule } from './bills/Bill.module';
import { CategoryModule } from './categories/Category.module';
import { DataLoaderModule } from './dataloader/Dataloader.module';
import { EventModule } from './events/Event.module';
import { FCMTokenModule } from './fcmtokens/FCMToken.module';
import { FollowModule } from './follows/Follow.module';
import { PositionModule } from './positions/Position.module';
import { ReviewModule } from './reviews/Review.module';
import { UsersModule } from './users/Users.module';
import { ConversationModule } from './conversations/Conversation.module';
import { MessageModule } from './messages/Message.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: '34.67.230.109',
      port: 1433,
      username: 'sqlserver', //process.env.USERNAME_MSSQL
      password: 'evenhubfully123456', //process.env.PASSWORD_MSSQL
      database: 'evenhubDB', //process.env.NAMEDB_MSSQL
      autoLoadEntities: true,
      logging: true,
      // synchronize: true, ///not use production env
      options: {
        trustServerCertificate: true,
      },
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mssql',
    //   host: 'localhost',
    //   port: 1433,
    //   username: process.env.USERNAME_MSSQL,
    //   password: process.env.PASSWORD_MSSQL,
    //   database: process.env.NAMEDB_MSSQL,
    //   autoLoadEntities: true,
    //   logging: true,
    //   // synchronize: true, ///not use production env
    //   options: {
    //     trustServerCertificate: true,
    //   },
    // }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    AuthModule,
    UsersModule,
    EventModule,
    PositionModule,
    FCMTokenModule,
    FollowModule,
    CategoryModule,
    DataLoaderModule,
    BillModule,
    ReviewModule,
    ConversationModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
