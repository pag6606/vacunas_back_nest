import {
  IsNotEmpty,
  IsEmail,
  IsString,
  Length,
  Matches,
  IsOptional,
  IsDate,
  IsPhoneNumber,
  IsBoolean,
  IsDateString,
  IsNumber,
} from 'class-validator';

export class CreateEmployeeVaccinationDto {
  @IsNotEmpty()
  @IsNumber()
  employeeId: number;

  @IsNotEmpty()
  @IsNumber()
  vaccineId: number;

  @IsNotEmpty()
  @IsDateString()
  vaccinationDate: Date;

  @IsNotEmpty()
  @IsNumber()
  doseNumber: number;
}
