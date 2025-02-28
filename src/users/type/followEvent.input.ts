import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FollowEventInput {
  @Field({ nullable: true })
  UserID?: number;

  @Field({ nullable: true })
  EventID?: number;
}
