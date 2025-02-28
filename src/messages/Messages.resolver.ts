import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLGuard } from 'src/auth/GraphQL.Guard';
import { Message } from './Message.model';
import { MessagesService } from './Messages.service';
import { MessageInput } from './type/message.input';

@Resolver(() => Message)
@UseGuards(GraphQLGuard)
export class MessagesResolver {
  constructor(private messagesService: MessagesService) {}

  @Query(() => [Message])
  messages(): Promise<Message[]> {
    return this.messagesService.messages();
  }

  // @Query(() => [Message])
  // getMessageByCreators(
  //   @Args('creatorId') creatorId: number,
  // ): Promise<Message[]> {
  //   return this.messagesService.getMessageByCreators(creatorId);
  // }

  @Mutation(() => Message)
  createMessage(
    @Args('messageInput') messageInput: MessageInput,
  ): Promise<Message> {
    return this.messagesService.createMessage(messageInput);
  }

  // @Mutation(() => Message)
  // deleteMessage(
  //   @Args('MessageId') MessageId: number,
  // ): Promise<Message> {
  //   return this.messagesService.deleteMessage(MessageId);
  // }

  // // // relation

  // @ResolveField(() => User)
  // creator(@Parent() Message: Message): Promise<User> {
  //   return this.messagesService.creator(Message);
  // }

  // @ResolveField(() => User)
  // reMessageer(@Parent() Message: Message): Promise<User> {
  //   return this.messagesService.reMessageer(Message);
  // }
}
