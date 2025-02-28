import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesResolver } from './Categories.resolver';
import { CategoriesService } from './Categories.service';
import { Category } from './Category.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [CategoriesResolver, CategoriesService],
  exports: [],
})
export class CategoryModule {}
