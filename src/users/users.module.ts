import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Category } from 'src/categories/entities/category.entity';
import { CategoriesModule } from 'src/categories/categories.module';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Category]),
    CategoriesModule,
    TasksModule,
  ],
  providers: [UsersResolver, UsersService, TasksModule, CategoriesModule],
  exports: [UsersService],
})
export class UsersModule {}
