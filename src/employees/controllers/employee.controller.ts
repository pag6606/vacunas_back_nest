import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
import { EmployeeEntity } from '../../entities';
import { CreateEmployeeDto } from '../dto/create-employee.dto';

@Controller('/employees')
export class EmployeeController {
  constructor(private readonly _employeeService: EmployeeService) {}

  @Get()
  async getEmployees(): Promise<EmployeeEntity[]> {
    return await this._employeeService.getEmployees();
  }

  @Post('/create')
  async CreateEmploye(
    @Body() createEmployee: CreateEmployeeDto,
  ): Promise<EmployeeEntity> {
    return await this._employeeService.createEmploye(createEmployee);
  }
}
