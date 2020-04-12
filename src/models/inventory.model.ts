import { Entity, model, property, hasMany } from '@loopback/repository';
import { OrderInventory, OrderInventoryWithRelations } from './order-inventory.model';

@model()
export class Inventory extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_inventory?: number;

  @property({
    type: 'string',
    required: true,
  })
  nama_barang: string;

  @property({
    type: 'number',
    required: true,
  })
  stok: number;

  @property({
    type: 'string',
    required: true,
  })
  nomor_barang: string;

  @property({
    type: 'string',
    required: true,
  })
  kode_barang: string;

  @property({
    type: 'number',
    required: true,
  })
  jumlah_kedatangan: number;

  @property({
    type: 'string',
    required: true,
  })
  nomor_do: string;

  @property({
    type: 'string',
    required: true,
  })
  nomor_po: string;

  @property({
    type: 'string',
    required: true,
  })
  tipe_barang: string;


  @hasMany(() => OrderInventory)
  orderInventories: OrderInventory[];

  constructor(data?: Partial<Inventory>) {
    super(data);
  }
}

export interface InventoryRelations {
  // describe navigational properties here
  orderInventories?: OrderInventoryWithRelations
}

export type InventoryWithRelations = Inventory & InventoryRelations;
