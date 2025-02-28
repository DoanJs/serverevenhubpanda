import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Follow } from './Follow.model';
import { FollowsService } from './Follows.service';
import { FollowInput } from './types/Follow.input';

@Resolver(() => Follow)
export class FollowsResolver {
  constructor(private followsService: FollowsService) {}

  @Query(() => [Follow])
  follows(): Promise<Follow[]> {
    return this.followsService.follows();
  }

  @Mutation(() => String)
  editFollow(
    @Args('type') type: string,
    @Args('followInput') followInput: FollowInput,
  ): Promise<string> {
    return this.followsService.editFollow({
      type,
      followInput,
    });
  }

  // relation
}
