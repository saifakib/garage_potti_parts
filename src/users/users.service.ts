import { Injectable } from '@nestjs/common';
import { UserProfileDto } from '../validationSchema/users';
import { UserRepository } from './users.repository';
import { UUID } from 'crypto';
import { FindAllDto } from '@/validationSchema/common/findAll.schema';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(payload: FindAllDto) {
    try {
      return await this.userRepository.findAll({
        where: {},
        orderBy: {
          id: payload.sort,
        },
        page: Number(payload.page),
        perPage: Number(payload.limit),
        include: {
          profile: true,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async findOne(payload: any) {
    return await this.userRepository.findOne({
      uuid: payload.uuid,
    });
  }

  async update(uuid: UUID, userProfile: UserProfileDto) {
    try {
      const { firstName, lastName, address, gender, dob } = userProfile;

      const data: any = {};
      if (firstName) data.firstName = firstName;
      if (lastName) data.lastName = lastName;
      if (address) data.address = address;
      if (gender) data.gender = gender;
      if (dob) data.dob = dob;

      const profileUpdate = await this.userRepository.update(uuid, {
        profile: {
          update: {
            ...data,
          },
        },
      });
      delete profileUpdate.password;
      return profileUpdate;
    } catch (err) {
      throw err;
    }
  }
}
