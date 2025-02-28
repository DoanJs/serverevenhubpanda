import { Field, InputType } from '@nestjs/graphql';
import { EventInput } from 'src/events/type/event.input';

@InputType()
export class UserInput {
  @Field({ nullable: true })
  Username?: string;

  @Field({ nullable: true })
  Email?: string;

  @Field({ nullable: true })
  Password?: string;

  @Field({ nullable: true })
  PhotoUrl?: string;

  @Field({ nullable: true })
  isChangePassword?: number;

  @Field(() => [EventInput], { nullable: true })
  followEvents?: [EventInput];
}
