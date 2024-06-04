import { DatabaseService } from '@/database/database.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OutletRepository {
  constructor(private readonly database: DatabaseService) {}
}
