import { Entity, model, property, hasMany } from '@loopback/repository';
import { PemesananMobil, PemesananMobilWithRelations } from './pemesanan-mobil.model';

@model()
export class Supir extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nama: string;

  @property({
    type: 'string',
    required: true,
  })
  nomor_handphone: string;

  @property({
    type: 'string',
    required: true,
    default: 'tersedia',
  })
  status_tersedia: string;

  @hasMany(() => PemesananMobil)
  pemesananMobils: PemesananMobil[];

  constructor(data?: Partial<Supir>) {
    super(data);
  }
}

export interface SupirRelations {
  pemesananMobils?: PemesananMobilWithRelations
  // describe navigational properties here
}

export type SupirWithRelations = Supir & SupirRelations;
