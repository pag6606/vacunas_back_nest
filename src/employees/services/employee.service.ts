import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import {
  EmployeeEntity,
  PersonEntity,
  UserEntity,
  UserRoleEntity,
} from '../../entities';
import { Status } from '../../constants/app.constant';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { PersonService } from '../../people/services';
import { UserService } from '../../users/services';
import { RoleService } from '../../roles/services';
import { UserRoleService } from '../../user-roles/services';
import { CreateEmployee } from '../model/create-employee.interface';
import { validateID } from '../../utils/validateiD';
import { EmployeeException } from '../../errors/employee.error';
import { Employee } from '../model/list-employees.interface';

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
    private _userRoleService: UserRoleService,
    private _personService: PersonService,
    private _userService: UserService,
    private _roleService: RoleService,
  ) {}

  async getEmployees(): Promise<EmployeeEntity[]> {
    const alias = EmployeeEntity.ALIAS;
    return await this._employeeRepository
      .createQueryBuilder(alias)
      .leftJoinAndSelect(`${alias}.user`, 'user', 'user.status =:status', {
        status: Status.Active,
      })
      .leftJoinAndSelect(
        `${alias}.employeeVaccinations`,
        'employeeVaccinations',
        'employeeVaccinations.status =:status',
        {
          status: Status.Active,
        },
      )
      .leftJoinAndSelect(
        `${alias}.person`,
        'person',
        'person.status =:status',
        {
          status: Status.Active,
        },
      )
      .leftJoinAndSelect(
        'user.userRoles',
        'userRoles',
        'userRoles.status =:status',
        {
          status: Status.Active,
        },
      )
      .leftJoinAndSelect('userRoles.role', 'role', 'role.status =:status', {
        status: Status.Active,
      })
      .where(`${alias}.status =:status`, { status: Status.Active })
      .getMany();
  }

  async mapEmployees(employees: EmployeeEntity[]): Promise<Employee[]> {
    return employees.map((employee) => {
      return {
        id: employee.id,
        dni: employee.person.dni,
        firstName: employee.person?.firstName,
        lastName: employee.person?.lastName,
        birthDate: employee.birthDate,
        homeAddress: employee.homeAddress,
        mobilePhone: employee.mobilePhone,
        status: employee.status === Status.Active ? 'Active' : 'Inactive',
        username: employee.user?.username,
        password: employee.user?.password,
        vaccine: employee.vaccinationStatus,
        vaccinationStatus:
          employee.user?.userRoles?.length > 0
            ? employee.user?.userRoles.map((userRole) => {
                return { id: userRole.role?.id, name: userRole.role?.name };
              })
            : null,
        vaccines:
          employee.employeeVaccinations?.length > 0
            ? employee.employeeVaccinations?.map((employeeVaccination) => {
                return {
                  id: employeeVaccination.vaccine?.id,
                  name: employeeVaccination.vaccine?.vaccineType,
                  doseNumber: employeeVaccination.doseNumber,
                };
              })
            : null,
      };
    });
  }

  async listEmployees(): Promise<Employee[]> {
    const employees = await this.getEmployees();
    return await this.mapEmployees(employees);
  }

  async getEmployee(email: string): Promise<EmployeeEntity> {
    const alias = EmployeeEntity.ALIAS;
    return await this._employeeRepository
      .createQueryBuilder(alias)
      .where(`${alias}.status =:status`, { status: Status.Active })
      .andWhere(`${alias}.email =:email`, { email })
      .getOne();
  }

  async mapCreateEmployee(
    employee: EmployeeEntity,
    userrole: UserRoleEntity,
  ): Promise<CreateEmployee> {
    return {
      id: employee.id,
      dni: employee.person.dni,
      firstName: employee.person?.firstName,
      lastName: employee.person?.lastName,
      birthDate: employee.birthDate,
      homeAddress: employee.homeAddress,
      mobilePhone: employee.mobilePhone,
      status: employee.status === Status.Active ? 'Active' : 'Inactive',
      username: userrole.user?.username,
      password: userrole.user?.password,
      role: userrole.role?.name,
    };
  }

  async createEmploye(
    createEmployee: CreateEmployeeDto,
  ): Promise<CreateEmployee> {
    const existPerson = await this._personService.getPerson(createEmployee.dni);
    const existEmailEmploye = await this.getEmployee(createEmployee.email);
    const isValidDni = validateID(String(createEmployee.dni));
    const role = await this._roleService.getRole(createEmployee.role);
    const currentDay = new Date();

    if (existPerson)
      throw new EmployeeException('dni-exist', HttpStatus.BAD_REQUEST);

    if (existEmailEmploye)
      throw new EmployeeException('email-exist', HttpStatus.BAD_REQUEST);

    if (!isValidDni)
      throw new EmployeeException('invalid-dni', HttpStatus.BAD_REQUEST);

    const person = new PersonEntity();
    person.dni = createEmployee.dni;
    person.firstName = createEmployee.firstName;
    person.lastName = createEmployee.lastName;
    person.createdDate = currentDay;

    const savedPerson = await this._personService.createPerson(person);

    const employee = new EmployeeEntity();
    employee.email = createEmployee.email;
    employee.birthDate = createEmployee.birthDate;
    employee.homeAddress = createEmployee.homeAddress;
    employee.mobilePhone = createEmployee.mobilePhone;
    employee.vaccinationStatus = createEmployee.vaccinationStatus;
    employee.createdDate = currentDay;
    employee.person = savedPerson;

    const savedEmployee = await this._employeeRepository.save(employee);

    const user = new UserEntity();
    user.username = createEmployee.email;
    user.password = String(createEmployee.dni);
    user.createdDate = currentDay;
    user.employee = savedEmployee;

    const savedUser = await this._userService.createUser(user);

    const userRole = new UserRoleEntity();
    userRole.user = savedUser;
    userRole.role = role;
    userRole.createdDate = currentDay;

    const savedUserRole = await this._userRoleService.createUserRole(userRole);

    return await this.mapCreateEmployee(savedEmployee, savedUserRole);
  }
}
