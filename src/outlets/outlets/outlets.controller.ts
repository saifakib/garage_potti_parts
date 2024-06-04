import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import ResponseHelper from '@/utils/response.helper';
import { OutletService } from './outlets.service';
import { AuthGuard } from '@/guard/auth.guard';
import { ZodPipe } from '@/zod-validation/zod-validation.pipe';
import { FindAllDto, findAllSchema } from '@/validationSchema/common/findAll.schema';
import errorHandler from '@/utils/error.helper';
import { CreateOutletDto, createOutletSchema, UpdateOutletDto, updateOutletSchema } from '@/validationSchema/outlets';
import { uuidSchema } from '@/validationSchema/common/uuid.schema';
import { UUID } from 'crypto';

@ApiTags('Outlets')
@Controller('outlets')
export class OutletController {
  private readonly res = new ResponseHelper();
  constructor(private readonly outletService: OutletService) {}

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query(new ZodPipe(findAllSchema)) payload: FindAllDto) {
    try {
      const response: any = await this.outletService.findAll(payload);
      return this.res.successResponse({
        data: response.data,
        meta: response.meta,
        status: HttpStatus.OK,
        message: 'All Outlets',
      });
    } catch (error: any) {
      throw errorHandler(error);
    }
  }

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body(new ZodPipe(createOutletSchema)) payload: CreateOutletDto) {
    try {
      const response: any = await this.outletService.create(payload);
      return this.res.successResponse({
        data: response,
        status: HttpStatus.CREATED,
        message: 'Create new Outlet',
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
  async findOne(@Param('uuid', new ZodPipe(uuidSchema)) uuid: UUID) {
    const response: any = await this.outletService.findOne({ uuid });
    return this.res.successResponse({
      data: response,
      status: HttpStatus.OK,
      message: 'Outlet found',
    });
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
    @Body(new ZodPipe(updateOutletSchema)) payload: UpdateOutletDto,
  ) {
    try {
      const response: any = await this.outletService.update(uuid, payload);
      return this.res.successResponse({
        data: response,
        status: HttpStatus.ACCEPTED,
        message: 'Update outlet successfully',
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
      const response: any = await this.outletService.delete({ uuid });
      return this.res.successResponse({
        data: response,
        status: HttpStatus.ACCEPTED,
        message: 'Delete outlet successfully',
      });
    } catch (error: any) {
      throw errorHandler(error);
    }
  }
}
