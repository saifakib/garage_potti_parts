import { Injectable } from '@nestjs/common';
import { UserProileDto } from './dto/userProfile-dto';
import { UserRepository } from './users.repository';
import { UUID } from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(uuid: UUID, userProfile: UserProileDto) {
    try {
      const { firstName, lastName, address, gender, dob } = userProfile;
      
      let data: any = {}
      if(firstName) data.first_name = firstName;
      if(lastName) data.last_name = lastName;
      if(address) data.address = address;
      if(gender) data.gender = gender;
      if(dob) data.dob = dob;

      const profileUpdate = await this.userRepository.update(uuid, data);
      return profileUpdate;
    } catch(err) {
      throw err;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
