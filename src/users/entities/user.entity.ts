import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
