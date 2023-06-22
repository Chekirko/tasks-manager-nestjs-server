import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async create(
    createCategoryInput: CreateCategoryInput,
    id: number,
  ): Promise<Category> {
    const existCategory = await this.categoriesRepository.find({
      where: {
        name: createCategoryInput.name,
        user: { id },
      },
    });

    if (existCategory.length)
      throw new BadRequestException('This category already exist');
    const newCategory = await this.categoriesRepository.save({
      name: createCategoryInput.name,
      user: { id },
    });

    return newCategory;
  }

  async findAll(id: number) {
    return await this.categoriesRepository.find({
      where: { userId: id },
    });
  }

  async findOne(id: number) {
    return await this.categoriesRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(updateCategoryInput: UpdateCategoryInput): Promise<Category> {
    await this.categoriesRepository.update(
      { id: updateCategoryInput.id },
      { ...updateCategoryInput },
    );
    return await this.findOne(updateCategoryInput.id);
  }

  async remove(id: number) {
    const deletedCategory = await this.findOne(id);
    await this.categoriesRepository.delete({ id });
    return deletedCategory;
  }
}
