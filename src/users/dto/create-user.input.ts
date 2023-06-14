import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  email: string;

  @Field(() => Int, { description: 'Example field (placeholder)' })
  password: string;
}
