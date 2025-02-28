import { Field, ObjectType } from '@nestjs/graphql';
import { Message } from 'src/messages/Message.model';
import { User } from 'src/users/User.model';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Conversations' })
@ObjectType()
export class Conversation {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_ConversationID' })
  @Field()
  ConversationID: number;

  @Column({ type: 'float', nullable: true })
  @Field({ nullable: true })
  isGroup: number;

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
  @OneToMany(() => Message, (message) => message.conversation)
  messages: [Message];
  // many-to-one
  @ManyToOne(() => User, (user) => user.conversations, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'creatorId',
    foreignKeyConstraintName: 'FK_CreatorId_Conversations',
  })
  @Field(() => User, { nullable: true })
  creator: User;

  // many-to-many
  @ManyToMany(() => User, (user) => user.user_conversations, {
    cascade: true,
    eager: true,
  })
  @JoinTable({
    name: 'Conversations_Users',
    joinColumn: {
      name: 'ConversationID',
      foreignKeyConstraintName: 'FK_ConversationID_Conversations_Users',
    },
    inverseJoinColumn: {
      name: 'UserID',
      foreignKeyConstraintName: 'FK_UserID_Conversations_Users',
    },
  })
  @Field(() => [User], { nullable: true })
  participants: [User];
}
