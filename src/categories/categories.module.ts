import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { Category } from './entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), TasksModule],
  providers: [CategoriesResolver, CategoriesService, TasksModule],
  exports: [CategoriesService],
})
export class CategoriesModule {}
