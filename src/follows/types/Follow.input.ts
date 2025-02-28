import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FollowInput {
  @Field({ nullable: true })
  followingId?: number;

  @Field({ nullable: true })
  followerId?: number;
}
