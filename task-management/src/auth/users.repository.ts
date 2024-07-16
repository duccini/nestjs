import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
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

    await this.save(user);
  }
}
