import { Module } from '@nestjs/common';
import { CategoryController } from '@/parts/category/category.controller';
import { CategoryService } from '@/parts/category/category.service';
import { CategoryRepository } from '@/parts/category/category.repository';
import { BrandsController } from '@/parts/brands/brands.controller';
import { BrandsService } from '@/parts/brands/brands.services';
import { BrandsRepository } from '@/parts/brands/brands.repository';

@Module({
  imports: [],
  controllers: [CategoryController, BrandsController],
  providers: [CategoryService, CategoryRepository, BrandsService, BrandsRepository],
})
export class PartsModule {}
