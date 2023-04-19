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
} from 'class-validator';

export class FilterEmployeeDto {
  @IsOptional()
  @IsString()
  dni: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  completeName: string;

  @IsOptional()
  @IsString()
  vaccine: string;

  @IsOptional()
  @IsDateString()
  startDate: string;

  @IsOptional()
  @IsDateString()
  finishDate: string;

  @IsOptional()
  @IsBoolean()
  isVaccinated: boolean;
}
