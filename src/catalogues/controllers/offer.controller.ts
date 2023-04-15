import { Controller, Get } from '@nestjs/common';
import { OfferService } from '../services/offer.service';

@Controller('/test')
export class OfferController {
  constructor(private readonly _offerService: OfferService) {}

  @Get()
  async getOffers() {
    return await this._offerService.getOffers();
  }
}
