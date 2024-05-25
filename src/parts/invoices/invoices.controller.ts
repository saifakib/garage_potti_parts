import { Body, Controller, Get, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { ZodPipe } from '@/zod-validation/zod-validation.pipe';
import ResponseHelper from '@/utils/response.helper';
import errorHandler from '@/utils/error.helper';
import { FindAllDto, findAllSchema } from '@/validationSchema/common/findAll.schema';
import { uuidSchema } from '@/validationSchema/common/uuid.schema';
import { UUID } from 'crypto';
import { InvoicesService } from './invoices.services';
import { CreateInvoicesDto, createInvoicesSchema } from '@/validationSchema/parts/invoices';

@ApiTags('Parts Invoices')
@Controller('parts/invoices')
export class InvoicesController {
  private readonly res = new ResponseHelper();
  constructor(private readonly invoicesService: InvoicesService) {}

  @ApiBearerAuth('JWT')
  @Get()
  async findAll(@Query(new ZodPipe(findAllSchema)) payload: FindAllDto) {
    try {
      const response: any = await this.invoicesService.findAll(payload);
      return this.res.successResponse({
        data: response.data,
        meta: response.meta,
        status: HttpStatus.OK,
        message: 'All Invoices found',
      });
    } catch (error: any) {
      throw errorHandler(error);
    }
  }

  @ApiBearerAuth('JWT')
  @Get('/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'uuid format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    type: 'string',
  })
  async findOne(@Param('uuid', new ZodPipe(uuidSchema)) uuid: UUID) {
    const response: any = await this.invoicesService.findOne({ uuid });
    return this.res.successResponse({
      data: response,
      status: HttpStatus.OK,
      message: 'Invoice found',
    });
  }

  @ApiBearerAuth('JWT')
  @Post('entries')
  async createPartsEntries(@Body(new ZodPipe(createInvoicesSchema)) payload: CreateInvoicesDto) {
    try {
      const response: any = await this.invoicesService.create(payload);
      return this.res.successResponse({
        data: response,
        status: HttpStatus.CREATED,
        message: 'Parts invoice create successfully',
      });
    } catch (error: any) {
      throw errorHandler(error);
    }
  }
}
