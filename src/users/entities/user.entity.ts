import { ObjectType, Field, Int } from '@nestjs/graphql';

export enum userRoles {
  user,
}

@ObjectType()
export class User {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  email: string;
  password: string;
  user: userRoles.user;
}
