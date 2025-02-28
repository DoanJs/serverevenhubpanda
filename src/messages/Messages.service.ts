import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataLoaderService } from 'src/dataloader/Dataloader.service';
import { Repository } from 'typeorm';
import { Message } from './Message.model';
import { MessageInput } from './type/message.input';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    private dataloaderService: DataLoaderService,
  ) {}

  async messages(): Promise<Message[]> {
    return this.messageRepository.query(`select * from Messages `);
  }

  // async getMessageByCreators(creatorId: number): Promise<Message[]> {
  //   return this.messageRepository.query(
  //     `select * from Messages where creatorId = ${creatorId}`,
  //   );
  // }

  async createMessage(messageInput: MessageInput): Promise<Message> {
    const { type, message, senderId, receiverId, conversationId } =
      messageInput;

    const sender = await this.messageRepository.query(
      `select * from Users where UserID = ${senderId}`,
    );
    const receiver = await this.messageRepository.query(
      `select * from Users where UserID = ${receiverId}`,
    );
    const conversation = await this.messageRepository.query(
      `select * from Conversations where ConversationID = ${conversationId}`,
    );

    const result = await this.messageRepository.create({
      ...messageInput,
      type,
      message,
      sender: sender && sender[0],
      receiver: receiver && receiver[0],
      conversation: conversation && conversation[0],
      createAt: new Date().toLocaleDateString(),
    });
    await this.messageRepository.save(result);

    return result;
  }

  // async deleteMessage(MessageId: number): Promise<Message> {
  //   const Message = await this.MessageRepository.query(
  //     `select * from Messages where MessageID = ${MessageId}`,
  //   );
  //   await this.MessageRepository.delete({
  //     MessageID: MessageId,
  //   });
  //   return Message[0];
  // }

  // // relation
  // async creator(Message: any): Promise<User> {
  //   if (Message.creatorId) {
  //     return this.dataloaderService.loaderUser.load(Message.creatorId);
  //   }
  // }

  // async reMessageer(Message: any): Promise<User> {
  //   if (Message.reMessageerId) {
  //     return this.dataloaderService.loaderUser.load(Message.reMessageerId);
  //   }
  // }
}
