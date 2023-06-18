import { InputType, Int, Field } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreateCategoryInput {
  @Field()
  @MinLength(6, {
    message: 'Title must be more than 6 symbols',
  })
  name: string;
}
