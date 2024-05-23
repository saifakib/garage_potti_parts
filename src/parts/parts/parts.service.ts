import { Injectable, NotFoundException } from '@nestjs/common';
import { FindAllDto } from '@/validationSchema/common/findAll.schema';
import { PartsRepository } from './parts.repository';
import { CreatePartsDto, PartsEntriesDto, UpdatePartsDto } from '@/validationSchema/parts/parts';
import { PARTS_STATUS, Prisma } from '@prisma/client';

@Injectable()
export class PartsService {
  constructor(private readonly partsRepository: PartsRepository) {}

  async findAll(payload: FindAllDto) {
    try {
      return await this.partsRepository.findAll({
        where: { softDelete: false },
        orderBy: {
          id: payload.sort,
        },
        page: Number(payload.page) || 1,
        perPage: Number(payload.limit),
      });
    } catch (err) {
      throw err;
    }
  }

  async create(payload: CreatePartsDto) {
    try {
    } catch (err) {
      throw err;
    }
    const createPartsInput: Prisma.PartsCreateInput = {
      name: payload.name,
      price: payload.price,
      qty: 0,
      status: PARTS_STATUS.INACTIVE,
      alertQty: payload.alertQty,
      category: payload.categoryUuid ? { connect: { uuid: payload.categoryUuid } } : undefined,
      partsCategoryOptionsEntities:
        payload.partsCategoryOptionsEntities.length > 0
          ? { connect: payload.modelUuids.map((uuid) => ({ uuid })) }
          : undefined,
      description: payload.description ?? payload.description,
      brands: { connect: { uuid: payload.brandUuid } },
      models: payload.modelUuids?.length ? { connect: payload.modelUuids.map((uuid) => ({ uuid })) } : undefined,
      engines: payload.engineUuids?.length ? { connect: payload.engineUuids.map((uuid) => ({ uuid })) } : undefined,
      years: payload.yearUuids?.length ? { connect: payload.yearUuids.map((uuid) => ({ uuid })) } : undefined,
      vehicleTypes: payload.vehicleTypeUuids?.length
        ? { connect: payload.vehicleTypeUuids.map((uuid) => ({ uuid })) }
        : undefined,
    };
    // Remove undefined fields
    Object.keys(createPartsInput).forEach((key) => {
      if (createPartsInput[key] === undefined) {
        delete createPartsInput[key];
      }
    });
    return this.partsRepository.create(createPartsInput);
  }

  async findOne(payload: { uuid: string }) {
    try {
      const parts = await this.partsRepository.findOne({
        where: { uuid: payload.uuid },
        include: {
          category: true,
          partsCategoryOptionsEntities: true,
          brands: true,
          models: true,
          engines: true,
          years: true,
          vehicleTypes: true,
        },
      });
      if (!parts) {
        throw new NotFoundException('Parts not found');
      }
      return parts;
    } catch (err) {
      throw err;
    }
  }

