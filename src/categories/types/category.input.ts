import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CategoryInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  color?: string;

  @Field({ nullable: true })
  label?: string;
}
