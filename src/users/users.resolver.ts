import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveProperty,
  Context,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Category } from 'src/categories/entities/category.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { TasksService } from 'src/tasks/tasks.service';
import { Task } from 'src/tasks/entities/task.entity';
// import { UpdateUserInput } from './dto/update-user.input';

@Resolver((of) => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly categoriesServise: CategoriesService,
    private readonly taskService: TasksService,
  ) {}

  @Mutation(() => User)
  @UsePipes(new ValidationPipe())
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return await this.usersService.create(createUserInput);
  }

  @Query(() => [User])
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async findOne(@Args('email') email: string): Promise<User> {
    return await this.usersService.findOne(email);
  }

  @ResolveField(() => [Category])
  async categories(@Parent() user: User) {
    return this.categoriesServise.findAll(user.id);
  }

  @ResolveField(() => [Task])
  async tasks(@Parent() category: Category) {
    return await this.taskService.findAll(category.id);
  }
}
