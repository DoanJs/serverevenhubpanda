import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/User.model';
import { Repository } from 'typeorm';
import { Review } from './Review.model';
import { DataLoaderService } from 'src/dataloader/Dataloader.service';
import { ReviewInput } from './type/review.input';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    private dataloaderService: DataLoaderService,
  ) {}

  async reviews(): Promise<Review[]> {
    return this.reviewRepository.query(`select * from Reviews `);
  }

  async createReview(reviewInput: ReviewInput): Promise<Review> {
    const user = await this.reviewRepository.query(
      `select * from Users where UserID = ${reviewInput.reviewerId}`,
    );
    const author = await this.reviewRepository.query(
      `select * from Users where UserID = ${reviewInput.reReviewerId}`,
    );
    const result = await this.reviewRepository.create({
      ...reviewInput,
      createAt: new Date().toLocaleDateString(),
      reviewer: user[0],
      reReviewer: author[0],
    });
    await this.reviewRepository.save(result);

    return result;
  }

  // relation

  async reviewer(review: any): Promise<User> {
    if (review.reviewerId) {
      return this.dataloaderService.loaderUser.load(review.reviewerId);
    }
  }

  async reReviewer(review: any): Promise<User> {
    if (review.reReviewerId) {
      return this.dataloaderService.loaderUser.load(review.reReviewerId);
    }
  }
}
