import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogueModule } from './catalogues/catalogue.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'db_test',
      synchronize: false,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    CatalogueModule,
  ],
})
export class AppModule {}
