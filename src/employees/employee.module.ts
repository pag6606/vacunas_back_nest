import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmployeeService } from './services';
import { EmployeeEntity } from '../entities';
import { EmployeeController } from './controllers';
import { PersonModule } from '../people/person.module';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeEntity]), PersonModule],
  providers: [EmployeeService],
  exports: [EmployeeService],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
