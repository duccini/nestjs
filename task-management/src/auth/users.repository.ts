import { DataSource, Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  // UnauthorizedException,
} from '@nestjs/common';
import { AuthDTO } from './dto/auth.dto';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authDTO: AuthDTO): Promise<void> {
    const { username, password } = authDTO;

    // Hash
    const salt = await bcrypt.genSalt();

    // Bcrypt stores the salt in the password
    const hashPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      username,
      password: hashPassword,
    });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        // Postgre Duplicate username
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async loginUser(username: string): Promise<User> {
    const user = await this.findOne({
      where: {
        username,
      },
    });

    return user;
  }
}
