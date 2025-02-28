import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GraphQLGuard } from 'src/auth/GraphQL.Guard';
import { Event } from 'src/events/Event.model';
import { Position } from 'src/positions/Position.model';
import { User } from 'src/users/User.model';
import { ParamsInput } from 'src/utils/types/Params.input';
import { EventsService } from './Events.service';
import { EventInput } from './type/event.input';
import { EventConditionInput } from './type/eventCondition.input';
import { FilterEventsData } from './type/filterEventsData.input';

@Resolver(() => Event)
@UseGuards(GraphQLGuard)
export class EventsResolver {
  constructor(private eventsService: EventsService) {}

  @Query(() => [Event])
  events(@Args('paramsInput') paramsInput: ParamsInput): Promise<Event[]> {
    return this.eventsService.events(paramsInput);
  }

  @Query(() => [Event])
  getEventConditions(
    @Args('eventConditionInput') eventConditionInput: EventConditionInput,
  ): Promise<Event[]> {
    return this.eventsService.getEventConditions(eventConditionInput);
  }

  @Query(() => Event)
  event(@Args('eventId') eventId: number): Promise<Event> {
    return this.eventsService.event(eventId);
  }

  @Query(() => [Event])
  events_upcoming(): Promise<Event[]> {
    return this.eventsService.events_upcoming();
  }

  @Query(() => [Event])
  events_nearby(
    @Args('paramsInput') paramsInput: ParamsInput,
  ): Promise<Event[]> {
    return this.eventsService.events_nearby(paramsInput);
  }

  @Mutation(() => [Event])
  searchEvent(@Args('keySearch') keySearch: string): Promise<Event[]> {
    return this.eventsService.searchEvent(keySearch);
  }

  @Mutation(() => Event)
  createEvent(
    @Args('eventinput', { type: () => EventInput }) eventinput: EventInput,
  ): Promise<Event> {
    return this.eventsService.createEvent(eventinput);
  }

  @Mutation(() => [Event])
  filterEventsCondition(
    @Args('filterEventsData') filterEventsData: FilterEventsData,
  ): Promise<Event[]> {
    return this.eventsService.filterEventsCondition(filterEventsData);
  }

  @Mutation(() => String)
  pushInviteNotifications(
    @Args('userIds', { type: () => [Number] }) userIds: number[],
    @Args('authorId') authorId: number,
    @Args('eventId') eventId: number,
  ): Promise<string> {
    return this.eventsService.pushInviteNotifications({
      userIds,
      eventId,
      authorId,
    });
  }

  // relation
  @ResolveField(() => User)
  author(@Parent() event: Event): Promise<User> {
    return this.eventsService.author(event);
  }

  @ResolveField(() => [User])
  users(@Parent() event: Event): Promise<User[]> {
    return this.eventsService.users(event);
  }

  @ResolveField(() => Position)
  position(@Parent() event: Event): Promise<Position> {
    return this.eventsService.position(event);
  }

  @ResolveField(() => [User])
  followers(@Parent() event: Event): Promise<User[]> {
    return this.eventsService.followers(event);
  }
}
