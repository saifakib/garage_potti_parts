import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { FindAllDto } from '@/validationSchema/common/findAll.schema';
import { VendorsRepository } from './vendors.repository';
import { CreateVendorDto, UpdateVendorDto } from '@/validationSchema/parts/vendors';

@Injectable()
export class VendorsService {
  constructor(private readonly vendorsRepository: VendorsRepository) {}

  async findOne(payload: any) {
    const response = await this.vendorsRepository.findOne({
      where: { uuid: payload.uuid },
      include: {
        partsEntries: true,
      },
    });
    if (!response) {
      throw new NotFoundException('Vendor not found!!');
    }
    return response;
  }

  async findAll(payload: FindAllDto) {
    try {
      return await this.vendorsRepository.findAll({
        where: { softDelete: false },
        orderBy: {
          id: payload.sort,
        },
        page: Number(payload.page) || 1,
        perPage: Number(payload.limit),
        include: {
          partsEntries: true,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async create(payload: CreateVendorDto) {
    try {
      const createData = {
        name: payload.name,
        address: payload.address,
        mobile: payload.mobile,
        email: payload.email ?? payload.email,
        documents: payload.documents ?? payload.documents,
        description: payload.description ?? payload.description,
      };
      return await this.vendorsRepository.create(createData);
    } catch (err) {
      throw err;
    }
  }

  async update(uuid: string, payload: UpdateVendorDto) {
    try {
      return await this.vendorsRepository.update({
        where: { uuid },
        args: {
          name: payload.name,
          address: payload.address,
          mobile: payload.mobile,
          email: payload.email ?? payload.email,
          documents: payload.documents ?? payload.documents,
          description: payload.description ?? payload.description,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async delete(payload: any) {
    try {
      const brand = await this.vendorsRepository.findOne({
        where: { uuid: payload.uuid },
        include: {
          partsEntries: true,
        },
      });
      if (!brand) throw new NotFoundException('Not found!!');
      if (brand.partsEntries.length > 0) throw new NotAcceptableException('Cannot delete this vendor!!');
      await this.vendorsRepository.delete(payload.uuid);
    } catch (err) {
      throw err;
    }
  }
}
