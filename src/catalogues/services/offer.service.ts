import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { OfferEntity } from '../entities/offer.entity';

/**
 * Service to Offer
 * @author csolorzano
 * @version 1.0.0
 */

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(OfferEntity)
    private _offerRepository: Repository<OfferEntity>,
  ) {}

  async getOffers() {
    const alias = OfferEntity.ALIAS;
    return await this._offerRepository.createQueryBuilder(alias).getMany();
  }
}
