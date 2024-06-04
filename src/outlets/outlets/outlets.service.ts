import { Injectable } from '@nestjs/common';
import { OutletRepository } from './outlet.repository';

@Injectable()
export class OutletService {
  constructor(private readonly outletRepository: OutletRepository) {}
}
