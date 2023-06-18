import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskInput: CreateTaskInput) {
    const existTask = await this.tasksRepository.find({
      where: {
        name: createTaskInput.name,
        categoryId: createTaskInput.categoryId,
      },
    });

    if (existTask.length) {
      throw new BadRequestException('Task with the same name already exist');
    }

    const newTask = await this.tasksRepository.save({
      name: createTaskInput.name,
      dateStart: createTaskInput.dateStart,
      dateEnd: createTaskInput.dateEnd,
      categoryId: createTaskInput.categoryId,
    });
    return newTask;
  }

  async findAll(id: number) {
    return await this.tasksRepository.find({
      where: {
        categoryId: id,
      },
    });
  }

  async findOne(id: number) {
    return await this.tasksRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateTaskInput: UpdateTaskInput): Promise<Task> {
    await this.tasksRepository.update(
      { id: id },
      { id: id, ...updateTaskInput },
    );
    return await this.findOne(id);
  }

  async remove(id: number): Promise<number> {
    await this.tasksRepository.delete({ id });
    return id;
  }
}
