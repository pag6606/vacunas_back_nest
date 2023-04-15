import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmployeeService } from './services';
import {
  EmployeeEntity,
  EmployeeVaccinationEntity,
  PersonEntity,
  UserEntity,
  VaccineEntity,
} from './entities';
import { EmployeeController } from './controllers';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EmployeeEntity,
      EmployeeVaccinationEntity,
      PersonEntity,
      UserEntity,
      VaccineEntity,
    ]),
  ],
  providers: [EmployeeService],
  exports: [EmployeeService],
  controllers: [EmployeeController],
})
export class VaccinationRegistryModule {}
