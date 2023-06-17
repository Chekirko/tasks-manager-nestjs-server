import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as argon2 from 'argon2';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    const passwordIsMatch = await argon2.verify(user.password, password);
    if (user && passwordIsMatch) {
      const { password, ...result } = user;
      return result;
    }
    throw new BadRequestException('Email or password are incorrect');
  }

  async login(user: User) {
    return {
      access_token: 'jwt', //TODO: realize it!
      user,
    };
  }
}
