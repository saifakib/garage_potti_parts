import { Controller, Get, UseGuards, HttpStatus, Param, Body, Post, Query, Delete, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/guard/auth.guard';
import { ZodPipe } from '@/zod-validation/zod-validation.pipe';
import { uuidSchema } from '@/validationSchema/common/uuid.schema';
import { UUID } from 'crypto';
import ResponseHelper from '@/utils/response.helper';
import errorHandler from '@/utils/error.helper';
import { FindAllDto, findAllSchema } from '@/validationSchema/common/findAll.schema';
import {
  CreateEngineDto,
  createEngineSchema,
  UpdateEngineDto,
  updateEngineSchema,
} from '@/validationSchema/parts/engines';
import { EnginesService } from './engines.service';

@ApiTags('Engines')
@Controller('parts/engines')
export class EnginesController {
  private readonly res = new ResponseHelper();
  constructor(private readonly engineService: EnginesService) {}

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query(new ZodPipe(findAllSchema)) payload: FindAllDto) {
    try {
      const response: any = await this.engineService.findAll(payload);
      return this.res.successResponse({
        data: response.data,
        meta: response.meta,
        status: HttpStatus.OK,
        message: 'All Engines',
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
    const response: any = await this.engineService.findOne({ uuid });
    return this.res.successResponse({
      data: response,
      status: HttpStatus.FOUND,
      message: 'Engine found',
    });
  }

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body(new ZodPipe(createEngineSchema)) payload: CreateEngineDto) {
    try {
      const response: any = await this.engineService.create(payload);
      return this.res.successResponse({
        data: response,
        status: HttpStatus.CREATED,
        message: 'Create new Engine successfully',
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
    @Body(new ZodPipe(updateEngineSchema)) payload: UpdateEngineDto,
  ) {
    try {
      const response: any = await this.engineService.update(uuid, payload);
      return this.res.successResponse({
        data: response,
        status: HttpStatus.ACCEPTED,
        message: 'Update engine successfully',
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
  async delete(
    @Param('uuid', new ZodPipe(uuidSchema))
    uuid: UUID,
  ) {
    try {
      const response: any = await this.engineService.delete({ uuid });
      return this.res.successResponse({
        data: response,
        status: HttpStatus.ACCEPTED,
        message: 'Delete engine successfully',
      });
    } catch (error: any) {
      throw errorHandler(error);
    }
  }
}
