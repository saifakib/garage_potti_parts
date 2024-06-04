import { Module } from '@nestjs/common';
import { OutletController } from '@/outlets/outlets/outlets.controller';
import { OutletService } from '@/outlets/outlets/outlets.service';
import { OutletRepository } from '@/outlets/outlets/outlet.repository';

@Module({
  imports: [],
  controllers: [OutletController],
  providers: [OutletService, OutletRepository],
})
export class OutletsModule {}
