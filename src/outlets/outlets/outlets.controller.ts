import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import ResponseHelper from '@/utils/response.helper';
import { OutletService } from './outlets.service';

@ApiTags('Outlets')
@Controller('outlets')
export class OutletController {
  private readonly res = new ResponseHelper();
  constructor(private readonly outletService: OutletService) {}
}
