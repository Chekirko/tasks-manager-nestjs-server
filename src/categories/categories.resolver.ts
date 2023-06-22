import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TasksService } from 'src/tasks/tasks.service';
import { Task } from 'src/tasks/entities/task.entity';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly tasksService: TasksService,
  ) {}

  @Mutation(() => Category)
  @UseGuards(JwtAuthGuard)
  async createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
    @Context() context,
  ) {
    const { user } = context.req;
    return await this.categoriesService.create(
      createCategoryInput,
      user.userId,
    );
  }

  @Query(() => [Category], { name: 'categories' })
  @UseGuards(JwtAuthGuard)
  async findAll(@Context() context): Promise<Category[]> {
    const { user } = context.req;
    return await this.categoriesService.findAll(user.userId);
  }

  @ResolveField(() => [Task])
  async tasks(@Parent() category: Category) {
    return this.tasksService.findAll(category.id);
  }

  @Query(() => Category, { name: 'category' })
  @UseGuards(JwtAuthGuard)
  async findOne(@Args('id') id: number) {
    return await this.categoriesService.findOne(id);
  }

  @Mutation(() => Category)
  @UseGuards(JwtAuthGuard)
  async updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ) {
    return await this.categoriesService.update(updateCategoryInput);
  }

  @Mutation(() => Category)
  @UseGuards(JwtAuthGuard)
  removeCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoriesService.remove(id);
  }
}
