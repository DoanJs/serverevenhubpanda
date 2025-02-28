import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BillInput {
  @Field({ nullable: true })
  createAt?: Date;

  @Field({ nullable: true })
  updateAt?: Date;

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  userBuy?: number;

  @Field({ nullable: true })
  authorEvent?: number;

  @Field({ nullable: true })
  eventBuy?: number;

  @Field({ nullable: true })
  status?: string;
}
