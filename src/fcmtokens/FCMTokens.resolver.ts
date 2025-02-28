import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLGuard } from 'src/auth/GraphQL.Guard';
import { ParamsInput } from 'src/utils/types/Params.input';
import { FCMToken } from './FCMToken.model';
import { FCMTokensService } from './FCMTokens.service';

@Resolver(() => FCMToken)
@UseGuards(GraphQLGuard)
export class FCMTokensResolver {
  constructor(private fcmtokensService: FCMTokensService) {}

  @Query(() => [FCMToken])
  fcmtokens(
    @Args('paramsInput') paramsInput: ParamsInput,
  ): Promise<FCMToken[]> {
    return this.fcmtokensService.fcmtokens(paramsInput);
  }

  @Mutation(() => String)
  createFCMToken(
    @Args('userId') userId: number,
    @Args('FCMToken') FCMToken: string,
  ): Promise<string> {
    return this.fcmtokensService.createFCMToken({ userId, FCMToken });
  }

  // relation
}
