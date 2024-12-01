import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { FindAllDto } from '@/validationSchema/common/findAll.schema';
import { CategoryRepository } from './category.repository';
import {
  CreateCategoryDto,
  CreateCategoryOptionDto,
  CreateCategoryOptionEntityDto,
  UpdateCategoryDto,
  UpdateCategoryOptionDto,
} from '@/validationSchema/parts/category';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async findOne(payload: any) {
    const response = await this.categoryRepository.findOne({
      where: { uuid: payload.uuid },
      include: {
        partsCategoryOptions: {
          include: {
            partsCategoryOptionsEntity: true,
          },
        },
        parts: true,
      },
    });
    if (!response) {
      throw new NotFoundException('Category not found!!');
    }
    return response;
  }

  async findAll(payload: FindAllDto) {
    try {
      return await this.categoryRepository.findAll({
        where: {
          softDelete: false,
        },
        orderBy: {
          id: payload.sort,
        },
        page: Number(payload.page),
        perPage: Number(payload.limit),
        include: {
          partsCategoryOptions: {
            include: {
              partsCategoryOptionsEntity: true,
            },
          },
          parts: true,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async create(payload: CreateCategoryDto) {
    try {
      const createData = {
        name: payload.name,
        image: payload.image,
      };
      return await this.categoryRepository.create(createData);
    } catch (err) {
      throw err;
    }
  }

  async update(categoryUuid: string, payload: UpdateCategoryDto) {
    try {
      const dataToUpdate = {
        name: payload.name,
        image: payload.image,
      };
      return await this.categoryRepository.update({
        where: { uuid: categoryUuid },
        data: dataToUpdate,
      });
    } catch (err) {
      throw err;
    }
  }

  async delete(payload: any) {
    try {
      const category = await this.categoryRepository.findOne({
        where: { uuid: payload.uuid },
        include: {
          partsCategoryOptions: true,
          parts: true,
        },
      });
      if (!category) throw new NotFoundException('Not found!!');
      if (category.partsCategoryOptions.length > 0 || category.parts.length > 0)
        throw new NotAcceptableException('Cannot delete this category!!');
      await this.categoryRepository.delete(payload.uuid);
    } catch (err) {
      throw err;
    }
  }

  async createOption(payload: CreateCategoryOptionDto) {
    try {
      const createData = {
        name: payload.name,
        partsCategoryUuid: payload.categoryUuid,
      };
      return await this.categoryRepository.createOption(createData);
    } catch (err) {
      throw err;
    }
  }

  async findOneOption(payload: any) {
    const response = await this.categoryRepository.findOneOption({
      where: { uuid: payload.uuid },
      include: {
        partsCategoryOptionsEntity: true,
      },
    });
    if (!response) {
      throw new NotFoundException('Category option not found!!');
    }
    return response;
  }

  async updateOption(optionUuid: string, updateData: UpdateCategoryOptionDto) {
    try {
      return await this.categoryRepository.updateOption({
        where: { uuid: optionUuid },
        data: { name: updateData.name },
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteOption(payload: any) {
    try {
      const option = await this.categoryRepository.findOneOption({
        where: { uuid: payload.uuid },
        include: {
          partsCategoryOptionsEntity: true,
        },
      });
      if (!option) throw new NotFoundException('Not found!!');
      if (option.partsCategoryOptionsEntity.length > 0) throw new NotAcceptableException('Cannot delete this option!!');
      await this.categoryRepository.deleteOption(payload.uuid);
    } catch (err) {
      throw err;
    }
  }

  async createOptionEntity(payload: CreateCategoryOptionEntityDto) {
    try {
      const createData = {
        name: payload.name,
        partsCategoryOptionsUuid: payload.categoryOptionUuid,
      };
      return await this.categoryRepository.createOptionEntity(createData);
    } catch (err) {
      throw err;
    }
  }

  async findOneOptionEntity(payload: any) {
    const response = await this.categoryRepository.findOneOptionEntity({
      where: { uuid: payload.uuid },
      include: {
        parts: true,
      },
    });
    if (!response) {
      throw new NotFoundException('Category option entity not found!!');
    }
    return response;
  }

  async updateOptionEntity(optionEntityUuid: string, updateData: UpdateCategoryOptionDto) {
    try {
      return await this.categoryRepository.updateOptionEntity({
        where: { uuid: optionEntityUuid },
        data: { name: updateData.name },
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteOptionEntity(payload: any) {
    try {
      const optionEntity = await this.categoryRepository.findOneOptionEntity({
        where: { uuid: payload.uuid },
        include: {
          parts: true,
        },
      });
      if (!optionEntity) throw new NotFoundException('Not found!!');
      if (optionEntity.parts.length > 0) throw new NotAcceptableException('Cannot delete this option entities!!');
      await this.categoryRepository.deleteOptionEntity(payload.uuid);
    } catch (err) {
      throw err;
    }
  }
}
