import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/User.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Follows' })
@ObjectType()
export class Follow {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_FollowID' })
  @Field()
  FollowID: number;

  @Column({
    type: 'date',
    nullable: true,
    default: new Date().toLocaleDateString(),
  })
  @Field({ nullable: true })
  createAt: Date;

  @Column({ type: 'date', nullable: true })
  @Field({ nullable: true })
  updateAt: Date;

  // relation
  // one-to-one

  // many-to-one
  @ManyToOne(() => User, (user) => user.followings, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'followingId',
    foreignKeyConstraintName: 'FK_followingId_Follows',
  })
  following_user: User;

  @ManyToOne(() => User, (user) => user.followers, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'followerId',
    foreignKeyConstraintName: 'FK_followerId_Follows',
  })
  follower_user: User;
  // many-to-many
}
