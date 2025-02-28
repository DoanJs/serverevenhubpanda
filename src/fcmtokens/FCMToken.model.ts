import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/User.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'FCMTokens' })
@ObjectType()
export class FCMToken {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_FCMTokenID' })
  @Field()
  FCMTokenID: number;

  @Column({ type: 'nvarchar', length: 'max', nullable: true })
  @Field({ nullable: true })
  FCMToken: string;

  // relation

  // one-to-many
  // many-to-one
  @ManyToOne(() => User, (user) => user.fcmTokens, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'userId',
    foreignKeyConstraintName: 'FK_userId_FCMTokens',
  })
  @Field(() => User, { nullable: true })
  user: User;
  // many-to-many
}
