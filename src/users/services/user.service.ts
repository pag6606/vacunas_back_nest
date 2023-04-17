import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { UserEntity } from '../../entities';
import { Status } from '../../constants';

/**
 * Service to User
 * @author csolorzano
 * @version 1.0.0
 */

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private _userRepository: Repository<UserEntity>,
  ) {}

  async getUser(username: string): Promise<UserEntity> {
    const alias = UserEntity.ALIAS;
    return await this._userRepository
      .createQueryBuilder(alias)
      .where(`${alias}.status = '${Status.Active}'`)
      .andWhere(`${alias}.username = '${username}'`)
      .getOne();
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    const alias = UserEntity.ALIAS;
    return await this._userRepository
      .createQueryBuilder(alias)
      .where(`${alias}.status = '${Status.Active}'`)
      .andWhere(`${alias}.email = '${email}'`)
      .getOne();
  }

  async createUser(user: UserEntity): Promise<UserEntity> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;

    /* async function validatePassword(providedPassword, storedPassword) {
      const isValid = await bcrypt.compare(providedPassword, storedPassword);
      return isValid;
    } */
    return await this._userRepository.save(user);
  }
}
