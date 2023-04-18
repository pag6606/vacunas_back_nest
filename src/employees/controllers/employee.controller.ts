import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
import { EmployeeEntity } from '../../entities';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { CreateEmployee } from '../model/create-employee.interface';
import { Employee } from '../model/list-employees.interface';

@Controller('/employees')
export class EmployeeController {
  constructor(private readonly _employeeService: EmployeeService) {}

  @Get()
  async getEmployees(): Promise<Employee[]> {
    return await this._employeeService.listEmployees();
  }

  @Post('/create')
  async CreateEmploye(
    @Body() createEmployee: CreateEmployeeDto,
  ): Promise<CreateEmployee> {
    return await this._employeeService.createEmploye(createEmployee);
  }
}
