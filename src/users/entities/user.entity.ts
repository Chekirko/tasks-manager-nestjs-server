import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Category } from 'src/categories/entities/category.entity';
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum userRoles {
  user,
}

@Entity('users')
@ObjectType()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column()
  user: userRoles.user;

  @OneToMany(() => Category, (category) => category.user)
  @JoinTable()
  @Field(() => [Category], { nullable: true })
  categories: Category[];
}
