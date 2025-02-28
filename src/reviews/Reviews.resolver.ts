import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GraphQLGuard } from 'src/auth/GraphQL.Guard';
import { Review } from './Review.model';
import { ReviewsService } from './Reviews.service';
import { User } from 'src/users/User.model';
import { ReviewInput } from './type/review.input';

@Resolver(() => Review)
@UseGuards(GraphQLGuard)
export class ReviewsResolver {
  constructor(private reviewsService: ReviewsService) {}

  @Query(() => [Review])
  reviews(): Promise<Review[]> {
    return this.reviewsService.reviews();
  }

  @Mutation(() => Review)
  createReview(@Args('reviewInput') reviewInput: ReviewInput): Promise<Review> {
    return this.reviewsService.createReview(reviewInput);
  }

  // relation

  @ResolveField(() => User)
  reviewer(@Parent() review: Review): Promise<User> {
    return this.reviewsService.reviewer(review);
  }

  @ResolveField(() => User)
  reReviewer(@Parent() review: Review): Promise<User> {
    return this.reviewsService.reReviewer(review);
  }
}
