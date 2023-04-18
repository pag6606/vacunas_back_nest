import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { EmployeeVaccinationEntity } from '../../entities';
import { Status } from '../../constants/app.constant';
import { EmployeeService } from '../../employees/services';
import { VaccineService } from '../../vaccines/services';
import {
  CreateEmployeeVaccinationDto,
  UpdateEmployeeVaccinationDto,
} from '../dtos';
import { EmployeeVaccination } from '../models';

/**
 * Service to Employee Vaccination
 * @author csolorzano
 * @version 1.0.0
 */

@Injectable()
export class EmployeeVaccinationService {
  constructor(
    @InjectRepository(EmployeeVaccinationEntity)
    private _employeeVaccinationRepository: Repository<EmployeeVaccinationEntity>,
    private _employeeService: EmployeeService,
    private _vaccineService: VaccineService,
  ) {}

  async getEmployeeVaccination(
    employeeId: number,
    vaccineId: number,
  ): Promise<EmployeeVaccinationEntity> {
    const alias = EmployeeVaccinationEntity.ALIAS;

    return await this._employeeVaccinationRepository
      .createQueryBuilder(alias)
      .leftJoinAndSelect(`${alias}.vaccine`, 'vaccine')
      .leftJoinAndSelect(`${alias}.employee`, 'employee')
      .where(`${alias}.status = :status`, { status: Status.Active })
      .andWhere('vaccine.id = :vaccineId', { vaccineId })
      .andWhere('employee.id = :vaccineId', { employeeId })
      .getOne();
  }

  async createEmployeeVaccination(
    createEmployeeVaccination: CreateEmployeeVaccinationDto,
  ): Promise<EmployeeVaccination> {
    const { employeeId, vaccineId } = createEmployeeVaccination;
    const employee = await this._employeeService.getEmployee(
      null,
      null,
      employeeId,
    );
    const vaccine = await this._vaccineService.getVaccine(vaccineId);

    const employeeVaccination = new EmployeeVaccinationEntity();
    employeeVaccination.vaccine = vaccine;
    employeeVaccination.employee = employee;
    employeeVaccination.doseNumber = createEmployeeVaccination.doseNumber;
    employeeVaccination.vaccinationDate =
      createEmployeeVaccination.vaccinationDate;

    const savedEmployeeVaccination =
      await this._employeeVaccinationRepository.save(employeeVaccination);

    return {
      id: savedEmployeeVaccination.id,
      employeeId: employee.id,
      personId: employee.person.id,
      vaccine: vaccine.vaccineType,
      doseNumber: savedEmployeeVaccination.doseNumber,
      vaccinationDate: savedEmployeeVaccination.vaccinationDate,
      completeName: employee.person.firstName + ' ' + employee.person.lastName,
    };
  }

  async updateEmployeeVaccination(
    employeeVaccinationId: number,
    updateEmployeeVaccination: UpdateEmployeeVaccinationDto,
  ) {
    const { vaccineId } = updateEmployeeVaccination;
    const vaccine = await this._vaccineService.getVaccine(vaccineId);

    const employeeVaccination = new EmployeeVaccinationEntity();
    vaccine ? (employeeVaccination.vaccine = vaccine) : null;
    employeeVaccination.doseNumber = updateEmployeeVaccination.doseNumber;
    employeeVaccination.vaccinationDate =
      updateEmployeeVaccination.vaccinationDate;

    await this._employeeVaccinationRepository.update(
      employeeVaccinationId,
      employeeVaccination,
    );

    return {
      message: 'The employee has been updated successfully',
      employeeVaccination: updateEmployeeVaccination,
    };
  }
}
