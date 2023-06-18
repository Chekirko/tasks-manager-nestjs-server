import { CreateTaskInput } from './create-task.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTaskInput extends PartialType(CreateTaskInput) {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  dateStart?: string;

  @Field({ nullable: true })
  dateEnd?: string;

  @Field(() => Int)
  categoryId: number;
}
