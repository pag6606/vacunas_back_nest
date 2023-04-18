import { IsOptional, IsString } from 'class-validator';
import { CreateEmployeeDto } from './create-employee.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  username: string;
}
