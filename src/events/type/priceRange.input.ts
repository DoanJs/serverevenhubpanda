import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PriceRangeInput {
  @Field({ nullable: true })
  lowValue?: number;

  @Field({ nullable: true })
  highValue?: number;
}
