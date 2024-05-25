import { Injectable, NotFoundException } from '@nestjs/common';
import { FindAllDto } from '@/validationSchema/common/findAll.schema';
import { InvoicesRepository } from './invoices.repository';
import { CreateInvoicesDto } from '@/validationSchema/parts/invoices';
import { Prisma } from '@prisma/client';
import { PartsRepository } from '../parts/parts.repository';

@Injectable()
export class InvoicesService {
  constructor(
    private readonly invoicesRepository: InvoicesRepository,
    private readonly partsRepository: PartsRepository,
  ) {}

  async findAll(payload: FindAllDto) {
    try {
      return await this.invoicesRepository.findAll({
        where: { softDelete: false },
        orderBy: {
          id: payload.sort,
        },
        page: Number(payload.page) || 1,
        perPage: Number(payload.limit),
        include: {
          partsInvoiceLists: {
            select: {
              qty: true,
              indPrice: true,
              amount: true,
              parts: {
                select: {
                  uuid: true,
                  name: true,
                },
              },
            },
          },
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async findOne(payload: { uuid: string }) {
    try {
      const parts = await this.invoicesRepository.findOne({
        where: { uuid: payload.uuid },
        include: {
          partsInvoiceLists: {
            select: {
              qty: true,
              indPrice: true,
              amount: true,
              parts: {
                select: {
                  uuid: true,
                  name: true,
                },
              },
            },
          },
        },
      });
      if (!parts) {
        throw new NotFoundException('Not found');
      }
      return parts;
    } catch (err) {
      throw err;
    }
  }

  async create(payload: CreateInvoicesDto) {
    try {
      const lastInvoice = await this.invoicesRepository.findLastInvoice();
      const invoiceNumber = lastInvoice
        ? lastInvoice.invoiceNo.replace(/\d+$/, (num) => (parseInt(num) + 1).toString())
        : '#IVSL258963';

      const createInvoiceInput: Prisma.PartsInvoicesCreateInput = {
        invoiceNo: invoiceNumber,
        userName: payload.userName,
        userMobile: payload.userMobile,
        userEmail: payload.userEmail ?? undefined,
        address: payload.address ?? undefined,
        amount: payload.totalAmount,
        remarks: payload.remarks ?? undefined,
      };

      const invoice = await this.invoicesRepository.partsInvoicesCreate(createInvoiceInput);

      await Promise.all(
        payload.parts.map(async (item: any) => {
          try {
            await this.invoicesRepository.partsInvoiceListCreate({
              partsInvoices: { connect: { uuid: invoice.uuid } },
              parts: { connect: { uuid: item.partsUuid } },
              qty: item.quantity,
              indPrice: item.indPrice,
              amount: item.amount,
            });
            await this.partsRepository.update({
              where: { uuid: item.partsUuid },
              args: { qty: { decrement: item.quantity } },
            });
          } catch (error) {
            throw error;
          }
        }),
      );

      return invoice;
    } catch (error) {
      throw error;
    }
  }
}
