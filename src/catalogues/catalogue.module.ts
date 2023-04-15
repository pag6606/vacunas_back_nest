import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OfferService } from './services/offer.service';
import { OfferEntity } from './entities/offer.entity';
import { OfferController } from './controllers/offer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OfferEntity])],
  providers: [OfferService],
  exports: [OfferService],
  controllers: [OfferController],
})
export class CatalogueModule {}
