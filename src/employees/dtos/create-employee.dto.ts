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

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  @Length(10, 10)
  @Matches(/^[0-9]*$/, { message: 'Cédula debe contener solo números' })
  dni: number;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/, {
    message: 'Nombres solo pueden contener letras y espacios',
  })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/, {
    message: 'Apellidos solo pueden contener letras y espacios',
  })
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsDateString()
  birthDate: Date;

  @IsOptional()
  @IsString()
  homeAddress: string;

  @IsOptional()
  @IsPhoneNumber(null)
  mobilePhone: string;

  @IsOptional()
  @IsBoolean()
  vaccinationStatus: boolean;

  @IsNotEmpty()
  @IsString()
  role: string;
}
