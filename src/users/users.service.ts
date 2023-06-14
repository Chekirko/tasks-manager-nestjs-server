import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User, userRoles } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    return await this.userRepository.save({
      ...createUserInput,
      user: userRoles.user,
    });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async update(updateUserInput: UpdateUserInput): Promise<User> {
    await this.userRepository.update(
      { id: updateUserInput.id },
      { ...updateUserInput },
    );
    return await this.findOne(updateUserInput.id);
  }

  async remove(id: number): Promise<number> {
    await this.userRepository.delete({ id });
    return id;
  }
}
