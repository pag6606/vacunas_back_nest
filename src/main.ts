import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('vaccinationinventory/api/v1');
  await app.listen(3000);
  logger.log('Run in port 3000');
}
bootstrap();
