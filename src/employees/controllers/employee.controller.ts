import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Patch,
  HttpCode,
} from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
import {
  CreateEmployeeDto,
  FilterEmployeeDto,
  UpdateEmployeeDto,
} from '../dtos';
import { CreateEmployee } from '../models/create-employee.interface';
import { Type } from '../../constants/app.constant';
import { EmployeeDto } from '../dtos/employee.dto';

@Controller('/employees')
export class EmployeeController {
  constructor(private readonly _employeeService: EmployeeService) {}

  @Get()
  async getEmployees(): Promise<EmployeeDto[]> {
    return await this._employeeService.listEmployees();
  }

  @Get('/myInformation')
  async myInformation(@Query('dni') dni: number): Promise<EmployeeDto> {
    return await this._employeeService.myInformation(dni);
  }

  @Post('/create')
  async CreateEmploye(
    @Body() createEmployee: CreateEmployeeDto,
  ): Promise<CreateEmployee> {
    return await this._employeeService.createEmploye(createEmployee);
  }

  @Post('/filter')
  @HttpCode(200)
  async filterEmployees(
    @Body() filterEmployee: FilterEmployeeDto,
  ): Promise<{ message: string; data: EmployeeDto[] }> {
    const employees = await this._employeeService.listEmployees(filterEmployee);
    const response = { message: 'Success', data: employees };
    return response;
  }

  @Patch('/delete')
  async deleteEmployee(@Query('dni') dni: number, @Query('role') role: string) {
    return await this._employeeService.updateEmployee(dni, role, Type.DELETE);
  }

  @Patch('/update')
  async updateEmployee(
    @Query('dni') dni: number,
    @Body() updateEmployee: UpdateEmployeeDto,
  ) {
    return await this._employeeService.updateEmployee(
      dni,
      null,
      Type.UPDATE,
      updateEmployee,
    );
  }
}
