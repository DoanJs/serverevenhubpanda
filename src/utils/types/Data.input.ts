import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DataInput {
  @Field({ nullable: true })
  lat?: number;

  @Field({ nullable: true })
  long?: number;

  @Field({ nullable: true })
  distance?: number;

  @Field({ nullable: true })
  date?: Date;
}
