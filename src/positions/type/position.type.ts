import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PositionType {
  @Field((type) => Int)
  lat: number;

  @Field((type) => Int)
  lng: number;
}