  async update(uuid: string, payload: UpdatePartsDto) {
    try {
      const parts = await this.partsRepository.findOne({ where: { uuid } });
      if (!parts) {
        throw new NotFoundException('Parts not found');
      }
      // const updatedParts = {
      //   ...parts,
      //   name: payload.name ?? parts.name,
      //   price: payload.price ?? parts.price,
      //   status: payload.status ?? parts.status,
      //   alertQty: payload.alertQty ?? parts.alertQty,
      //   category: payload.categoryUuid ? { connect: { uuid: payload.categoryUuid } } : parts.category,
      //   partsCategoryOptionsEntities:
      //     payload.partsCategoryOptionsEntities.length > 0
      //       ? { connect: payload.partsCategoryOptionsEntities.map((uuid) => ({ uuid })) }
      //       : parts.partsCategoryOptionsEntities,
      //   description: payload.description ?? parts.description,
      //   brands: payload.brandUuid ? { connect: { uuid: payload.brandUuid } } : parts.brands,
      //   models: payload.modelUuids?.length ? { connect: payload.modelUuids.map((uuid) => ({ uuid })) } : parts.models,
      //   engines: payload.engineUuids?.length ? { connect: payload.engineUuids.map((uuid) => ({ uuid })) } : parts.engines,
      //   years: payload.yearUuids?.length ? { connect: payload.yearUuids.map((uuid) => ({ uuid })) } : parts.years,
      //   vehicleTypes: payload.vehicleTypeUuids?.length
      //     ? { connect: payload.vehicleTypeUuids.map((uuid) => ({ uuid })) }
      //     : parts.vehicleTypes,
      // };
      const updatedParts = {
        name: payload.name ?? parts.name,
        price: payload.price ?? parts.price,
        status: payload.status ?? parts.status,
        alertQty: payload.alertQty ?? parts.alertQty,
        category: payload.categoryUuid ? { connect: { uuid: payload.categoryUuid } } : undefined,
        partsCategoryOptionsEntities: payload.partsCategoryOptionsEntities
          ? payload.partsCategoryOptionsEntities.length > 0
            ? { connect: payload.partsCategoryOptionsEntities.map((uuid) => ({ uuid })) }
            : { disconnect: parts.partsCategoryOptionsEntities.map((entity) => ({ uuid: entity.uuid })) }
          : undefined,
        description: payload.description ?? parts.description,
        brands: payload.brandUuid ? { connect: { uuid: payload.brandUuid } } : undefined,
        models: payload.modelUuids
          ? payload.modelUuids.length
            ? { connect: payload.modelUuids.map((uuid) => ({ uuid })) }
            : { disconnect: parts.models.map((model) => ({ uuid: model.uuid })) }
          : undefined,
        engines: payload.engineUuids
          ? payload.engineUuids.length
            ? { connect: payload.engineUuids.map((uuid) => ({ uuid })) }
            : { disconnect: parts.engines.map((engine) => ({ uuid: engine.uuid })) }
          : undefined,
        years: payload.yearUuids
          ? payload.yearUuids.length
            ? { connect: payload.yearUuids.map((uuid) => ({ uuid })) }
            : { disconnect: parts.years.map((year) => ({ uuid: year.uuid })) }
          : undefined,
        vehicleTypes: payload.vehicleTypeUuids
          ? payload.vehicleTypeUuids.length
            ? { connect: payload.vehicleTypeUuids.map((uuid) => ({ uuid })) }
            : { disconnect: parts.vehicleTypes.map((vehicleType) => ({ uuid: vehicleType.uuid })) }
          : undefined,
      };

      // Remove undefined fields
      Object.keys(updatedParts).forEach((key) => {
        if (updatedParts[key] === undefined) {
          delete updatedParts[key];
        }
      });
      return this.partsRepository.update({ where: { uuid }, args: updatedParts });
    } catch (err) {
      throw err;
    }
  }

  async createPartsEntries(payload: PartsEntriesDto) {
    try {
      const createPartsEntriesInput: Prisma.PartsEntriesCreateInput = {
        vendors: { connect: { uuid: payload.vendorUuid } },
        cashMemoNo: payload.cashMemoNo ?? payload.cashMemoNo,
        amount: payload.totalAmount,
        documents: payload.documents ?? payload.documents,
        description: payload.description ?? payload.description,
      };
      const partsEntries = await this.partsRepository.partsEntriesCreate(createPartsEntriesInput);

      await Promise.all(
        payload.parts.map(async (item: any) => {
          try {
            await this.partsRepository.partsEntryListCreate({
              partsEntries: { connect: { uuid: partsEntries.uuid } },
              parts: { connect: { uuid: item.partsUuid } },
              qty: item.quantity,
              indPrice: item.indPrice,
              amount: item.amount,
            });
            await this.partsRepository.update({
              where: { uuid: item.partsUuid },
              args: { qty: { increment: item.quantity } },
            });
          } catch (error) {
            throw error;
          }
        }),
      );
      return partsEntries;
    } catch (error) {
      throw error;
    }
  }

  async findOnePartsEntries(payload: { uuid: string }) {
    try {
      const parts = await this.partsRepository.findOnePartsEntries({
        where: { uuid: payload.uuid },
        include: {
          partsEntryLists: {
            select: {
              qty: true,
              indPrice: true,
              amount: true,
            },
            include: {
              parts: {
                select: {
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

  async delete(payload: { uuid: string }) {
    const parts = await this.partsRepository.findOne({ where: { uuid: payload.uuid } });
    if (!parts) {
      throw new NotFoundException('Parts not found');
    }
    await this.partsRepository.delete(payload.uuid);
  }
}
