import { Controller, Get } from '@nestjs/common';
import { RoleService } from '../services';
import { RoleEntity } from '../../entities';

@Controller('/roles')
export class RoleController {
  constructor(private readonly _roleService: RoleService) {}

  @Get()
  async getVaccines(): Promise<RoleEntity[]> {
    return await this._roleService.getRoles();
  }
}
