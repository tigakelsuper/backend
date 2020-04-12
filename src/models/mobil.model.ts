import { Entity, model, property, hasMany } from '@loopback/repository';
import { PemesananMobil, PemesananMobilWithRelations } from './pemesanan-mobil.model';

@model()
export class Mobil extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  nomor_polisi: string;

  @property({
    type: 'string',
    required: true,
  })
  tipe_mobil: string;

  @property({
    type: 'string',
    required: true,
  })
  merek_mobil: string;

  @property({
    type: 'number',
    required: true,
  })
  jumlah_kursi: number;

  @property({
    type: 'string',
    required: true,
  })
  status_mobil: string;

  @hasMany(() => PemesananMobil)
  pemesananMobils: PemesananMobil[];

  constructor(data?: Partial<Mobil>) {
    super(data);
  }
}

export interface MobilRelations {
  // describe navigational properties here
  pemesananMobils?: PemesananMobilWithRelations
}

export type MobilWithRelations = Mobil & MobilRelations;
