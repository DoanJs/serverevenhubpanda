import { Field, InputType } from '@nestjs/graphql';
import { DataInput } from './Data.input';

@InputType()
export class ParamsInput {
  @Field({ nullable: true })
  data?: DataInput;

  @Field({ nullable: true })
  skip?: number;

  @Field({ nullable: true })
  take?: number;

}
