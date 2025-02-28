import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PositionInput {
  @Field({ nullable: true })
  lat: number;

  @Field({ nullable: true })
  lng: number;
}
