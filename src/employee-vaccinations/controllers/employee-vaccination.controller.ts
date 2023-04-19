import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { EmployeeVaccinationService } from '../services';
import {
  CreateEmployeeVaccinationDto,
  EmployeeVaccinationDto,
  UpdateEmployeeVaccinationDto,
} from '../dtos';
import { EmployeeVaccination } from '../models';

@Controller('/employeeVaccinations')
export class EmployeeVaccinationController {
  constructor(
    private readonly _employeeVaccinationService: EmployeeVaccinationService,
  ) {}

  @Post('/create')
  async createEmployeeVaccination(
    @Body() employeeVaccination: CreateEmployeeVaccinationDto,
  ): Promise<EmployeeVaccinationDto> {
    return await this._employeeVaccinationService.createEmployeeVaccination(
      employeeVaccination,
    );
  }

  @Post('/update')
  async updateEmployeeVaccination(
    @Query('employeeVaccinationId') employeeVaccinationId: number,
    @Body() employeeVaccination: UpdateEmployeeVaccinationDto,
  ) {
    return await this._employeeVaccinationService.updateEmployeeVaccination(
      employeeVaccinationId,
      employeeVaccination,
    );
  }
}
