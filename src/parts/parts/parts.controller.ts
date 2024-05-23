import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { ZodPipe } from '@/zod-validation/zod-validation.pipe';
import ResponseHelper from '@/utils/response.helper';
import errorHandler from '@/utils/error.helper';
import { FindAllDto, findAllSchema } from '@/validationSchema/common/findAll.schema';
import { PartsService } from './parts.service';
import {
  CreatePartsDto,
  createPartsSchema,
  PartsEntriesDto,
  partsEntriesSchema,
  UpdatePartsDto,
  updatePartsSchema,
} from '@/validationSchema/parts/parts';
import { uuidSchema } from '@/validationSchema/common/uuid.schema';
import { UUID } from 'crypto';

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

  @ApiBearerAuth('JWT')
  @Get('/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'uuid format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    type: 'string',
  })
  async findOne(@Param('uuid', new ZodPipe(uuidSchema)) uuid: UUID) {
    const response: any = await this.partsService.findOne({ uuid });
    return this.res.successResponse({
      data: response,
      status: HttpStatus.OK,
      message: 'Parts found',
    });
  }

  @ApiBearerAuth('JWT')
  @Patch('/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'uuid format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    type: 'string',
  })
  async update(
    @Param('uuid', new ZodPipe(uuidSchema)) uuid: UUID,
    @Body(new ZodPipe(updatePartsSchema)) payload: UpdatePartsDto,
  ) {
    try {
      const response: any = await this.partsService.update(uuid, payload);
      return this.res.successResponse({
        data: response,
        status: HttpStatus.ACCEPTED,
        message: 'Update parts successfully',
      });
    } catch (error: any) {
      throw errorHandler(error);
    }
  }

  @ApiBearerAuth('JWT')
  @Delete('/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'uuid format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    type: 'string',
  })
  async delete(@Param('uuid', new ZodPipe(uuidSchema)) uuid: UUID) {
    try {
      const response: any = await this.partsService.delete({ uuid });
      return this.res.successResponse({
        data: response,
        status: HttpStatus.ACCEPTED,
        message: 'Delete parts successfully',
      });
    } catch (error: any) {
      throw errorHandler(error);
    }
  }

  @ApiBearerAuth('JWT')
  @Post('entries')
  async createPartsEntries(@Body(new ZodPipe(partsEntriesSchema)) payload: PartsEntriesDto) {
    try {
      const response: any = await this.partsService.createPartsEntries(payload);
      return this.res.successResponse({
        data: response,
        status: HttpStatus.CREATED,
        message: 'Parts entries successfully',
      });
    } catch (error: any) {
      throw errorHandler(error);
    }
  }

  @ApiBearerAuth('JWT')
  @Get('entries/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'uuid format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    type: 'string',
  })
  async findOnePartsEntries(@Param('uuid', new ZodPipe(uuidSchema)) uuid: UUID) {
    const response: any = await this.partsService.findOnePartsEntries({ uuid });
    return this.res.successResponse({
      data: response,
      status: HttpStatus.OK,
      message: 'Parts Entries found',
    });
  }
}
