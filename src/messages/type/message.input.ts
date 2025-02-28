import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MessageInput {
  @Field({ nullable: true })
  type: string;

  @Field({ nullable: true })
  message: string;

  @Field({ nullable: true })
  mediaUrl: string;

  @Field({ nullable: true })
  senderId: number;

  @Field({ nullable: true })
  receiverId: number;

  @Field({ nullable: true })
  conversationId: number;

  @Field({ nullable: true })
  status: string;

  @Field({ nullable: true })
  createAt: number;

  @Field({ nullable: true })
  updateAt: number;

  @Field({ nullable: true })
  deleteAt: number;
}
