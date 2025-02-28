import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GraphQLGuard } from 'src/auth/GraphQL.Guard';
import { Position } from './Position.model';
import { PositionsService } from './Position.service';
import { ParamsInput } from 'src/utils/types/Params.input';

@Resolver(() => Position)
@UseGuards(GraphQLGuard)
export class PositionsResolver {
  constructor(private positionsService: PositionsService) {}

  @Query(() => [Position])
  positions(
    @Args('paramsInput') paramsInput: ParamsInput,
  ): Promise<Position[]> {
    return this.positionsService.positions(paramsInput);
  }

  // relation
}
