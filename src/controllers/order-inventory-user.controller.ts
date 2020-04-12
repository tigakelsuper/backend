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
  User,
} from '../models';
import {OrderInventoryRepository} from '../repositories';

export class OrderInventoryUserController {
  constructor(
    @repository(OrderInventoryRepository)
    public orderInventoryRepository: OrderInventoryRepository,
  ) { }

  @get('/order-inventories/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to OrderInventory',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof OrderInventory.prototype.id_order,
  ): Promise<User> {
    return this.orderInventoryRepository.user(id);
  }
}
