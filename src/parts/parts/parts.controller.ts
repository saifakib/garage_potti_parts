import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ZodPipe } from '@/zod-validation/zod-validation.pipe';
import ResponseHelper from '@/utils/response.helper';
import errorHandler from '@/utils/error.helper';
import { FindAllDto, findAllSchema } from '@/validationSchema/common/findAll.schema';
import { PartsService } from './parts.service';

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
}
