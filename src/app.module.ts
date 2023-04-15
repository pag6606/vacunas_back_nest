import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VaccinationRegistryModule } from './vaccination-registry/vaccination-registry.module';

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
    VaccinationRegistryModule,
  ],
})
export class AppModule {}
