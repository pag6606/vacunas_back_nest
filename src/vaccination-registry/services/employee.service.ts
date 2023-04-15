import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { EmployeeEntity } from '../entities';

/**
 * Service to Offer
 * @author csolorzano
 * @version 1.0.0
 */

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private _employeeRepository: Repository<EmployeeEntity>,
  ) {}

  async getEmployees() {
    const alias = EmployeeEntity.ALIAS;
    return await this._employeeRepository.createQueryBuilder(alias).getMany();
  }
}
