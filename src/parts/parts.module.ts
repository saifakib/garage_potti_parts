import { Module } from '@nestjs/common';
import { CategoryController } from '@/parts/category/category.controller';
import { CategoryService } from '@/parts/category/category.service';
import { CategoryRepository } from '@/parts/category/category.repository';
import { BrandsController } from '@/parts/brands/brands.controller';
import { BrandsService } from '@/parts/brands/brands.service';
import { BrandsRepository } from '@/parts/brands/brands.repository';
import { ModelsController } from '@/parts/models/models.controller';
import { ModelsService } from '@/parts/models/models.service';
import { ModelsRepository } from '@/parts/models/models.repository';
import { YearsController } from '@/parts/years/years.controller';
import { YearsService } from '@/parts/years/years.service';
import { YearsRepository } from '@/parts/years/years.repository';

@Module({
  imports: [],
  controllers: [CategoryController, BrandsController, ModelsController, YearsController],
  providers: [
    CategoryService,
    CategoryRepository,
    BrandsService,
    BrandsRepository,
    ModelsService,
    ModelsRepository,
    YearsService,
    YearsRepository,
  ],
})
export class PartsModule {}
