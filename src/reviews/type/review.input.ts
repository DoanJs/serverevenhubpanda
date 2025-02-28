import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ReviewInput {
  @Field({ nullable: true })
  star: number;

  @Field({ nullable: true })
  text: string;

  @Field({ nullable: true })
  reviewerId: number;

  @Field({ nullable: true })
  reReviewerId: number;
}
