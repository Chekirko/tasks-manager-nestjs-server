import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UsePipes, ValidationPipe } from '@nestjs/common';
// import { UpdateUserInput } from './dto/update-user.input';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  @UsePipes(new ValidationPipe())
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return await this.usersService.create(createUserInput);
  }

  // @Query(() => [User])
  // async findAll(): Promise<User[]> {
  //   return await this.usersService.findAll();
  // }

  @Query(() => User)
  async findOne(@Args('id') id: number): Promise<User> {
    return await this.usersService.findOne(id);
  }

  // @Mutation(() => User)
  // async updateUser(
  //   @Args('updateUserInput') updateUserInput: UpdateUserInput,
  // ): Promise<User> {
  //   return await this.usersService.update(updateUserInput);
  // }

  // @Mutation(() => Number)
  // async removeUser(@Args('id') id: number): Promise<number> {
  //   return await this.usersService.remove(id);
  // }
}
