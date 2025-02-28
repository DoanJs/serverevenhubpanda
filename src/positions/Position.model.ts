import { Field, ObjectType } from '@nestjs/graphql';
import { Event } from 'src/events/Event.model';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Positions' })
@ObjectType()
export class Position {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_PositionID' })
  @Field()
  PositionID: number;

  @Column({ type: 'float', nullable: true })
  @Field({ nullable: true })
  lat: number;

  @Column({ type: 'float', nullable: true })
  @Field({ nullable: true })
  lng: number;

  // relation
  @OneToOne(() => Event, (event) => event.position, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'eventId',
    foreignKeyConstraintName: 'FK_eventId_Events',
  })
  event: Event;
  // one-to-one
  // many-to-one
  // many-to-many
}
