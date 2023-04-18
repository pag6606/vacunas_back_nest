import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from './employees/employee.module';
import { UserModule } from './users/user.module';
import { VaccineModule } from './vaccines/vaccine.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './interceptors';
import { EmployeeVaccinationModule } from './employee-vaccinations/employee-vaccination.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'vaccination_inventory',
      synchronize: false,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    EmployeeModule,
    UserModule,
    VaccineModule,
    EmployeeVaccinationModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
