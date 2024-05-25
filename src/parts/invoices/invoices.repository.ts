import { DatabaseService } from '@/database/database.service';
import { Injectable } from '@nestjs/common';
import { Prisma, PartsInvoices } from '@prisma/client';
import { PaginatorTypes, paginator } from 'paginator';
const paginate: PaginatorTypes.PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class InvoicesRepository {
  constructor(private readonly database: DatabaseService) {}

  async findAll({
    where,
    orderBy,
    page,
    perPage,
    include,
  }: {
    where?: Prisma.PartsInvoicesWhereInput;
    orderBy?: Prisma.PartsInvoicesOrderByWithRelationInput;
    page?: number;
    perPage?: number;
    include?: Prisma.PartsInvoicesInclude;
  }): Promise<PaginatorTypes.PaginatedResult<PartsInvoices>> {
    try {
      const args = {};
      Object.assign(args, { include });
      return paginate(this.database.partsInvoices, { where, orderBy, ...args }, { page, perPage });
    } catch (error) {
      throw error;
    }
  }

  async findOne({ where, include }: { where?: Prisma.PartsInvoicesWhereInput; include?: Prisma.PartsInvoicesInclude }) {
    try {
      const find = await this.database.partsInvoices.findFirst({
        where: where,
        include: include,
      });
      return find;
    } catch (err) {
      throw err;
    }
  }

  async findLastInvoice() {
    try {
      const findInvoice = await this.database.partsInvoices.findFirst({
        orderBy: { id: 'desc' },
        select: { invoiceNo: true },
      });
      return findInvoice;
    } catch (err) {
      throw err;
    }
  }

  async partsInvoicesCreate(args?: Prisma.PartsInvoicesCreateInput) {
    try {
      return await this.database.partsInvoices.create({
        data: args,
      });
    } catch (err) {
      throw err;
    }
  }

  async partsInvoiceListCreate(args?: Prisma.PartsInvoiceListsCreateInput) {
    try {
      return await this.database.partsInvoiceLists.create({
        data: args,
      });
    } catch (err) {
      throw err;
    }
  }
}
