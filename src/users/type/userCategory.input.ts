import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserCategoryInput {
  @Field({ nullable: true })
  UserID?: number;

  @Field({ nullable: true })
  CategoryID?: number;
}
