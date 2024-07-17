import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthDTO } from './dto/auth.dto';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authDTO: AuthDTO): Promise<void> {
    const { username, password } = authDTO;

    const user = this.create({
      username,
      password,
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
}
