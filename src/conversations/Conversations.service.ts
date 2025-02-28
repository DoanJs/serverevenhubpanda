import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataLoaderService } from 'src/dataloader/Dataloader.service';
import { User } from 'src/users/User.model';
import { Repository } from 'typeorm';
import { Conversation } from './Conversation.model';
import { ConversationInput } from './type/conversation.input';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
    private dataloaderService: DataLoaderService,
  ) {}

  async conversations(): Promise<Conversation[]> {
    return this.conversationRepository.query(`select * from Conversations `);
  }

  async getConversationByCreators(creatorId: number): Promise<Conversation[]> {
    return this.conversationRepository.query(
      `select * from Conversations where creatorId = ${creatorId}`,
    );
  }

  async createConversation(
    conversationInput: ConversationInput,
  ): Promise<Conversation> {
    const handleSelectItemOtherInArr = (arr: any, id: number) => {
      const result = arr.filter((item) => item !== id);
      return result[0];
    };
    const { isGroup, creatorId, participantIds } = conversationInput;

    const conversations = await this.conversationRepository.query(
      `select C.*, CU.UserID from Conversations as C 
        inner join Conversations_Users as CU 
        on C.ConversationID = CU.ConversationID 
        where C.creatorId = ${creatorId} and UserID = ${handleSelectItemOtherInArr(participantIds, creatorId)}`,
    );

    if (conversations && conversations.length > 0) {
      return conversations[0];
    } else {
      const resultLoader = participantIds.map((userId: number) =>
        this.dataloaderService.loaderUser.load(userId),
      );
      const participants = (await Promise.all(resultLoader)) as User[];

      const creator = participants.filter(
        (user: User) => user.UserID === creatorId,
      )[0];

      const result = await this.conversationRepository.create({
        ...conversationInput,
        isGroup,
        creator,
        participants,
        createAt: new Date().toLocaleDateString(),
      });
      await this.conversationRepository.save(result);

      return result;
    }
  }

  async deleteConversation(conversationId: number): Promise<Conversation> {
    const conversation = await this.conversationRepository.query(
      `select * from Conversations where ConversationID = ${conversationId}`,
    );
    await this.conversationRepository.delete({
      ConversationID: conversationId,
    });
    return conversation[0];
  }

  // relation
  async creator(conversation: any): Promise<User> {
    if (conversation.creatorId) {
      return this.dataloaderService.loaderUser.load(conversation.creatorId);
    }
  }

  async participants(conversationId: number): Promise<User[]> {
    return this.conversationRepository.query(
      `select * from Conversations_Users where ConversationID = ${conversationId}`,
    );
  }

  // async reConversationer(Conversation: any): Promise<User> {
  //   if (Conversation.reConversationerId) {
  //     return this.dataloaderService.loaderUser.load(Conversation.reConversationerId);
  //   }
  // }
}
