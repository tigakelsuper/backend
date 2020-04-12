import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  OrderInventory,
  Inventory,
} from '../models';
import {OrderInventoryRepository} from '../repositories';

export class OrderInventoryInventoryController {
  constructor(
    @repository(OrderInventoryRepository)
    public orderInventoryRepository: OrderInventoryRepository,
  ) { }

  @get('/order-inventories/{id}/inventory', {
    responses: {
      '200': {
        description: 'Inventory belonging to OrderInventory',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Inventory)},
          },
        },
      },
    },
  })
  async getInventory(
    @param.path.number('id') id: typeof OrderInventory.prototype.id_order,
  ): Promise<Inventory> {
    return this.orderInventoryRepository.inventory(id);
  }
}
