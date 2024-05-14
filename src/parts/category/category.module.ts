import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';
import { CategoryController } from './category.controller';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
})
export class CategoryModule {}
