import { Controller, Get, UseGuards, HttpStatus, Param, Body, Post, Query, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/guard/auth.guard';
import { ZodPipe } from '@/zod-validation/zod-validation.pipe';
import { uuidSchema } from '@/validationSchema/common/uuid.schema';
import { UUID } from 'crypto';
import ResponseHelper from '@/utils/response.helper';
import errorHandler from '@/utils/error.helper';
import { FindAllDto, findAllSchema } from '@/validationSchema/common/findAll.schema';
import { CreateVendorDto, createVendorSchema } from '@/validationSchema/parts/Vendors';
import { VendorsService } from './vendors.service';

@ApiTags('Vendors')
@Controller('parts/vendors')
export class VendorsController {
  private readonly res = new ResponseHelper();
  constructor(private readonly vendorsService: VendorsService) {}

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query(new ZodPipe(findAllSchema)) payload: FindAllDto) {
    try {
      const response: any = await this.vendorsService.findAll(payload);
      return this.res.successResponse({
        data: response.data,
        meta: response.meta,
        status: HttpStatus.OK,
        message: 'All Vendors',
      });
    } catch (error: any) {
      throw errorHandler(error);
    }
  }

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body(new ZodPipe(createVendorSchema)) payload: CreateVendorDto) {
    try {
      const response: any = await this.vendorsService.create(payload);
      return this.res.successResponse({
        data: response,
        status: HttpStatus.CREATED,
        message: 'Create new Vendor',
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
    const response: any = await this.vendorsService.findOne({ uuid });
    return this.res.successResponse({
      data: response,
      status: HttpStatus.FOUND,
      message: 'Vendor found',
    });
  }

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Delete('/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'uuid format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    type: 'string',
  })
  async delete(
    @Param('uuid', new ZodPipe(uuidSchema))
    uuid: UUID,
  ) {
    try {
      const response: any = await this.vendorsService.delete({ uuid });
      return this.res.successResponse({
        data: response,
        status: HttpStatus.ACCEPTED,
        message: 'Delete vendor successfully',
      });
    } catch (error: any) {
      throw errorHandler(error);
    }
  }
}
