import { MinLength } from 'class-validator';
import { CreateCategoryInput } from './create-category.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
  @Field(() => Int)
  id: number;

  @Field()
  @MinLength(6, {
    message: 'Title must be more than 6 symbols',
  })
  name: string;
}
