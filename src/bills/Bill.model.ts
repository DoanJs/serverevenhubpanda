import { Field, ObjectType } from '@nestjs/graphql';
import { Event } from 'src/events/Event.model';
import { User } from 'src/users/User.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Bills' })
@ObjectType()
export class Bill {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_BillID' })
  @Field()
  BillID: number;

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

  @Column({ type: 'int', nullable: true })
  @Field({ nullable: true })
  price: number;

  @Column({ type: 'nvarchar', length: 20, nullable: true, default: 'pending' })
  @Field({ nullable: true })
  status: string;

  // relation
  // one-to-one

  // many-to-one
  @ManyToOne(() => User, (user) => user.bills, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'userBuyId',
    foreignKeyConstraintName: 'FK_userBuyId_Bills',
  })
  @Field(() => User, { nullable: true })
  userBuy: User;

  @ManyToOne(() => User, (user) => user.billAuthors, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'authorEventId',
    foreignKeyConstraintName: 'FK_authorEventId_Bills',
  })
  @Field(() => User, { nullable: true })
  authorEvent: User;

  @ManyToOne(() => Event, (event) => event.bills, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'eventId',
    foreignKeyConstraintName: 'FK_eventId_Bills',
  })
  @Field(() => Event, { nullable: true })
  eventBuy: Event;

  // many-to-many
}
