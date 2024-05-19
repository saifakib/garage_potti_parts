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
import { EnginesController } from '@/parts/engines/engines.controller';
import { EnginesService } from '@/parts/engines/engines.service';
import { EnginesRepository } from '@/parts/engines/Engines.repository';
import { VehicleTypesController } from '@/parts/vehicle-types/vehicle-types.controller';
import { VehicleTypesService } from '@/parts/vehicle-types/vehicle-types.service';
import { VehicleTypesRepository } from '@/parts/vehicle-types/vehicle-types.repository';
import { VendorsController } from '@/parts/vendors/vendors.controller';
import { VendorsService } from '@/parts/vendors/vendors.service';
import { VendorsRepository } from '@/parts/vendors/vendors.repository';
import { PartsController } from '@/parts/parts/parts.controller';
import { PartsService } from '@/parts/parts/parts.service';
import { PartsRepository } from '@/parts/parts/parts.repository';

@Module({
  imports: [],
  controllers: [
    CategoryController,
    BrandsController,
    ModelsController,
    YearsController,
    EnginesController,
    VehicleTypesController,
    VendorsController,
    PartsController,
  ],
  providers: [
    CategoryService,
    CategoryRepository,
    BrandsService,
    BrandsRepository,
    ModelsService,
    ModelsRepository,
    YearsService,
    YearsRepository,
    EnginesService,
    EnginesRepository,
    VehicleTypesService,
    VehicleTypesRepository,
    VendorsService,
    VendorsRepository,
    PartsService,
    PartsRepository,
  ],
})
export class PartsModule {}
