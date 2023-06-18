import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTaskInput {
  @Field()
  name: string;

  @Field()
  dateStart: string;

  @Field()
  dateEnd: string;

  @Field(() => Int)
  categoryId: number;
}
