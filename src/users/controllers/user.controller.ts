import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserEntity } from '../../entities';

@Controller('/users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get('/login')
  async loginUser(
    @Query('username') username: string,
    @Query('password') password: string,
  ): Promise<UserEntity> {
    return await this._userService.loginUser(username, password);
  }
}
