import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('amdprod_catalog.ab360pt_offer')
export class OfferEntity {
  static ALIAS = 'offer';

  @PrimaryGeneratedColumn({ name: 'offer_id' })
  offerId: string;

  @Column({ name: 'market_product_id_ab360pt_offer' })
  marketProductId: string;

  @Column({ name: 'bill_method' })
  billMethod: string;

  @Column({ name: 'lob' })
  lob: string;

  @Column({ name: 'sku' })
  sku: string;

  @Column({ name: 'effective_date' })
  effectiveDate: Date;

  @Column({ name: 'regular_price' })
  regularPrice: number;

  @Column({ name: 'technology' })
  technology: string;

  @Column({ name: 'family' })
  family: string;

  @Column({ name: 'pcat_id' })
  pcatId: string;

  @Column({ name: 'expiration_date' })
  expirationDate: Date;

  @Column({ name: 'upload' })
  upload: string;

  @Column({ name: 'download' })
  download: string;

  @Column({ name: 'plan_selection_type' })
  planSelectionType: string;

  @Column({ name: 'primary_offer_id' })
  primaryOfferId: string;

  @Column({ name: 'bundle_id' })
  bundleId: string;

  @Column({ name: 'display_value' })
  displayValue: string;

  @Column({ name: 'short_desc' })
  shortDescription: string;

  @Column({ name: 'upload_unit' })
  uploadUnit: string;

  @Column({ name: 'dowload_unit' })
  downloadUnit: string;

  @Column({ name: 'offer_type' })
  offerType: string;

  @Column({ name: 'duration' })
  duration: string;

  @Column({ name: 'duration_unit' })
  durationUnit: string;

  @Column({ name: 'max_sub_num' })
  maxSubscription: number;

  @Column({ name: 'currency_id' })
  currencyId: string;

  @Column({ name: 'special_characteristics' })
  specialCharacteristicId: string;

  @Column({ name: 'url' })
  url: string;

  @Column({ name: 'plan_offer_level' })
  planOfferLevel: string;

  @Column({ name: 'display_price', type: 'numeric' })
  displayPrice: number;

  @Column({ name: 'status' })
  status: string;

  @Column({ name: 'visible' })
  visible: string;
}
