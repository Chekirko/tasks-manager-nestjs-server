import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Category } from 'src/categories/entities/category.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tasks')
@ObjectType()
export class Task {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  dateStart: string;

  @Field()
  @Column()
  dateEnd: string;

  @ManyToOne(() => Category, (category) => category.tasks)
  @Field(() => Category)
  categories: Category;

  @Column({ nullable: true })
  @Field({ nullable: true })
  categoryId: number;
}
