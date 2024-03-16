import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/signup-dto';
import { UserRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
    constructor(private readonly userRepository: UserRepository) {}
    async signup(data: SignUpDto) {
        try {
            const isUserExits = await this.userRepository.searchUser({ email: data.email });
            if(isUserExits) {
                throw new HttpException("User allreay exits!!",HttpStatus.BAD_REQUEST)
            }

            // create new user
            const createUser = await this.userRepository.create({ email: data.email, password: data.password  });
            return {
                message: "User signup",
                data: createUser
            }
        } catch (err) {
          throw err;
        }
      }
}
