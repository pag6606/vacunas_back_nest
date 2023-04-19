import {
  IsNumber,
  IsString,
  IsDateString,
  IsBoolean,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class RoleDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;
}

class VaccineDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  doseNumber: number;

  @IsDateString()
  vaccinationDate: Date;

  @IsNumber()
  employeeVaccinationId: number;
}

export class EmployeeDto {
  @IsNumber()
  id: number;

  @IsNumber()
  dni: number;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsDateString()
  birthDate: Date;

  @IsString()
  homeAddress: string;

  @IsString()
  mobilePhone: string;

  @IsString()
  status: string;

  @IsString()
  username: string;

  @IsBoolean()
  vaccinationStatus: boolean;

  @ValidateNested({ each: true })
  @Type(() => VaccineDto)
  vaccines: VaccineDto[];

  @ValidateNested({ each: true })
  @Type(() => RoleDto)
  roles: RoleDto[];
}
