import { Controller, Get, UseGuards, HttpStatus, Param, Body, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/guard/auth.guard';
import { ZodPipe } from '@/zod-validation/zod-validation.pipe';
import { uuidSchema } from '@/validationSchema/common/uuid.schema';
import { UUID } from 'crypto';
import ResponseHelper from '@/utils/response.helper';
import errorHandler from '@/utils/error.helper';
import { FindAllDto, findAllSchema } from '@/validationSchema/common/findAll.schema';
import { BrandsService } from './brands.services';
import { CreateBrandDto, createBrandSchema } from '@/validationSchema/brands';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  private readonly res = new ResponseHelper();
  constructor(private readonly brandsService: BrandsService) {}

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query(new ZodPipe(findAllSchema)) payload: FindAllDto) {
    try {
      const response: any = await this.brandsService.findAll(payload);
      return this.res.successResponse({
        data: response.data,
        meta: response.meta,
        status: HttpStatus.OK,
        message: 'All Brands',
      });
    } catch (error: any) {
      throw errorHandler(error);
    }
  }
  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Get('/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'uuid format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    type: 'string',
  })
  async findOne(
    @Param('uuid', new ZodPipe(uuidSchema))
    uuid: UUID,
  ) {
    const response: any = await this.brandsService.findOne({ uuid });
    return this.res.successResponse({
      data: response,
      status: HttpStatus.FOUND,
      message: 'Brand found',
    });
  }

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body(new ZodPipe(createBrandSchema)) payload: CreateBrandDto) {
    try {
      const response: any = await this.brandsService.create(payload);
      return this.res.successResponse({
        data: response,
        status: HttpStatus.CREATED,
        message: 'Create new Brand',
      });
    } catch (error: any) {
      throw errorHandler(error);
    }
  }
}