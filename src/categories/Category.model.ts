import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/User.model';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Categories' })
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_CategoryID' })
  @Field()
  CategoryID: number;

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

  @Column({ type: 'nvarchar', length: 20, nullable: true })
  @Field({ nullable: true })
  title: string;

  @Column({ type: 'nvarchar', length: 20, nullable: true })
  @Field({ nullable: true })
  color: string;

  @Column({ type: 'nvarchar', length: 20, nullable: true })
  @Field({ nullable: true })
  label: string;

  // relation
  // one-to-one

  // many-to-one

  // many-to-many
  @ManyToMany(() => User, (user) => user.interests, {
    cascade: true,
    eager: true,
  })
  @JoinTable({
    name: 'Categories_Users',
    joinColumn: {
      name: 'CategoryID',
      foreignKeyConstraintName: 'FK_CategoryID_Categories_Users',
    },
    inverseJoinColumn: {
      name: 'UserID',
      foreignKeyConstraintName: 'FK_UserID_Categories_Users',
    },
  })
  @Field(() => [User], { nullable: true })
  users: [User];
}
