import { Field, ObjectType } from '@nestjs/graphql';
import { Conversation } from 'src/conversations/Conversation.model';
import { User } from 'src/users/User.model';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Messages' })
@ObjectType()
export class Message {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_MessageID' })
  @Field()
  MessageID: number;

  @Column({ type: 'nvarchar', length: '20', nullable: true })
  @Field()
  type: string;

  @Column({ type: 'nvarchar', length: 'max', nullable: true })
  @Field()
  message: string;

  @Column({ type: 'nvarchar', length: 'max', nullable: true })
  @Field()
  mediaUrl: string;

  @Column({ type: 'nvarchar', length: '20', nullable: true })
  @Field()
  status: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  @Field({ nullable: true })
  createAt: Date;

  @Column({ type: 'date', nullable: true })
  @Field({ nullable: true })
  updateAt: Date;

  @Column({ type: 'date', nullable: true })
  @Field({ nullable: true })
  deleteAt: Date;

  // relation
  // one-to-one
  // many-to-one
  @ManyToOne(() => User, (user) => user.msgSenders, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'senderId',
    foreignKeyConstraintName: 'FK_senderId_Messages',
  })
  @Field(() => User, { nullable: true })
  sender: User;

  @ManyToOne(() => User, (user) => user.msgReceivers, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'receiverId',
    foreignKeyConstraintName: 'FK_receiverId_Messages',
  })
  @Field(() => User, { nullable: true })
  receiver: User;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'conversationId',
    foreignKeyConstraintName: 'FK_conversationId_Messages',
  })
  @Field(() => Conversation, { nullable: true })
  conversation: Conversation;

  // // many-to-many
 
}
