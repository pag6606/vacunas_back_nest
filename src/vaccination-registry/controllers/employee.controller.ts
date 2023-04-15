import { Controller, Get } from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';

@Controller('/test')
export class EmployeeController {
  constructor(private readonly _employeeService: EmployeeService) {}

  @Get()
  async getEmployees() {
    return await this._employeeService.getEmployees();
  }
}
