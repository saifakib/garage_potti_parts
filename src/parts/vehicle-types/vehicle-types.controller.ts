import { Controller, Get, UseGuards, HttpStatus, Param, Body, Post, Query, Delete, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/guard/auth.guard';
import { ZodPipe } from '@/zod-validation/zod-validation.pipe';
import { uuidSchema } from '@/validationSchema/common/uuid.schema';
import { UUID } from 'crypto';
import ResponseHelper from '@/utils/response.helper';
import errorHandler from '@/utils/error.helper';
import { FindAllDto, findAllSchema } from '@/validationSchema/common/findAll.schema';
import { VehicleTypesService } from './vehicle-types.service';
import {
  CreateVehicleTypedDto,
  createVehicleTypeSchema,
  UpdateVehicleTypeDto,
  updateVehicleTypeSchema,
} from '@/validationSchema/parts/vehicleTypes';

@ApiTags('Vehicle Types')
@Controller('parts/vehicle-types')
export class VehicleTypesController {
  private readonly res = new ResponseHelper();
  constructor(private readonly vehicleTypesService: VehicleTypesService) {}

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query(new ZodPipe(findAllSchema)) payload: FindAllDto) {
    try {
      const response: any = await this.vehicleTypesService.findAll(payload);
      return this.res.successResponse({
        data: response.data,
        meta: response.meta,
        status: HttpStatus.OK,
        message: 'All vehicle types',
      });
    } catch (error: any) {
      throw errorHandler(error);
    }
  }

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body(new ZodPipe(createVehicleTypeSchema)) payload: CreateVehicleTypedDto) {
    try {
      const response: any = await this.vehicleTypesService.create(payload);
      return this.res.successResponse({
        data: response,
        status: HttpStatus.CREATED,
        message: 'Create new vehicle type successfully!!',
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
    const response: any = await this.vehicleTypesService.findOne({ uuid });
    return this.res.successResponse({
      data: response,
      status: HttpStatus.OK,
      message: 'Vehicle type found',
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
    @Body(new ZodPipe(updateVehicleTypeSchema)) payload: UpdateVehicleTypeDto,
  ) {
    try {
      const response: any = await this.vehicleTypesService.update(uuid, payload);
      return this.res.successResponse({
        data: response,
        status: HttpStatus.ACCEPTED,
        message: 'Update vehicle type successfully',
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
      const response: any = await this.vehicleTypesService.delete({ uuid });
      return this.res.successResponse({
        data: response,
        status: HttpStatus.ACCEPTED,
        message: 'Delete vehicle type successfully',
      });
    } catch (error: any) {
      throw errorHandler(error);
    }
  }
}
