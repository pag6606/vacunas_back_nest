import { IsNumber, IsString, IsDate } from 'class-validator';

export class EmployeeVaccinationDto {
  @IsNumber()
  id: number;

  @IsNumber()
  employeeId: number;

  @IsNumber()
  personId: number;

  @IsString()
  vaccine: string;

  @IsNumber()
  doseNumber: number;

  @IsDate()
  vaccinationDate: Date;

  @IsString()
  completeName: string;
}
