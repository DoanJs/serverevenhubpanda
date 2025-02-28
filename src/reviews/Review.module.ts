import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { Review } from './Review.model';
import { ReviewsResolver } from './Reviews.resolver';
import { ReviewsService } from './Reviews.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review]),
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
    DataLoaderModule,
  ],
  providers: [ReviewsResolver, ReviewsService],
  exports: [],
})
export class ReviewModule {}
