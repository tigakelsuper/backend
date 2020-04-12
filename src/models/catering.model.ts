import { Entity, model, property, belongsTo } from '@loopback/repository';
import { User, UserWithRelations } from './user.model';

@model()
export class Catering extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_catering?: number;

  @property({
    type: 'number',
    required: true,
  })
  jumlah: number;

  @property({
    type: 'date',
    required: true,
  })
  tanggal: string;

  @property({
    type: 'string',
    required: true,
  })
  jenis_catering: string;

  @property({
    type: 'string',
    required: true,
  })
  departemen: string;

  @belongsTo(() => User)
  userId: number;

  constructor(data?: Partial<Catering>) {
    super(data);
  }
}

export interface CateringRelations {
  // describe navigational properties here
  userId?: UserWithRelations
}

export type CateringWithRelations = Catering & CateringRelations;
