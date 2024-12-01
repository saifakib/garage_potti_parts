import { Controller, Get, UseGuards, HttpStatus, Param, Body, Post, Query, Delete, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/guard/auth.guard';
import { PermissionGuard } from '@/guard/permission.guard';
import { Permission } from '@/decorators/permission.decorator';
import { ZodPipe } from '@/zod-validation/zod-validation.pipe';
import { uuidSchema } from '@/validationSchema/common/uuid.schema';
import { UUID } from 'crypto';
import ResponseHelper from '@/utils/response.helper';
import errorHandler from '@/utils/error.helper';
import { FindAllDto, findAllSchema } from '@/validationSchema/common/findAll.schema';
import {
  CreateCategoryDto,
  CreateCategoryOptionDto,
  CreateCategoryOptionEntityDto,
  createCategoryOptionEntitySchema,
  createCategoryOptionSchema,
  createCategorySchema,
  UpdateCategoryDto,
  UpdateCategoryOptionDto,
  updateCategoryOptionSchema,
  updateCategorySchema,
} from '@/validationSchema/parts/category';
import { CategoryService } from './category.service';

@ApiTags('Parts Category | options | entity')
@Controller('parts/categories')
export class CategoryController {
  private readonly res = new ResponseHelper();
  constructor(private readonly categoryService: CategoryService) {}

  @ApiBearerAuth('JWT')
  @Permission('VIEW_CATEGORY')
  @UseGuards(AuthGuard, PermissionGuard)
  @Get()
  async findAll(@Query(new ZodPipe(findAllSchema)) payload: FindAllDto) {
    try {
      const response: any = await this.categoryService.findAll(payload);
      return this.res.successResponse({
        data: response.data,
        meta: response.meta,
        status: HttpStatus.OK,
        message: 'All Parts Categories',
      });
    } catch (error: any) {
      throw errorHandler(error);
    }
  }

  @ApiBearerAuth('JWT')
  @Permission('VIEW_CATEGORY')
  @UseGuards(AuthGuard, PermissionGuard)
  @Get('/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'uuid format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    type: 'string',
  })
  async findOne(@Param('uuid', new ZodPipe(uuidSchema)) uuid: UUID) {
    const response: any = await this.categoryService.findOne({ uuid });
    return this.res.successResponse({
      data: response,
      status: HttpStatus.OK,
      message: 'Parts Category found',
    });
  }

  @ApiBearerAuth('JWT')
  @Permission('CREATE_CATEGORY')
  @UseGuards(AuthGuard, PermissionGuard)
  @Post()
  async create(@Body(new ZodPipe(createCategorySchema)) createCategoryDto: CreateCategoryDto) {
    try {
      const response: any = await this.categoryService.create(createCategoryDto);
      return this.res.successResponse({
        data: response,
        status: HttpStatus.CREATED,
        message: 'Create a new parts category',
      });
    } catch (error: any) {
      throw errorHandler(error);
    }
  }

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Patch('/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'uuid format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    type: 'string',
  })
  async update(
    @Param('uuid', new ZodPipe(uuidSchema)) uuid: UUID,
    @Body(new ZodPipe(updateCategorySchema)) payload: UpdateCategoryDto,
  ) {
    try {
      const response: any = await this.categoryService.update(uuid, payload);
      return this.res.successResponse({
        data: response,
        status: HttpStatus.ACCEPTED,
        message: 'Update category successfully',
      });
    } catch (error: any) {
      throw errorHandler(error);
    }
  }

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Delete('/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'uuid format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    type: 'string',
  })
  async delete(@Param('uuid', new ZodPipe(uuidSchema)) uuid: UUID) {
    try {
      const response: any = await this.categoryService.delete({ uuid });
      return this.res.successResponse({
        data: response,
        status: HttpStatus.ACCEPTED,
        message: 'Delete category successfully',
      });
    } catch (error: any) {
      throw errorHandler(error);
    }
  }

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Post('/options')
  async createOption(@Body(new ZodPipe(createCategoryOptionSchema)) payload: CreateCategoryOptionDto) {
    try {
      const response: any = await this.categoryService.createOption(payload);
      return this.res.successResponse({
        data: response,
        status: HttpStatus.CREATED,
        message: 'Create a new parts category options',
      });
    } catch (error: any) {
      throw errorHandler(error);
    }
  }

  @ApiBearerAuth('JWT')
  @Permission('VIEW_CATEGORY')
  @UseGuards(AuthGuard)
  @Get('options/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'uuid format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    type: 'string',
  })
  async findOneOption(@Param('uuid', new ZodPipe(uuidSchema)) uuid: UUID) {
    const response: any = await this.categoryService.findOneOption({ uuid });
    return this.res.successResponse({
      data: response,
      status: HttpStatus.OK,
      message: 'Parts option found',
    });
  }

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Patch('options/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'uuid format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    type: 'string',
  })
  async updateOption(
    @Param('uuid', new ZodPipe(uuidSchema)) uuid: UUID,
    @Body(new ZodPipe(updateCategoryOptionSchema)) payload: UpdateCategoryOptionDto,
  ) {
    try {
      const response: any = await this.categoryService.updateOption(uuid, payload);
      return this.res.successResponse({
        data: response,
        status: HttpStatus.ACCEPTED,
        message: 'Update category option successfully',
      });
    } catch (error: any) {
      throw errorHandler(error);
    }
  }

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Delete('/options/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'uuid format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    type: 'string',
  })
  async deleteOption(@Param('uuid', new ZodPipe(uuidSchema)) uuid: UUID) {
    try {
      const response: any = await this.categoryService.deleteOption({ uuid });
      return this.res.successResponse({
        data: response,
        status: HttpStatus.ACCEPTED,
        message: 'Delete category option successfully',
      });
    } catch (error: any) {
      throw errorHandler(error);
    }
  }

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Post('/options/entities')
  async createOptionEntity(
    @Body(new ZodPipe(createCategoryOptionEntitySchema)) payload: CreateCategoryOptionEntityDto,
  ) {
    try {
      const response: any = await this.categoryService.createOptionEntity(payload);
      return this.res.successResponse({
        data: response,
        status: HttpStatus.CREATED,
        message: 'Create a new parts category options entity',
      });
    } catch (error: any) {
      throw errorHandler(error);
    }
  }
  @ApiBearerAuth('JWT')
  @Permission('VIEW_CATEGORY')
  @UseGuards(AuthGuard)
  @Get('options/entities/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'uuid format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    type: 'string',
  })
  async findOneOptionEntity(@Param('uuid', new ZodPipe(uuidSchema)) uuid: UUID) {
    const response: any = await this.categoryService.findOneOptionEntity({ uuid });
    return this.res.successResponse({
      data: response,
      status: HttpStatus.OK,
      message: 'Parts option entity found',
    });
  }

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Patch('options/entities/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'uuid format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    type: 'string',
  })
  async updateOptionEntity(
    @Param('uuid', new ZodPipe(uuidSchema)) uuid: UUID,
    @Body(new ZodPipe(updateCategoryOptionSchema)) payload: UpdateCategoryOptionDto,
  ) {
    try {
      const response: any = await this.categoryService.updateOptionEntity(uuid, payload);
      return this.res.successResponse({
        data: response,
        status: HttpStatus.ACCEPTED,
        message: 'Update category option entity successfully',
      });
    } catch (error: any) {
      throw errorHandler(error);
    }
  }

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Delete('/options/entities/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'uuid format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    type: 'string',
  })
  async deleteOptionEntity(@Param('uuid', new ZodPipe(uuidSchema)) uuid: UUID) {
    try {
      const response: any = await this.categoryService.deleteOptionEntity({ uuid });
      return this.res.successResponse({
        data: response,
        status: HttpStatus.ACCEPTED,
        message: 'Delete category option entity successfully',
      });
    } catch (error: any) {
      throw errorHandler(error);
    }
  }
}
