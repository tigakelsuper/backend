import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Inventory, InventoryWithRelations } from './inventory.model';
import { User, UserWithRelations } from './user.model';

@model()
export class OrderInventory extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_order?: number;

  @property({
    type: 'string',
    required: true,
  })
  nomor_order: string;

  @property({
    type: 'number',
    required: true,
  })
  jumlah: number;

  @property({
    type: 'date',
  })
  waktu_ambil?: string;

  @property({
    type: 'string',
    required: true,
  })
  status_order: string;

  @property({
    type: 'string',
  })
  catatan_persetujuan?: string;

  @belongsTo(() => Inventory)
  inventoryId: number;

  @belongsTo(() => User)
  userId: number;

  constructor(data?: Partial<OrderInventory>) {
    super(data);
  }
}

export interface OrderInventoryRelations {
  // describe navigational properties here
  inventoryId?: InventoryWithRelations,
  userId?: UserWithRelations
}

export type OrderInventoryWithRelations = OrderInventory & OrderInventoryRelations;
