import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  email: string;

  @MinLength(6, {
    message: 'Password is too short',
  })
  @Field()
  password: string;
}
