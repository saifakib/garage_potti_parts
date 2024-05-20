import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ZodPipe } from '@/zod-validation/zod-validation.pipe';
import ResponseHelper from '@/utils/response.helper';
import errorHandler from '@/utils/error.helper';
import { FindAllDto, findAllSchema } from '@/validationSchema/common/findAll.schema';
import { PartsService } from './parts.service';
import { CreatePartsDto, createPartsSchema } from '@/validationSchema/parts/parts';

@ApiTags('Parts & Accessories')
@Controller('parts')
export class PartsController {
  private readonly res = new ResponseHelper();
  constructor(private readonly partsService: PartsService) {}

  @ApiBearerAuth('JWT')
  @Get()
  async findAll(@Query(new ZodPipe(findAllSchema)) payload: FindAllDto) {
    try {
      const response: any = await this.partsService.findAll(payload);
      return this.res.successResponse({
        data: response.data,
        meta: response.meta,
        status: HttpStatus.OK,
        message: 'All Parts & Accessories',
      });
    } catch (error: any) {
      throw errorHandler(error);
    }
  }

  @ApiBearerAuth('JWT')
  @Post()
  async create(@Body(new ZodPipe(createPartsSchema)) payload: CreatePartsDto) {
    try {
      const response: any = await this.partsService.create(payload);
      return this.res.successResponse({
        data: response,
        status: HttpStatus.CREATED,
        message: 'Create new parts successfully!!',
      });
    } catch (error: any) {
      throw errorHandler(error);
    }
  }
}
