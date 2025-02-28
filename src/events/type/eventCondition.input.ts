import { Field, InputType } from '@nestjs/graphql';
import { EventFilterInput } from './eventFilter.input';

@InputType()
export class EventConditionInput {
  @Field({ nullable: true })
  condition?: string;

  @Field({ nullable: true })
  filter?: EventFilterInput;
}
