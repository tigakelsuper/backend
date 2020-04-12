import { Entity, model, property, belongsTo } from '@loopback/repository';
import { User, UserWithRelations } from './user.model';
import { Mobil, MobilWithRelations } from './mobil.model';
import { Supir, SupirWithRelations } from './supir.model';

@model()
export class PemesananMobil extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  tanggal_pemesanan: string;

  @property({
    type: 'string',
    required: true,
  })
  tipe_pemesanan: string;

  @property({
    type: 'string',
    required: true,
  })
  keterangan: string;

  @property({
    type: 'string',
    required: true,
    default: 'submitted',
  })
  status_pemesanan: string;


  @belongsTo(() => User)
  userId: number;

  @belongsTo(() => Mobil)
  mobilId: string;

  @belongsTo(() => Supir)
  supirId: number;

  constructor(data?: Partial<PemesananMobil>) {
    super(data);
  }
}

export interface PemesananMobilRelations {
  // describe navigational properties here
  userId?: UserWithRelations,
  mobilId?: MobilWithRelations,
  supirId?: SupirWithRelations
}

export type PemesananMobilWithRelations = PemesananMobil & PemesananMobilRelations;
