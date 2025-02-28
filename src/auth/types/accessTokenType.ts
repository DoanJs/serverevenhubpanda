import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/User.model';

@ObjectType()
export class AccessTokenType {
  @Field()
  access_token: string;
  refresh_token: string;
  user: User;
}
