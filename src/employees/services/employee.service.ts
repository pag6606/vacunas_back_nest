import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { EmployeeEntity, PersonEntity } from '../../entities';
import { Status } from '../../constants/app.constant';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { PersonService } from '../../persons/services';

/**
 * Service to Employee
 * @author csolorzano
 * @version 1.0.0
 */

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private _employeeRepository: Repository<EmployeeEntity>,
    private _personService: PersonService,
  ) {}

  async getEmployees(): Promise<EmployeeEntity[]> {
    const alias = EmployeeEntity.ALIAS;
    return await this._employeeRepository
      .createQueryBuilder(alias)
      .where(`${alias}.status =:status`, { status: Status.Active })
      .getMany();
  }

  async createEmploye(
    createEmployee: CreateEmployeeDto,
  ): Promise<EmployeeEntity> {
    const person = new PersonEntity();
    person.dni = createEmployee.dni;
    person.firstName = createEmployee.firstName;
    person.lastName = createEmployee.lastName;
    person.createdDate = new Date();

    const savedPerson = await this._personService.createPerson(person);

    const employee = new EmployeeEntity();
    employee.email = createEmployee.email;
    employee.birthDate = createEmployee.birthDate;
    employee.homeAddress = createEmployee.homeAddress;
    employee.mobilePhone = createEmployee.mobilePhone;
    employee.vaccinationStatus = createEmployee.vaccinationStatus;
    employee.createdDate = new Date();
    employee.person = savedPerson;

    const savedEmployee = await this._employeeRepository.save(employee);

    //create user o not ?
    return savedEmployee;
  }
}
