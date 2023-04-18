import { Controller, Get } from '@nestjs/common';
import { VaccineService } from '../services';
import { VaccineEntity } from '../../entities';

@Controller('/vaccines')
export class VaccineController {
  constructor(private readonly _vaccineService: VaccineService) {}

  @Get()
  async getVaccines(): Promise<VaccineEntity[]> {
    return await this._vaccineService.getVaccines();
  }
}
