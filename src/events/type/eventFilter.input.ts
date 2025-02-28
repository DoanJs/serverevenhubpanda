import { Field, InputType } from '@nestjs/graphql';
import { DataInput } from 'src/utils/types/Data.input';

@InputType()
export class EventFilterInput {
  @Field({ nullable: true })
  key?: string;

  @Field({ nullable: true })
  data?: DataInput;
}
