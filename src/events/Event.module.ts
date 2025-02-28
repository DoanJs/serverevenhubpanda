import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { EventsResolver } from './Events.resolver';
import { EventsService } from './Events.service';
import { Event } from './Event.model'

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    DataLoaderModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [EventsResolver, EventsService],
  exports: [],
})
export class EventModule {}
