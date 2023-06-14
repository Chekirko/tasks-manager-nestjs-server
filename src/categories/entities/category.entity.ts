import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity('categories')
export class Category {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @CreateDateColumn()
  dateCreated: Date;

  @Field()
  @Column()
  @ManyToOne(() => User, (user) => user.id)
  userId: User;
}
