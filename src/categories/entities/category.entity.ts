import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('categories')
@ObjectType()
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

  @ManyToOne(() => User, (user) => user.categories)
  @Field(() => User, { nullable: true })
  user: User;

  @Column({ nullable: true })
  @Field({ nullable: true })
  userId: number;

  @OneToMany(() => Task, (task) => task.categories)
  @Field(() => [Task], { nullable: true }) //important to be array
  tasks: Task[];
}
