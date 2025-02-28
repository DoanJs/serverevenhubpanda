import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ConversationInput {
  @Field({ nullable: true })
  createAt: number;

  @Field({ nullable: true })
  creatorId: number;

  @Field({ nullable: true })
  deleteAt: number;

  @Field({ nullable: true })
  isGroup: number;

  @Field(() => [Number], { nullable: true })
  participantIds: number[];

  @Field({ nullable: true })
  updateAt: number;
}
