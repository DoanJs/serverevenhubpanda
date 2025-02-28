import { Field, InputType } from '@nestjs/graphql';
import { PositionInput } from 'src/positions/type/position.input';

@InputType()
export class EventInput {
  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  locationTitle: string;

  @Field({ nullable: true })
  locationAddress: string;

  @Field({ nullable: true })
  imageUrl: string;

  @Field({ nullable: true })
  price: string;

  @Field({ nullable: true })
  category: string;

  @Field({ nullable: true })
  date: Date;

  @Field({ nullable: true })
  startAt: Date;

  @Field({ nullable: true })
  endAt: Date;

  @Field({ nullable: true })
  authorId: string;

  @Field((types) => [String], { nullable: true })
  users: [string];

  @Field((types) => PositionInput, { nullable: true })
  position: PositionInput;
}
