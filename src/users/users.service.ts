import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User, userRoles } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const existUser = await this.userRepository.findOne({
      where: { email: createUserInput.email },
    });

    if (existUser) throw new BadRequestException('This email already used');
    const user = await this.userRepository.save({
      email: createUserInput.email,
      password: await argon2.hash(createUserInput.password),
      user: userRoles.user,
    });

    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  // async update(updateUserInput: UpdateUserInput): Promise<User> {
  //   await this.userRepository.update(
  //     { id: updateUserInput.id },
  //     { ...updateUserInput },
  //   );
  //   return await this.findOne(updateUserInput.id);
  // }

  // async remove(id: number): Promise<number> {
  //   await this.userRepository.delete({ id });
  //   return id;
  // }
}
