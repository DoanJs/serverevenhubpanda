import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/User.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Reviews' })
@ObjectType()
export class Review {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_ReviewID' })
  @Field()
  ReviewID: number;

  @Column({ type: 'float', nullable: true })
  @Field({ nullable: true })
  star: number;

  @Column({ type: 'nvarchar', length: 'max', nullable: true })
  @Field({ nullable: true })
  text: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  @Field({ nullable: true })
  createAt: Date;

  @Column({ type: 'date', nullable: true })
  @Field({ nullable: true })
  updateAt: Date;

  // relation
  // one-to-one
  // many-to-one
  @ManyToOne(() => User, (user) => user.reviewers, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'reviewerId',
    foreignKeyConstraintName: 'FK_reviewerId_Events',
  })
  @Field(() => User, { nullable: true })
  reviewer: User;

  @ManyToOne(() => User, (user) => user.reReviewers, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'reReviewerId',
    foreignKeyConstraintName: 'FK_reReviewerId_Events',
  })
  @Field(() => User, { nullable: true })
  reReviewer: User;

  // many-to-many
}
