import { Controller, Get, UseGuards, HttpStatus, Param, Body, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/guard/auth.guard';
import { ZodPipe } from '@/zod-validation/zod-validation.pipe';
import { uuidSchema } from '@/validationSchema/common/uuid.schema';
import { UUID } from 'crypto';
import ResponseHelper from '@/utils/response.helper';
import errorHandler from '@/utils/error.helper';
import { FindAllDto, findAllSchema } from '@/validationSchema/common/findAll.schema';
import { CreateEngineDto, createEngineSchema } from '@/validationSchema/parts/Engines';
import { EnginesService } from './engines.service';

@ApiTags('Engines')
@Controller('engines')
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
}
