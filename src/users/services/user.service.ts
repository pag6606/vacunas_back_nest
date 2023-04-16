import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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

  async createUserFromProfile(profile: any): Promise<UserEntity> {
    const newUser = new UserEntity();
    newUser.username = profile.emails[0].value;
    newUser.role = profile.displayName;

    // Establezca otros valores de usuario según su lógica, como roles y contraseñas predeterminadas, si corresponde

    const savedUser = await this._userRepository.save(newUser);
    return savedUser;
  }
}
