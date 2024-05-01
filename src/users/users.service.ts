import { Injectable } from '@nestjs/common';
import { UserProfileDto } from '../validationSchema/users';
import { UserRepository } from './users.repository';
import { UUID } from 'crypto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  findAll() {
    return `This action returns all users`;
  }

  async findOne(payload: any) {
    return await this.userRepository.findOne({
      uuid: payload.uuid,
    });
  }

  async update(uuid: UUID, userProfile: UserProfileDto) {
    try {
      const { firstName, lastName, address, gender, dob } = userProfile;

      let data: any = {};
      if (firstName) data.first_name = firstName;
      if (lastName) data.last_name = lastName;
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
      return profileUpdate;
    } catch (err) {
      throw err;
    }
  }
}
