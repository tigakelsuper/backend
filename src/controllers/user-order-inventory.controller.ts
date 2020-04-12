import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  User,
  OrderInventory,
} from '../models';
import {UserRepository} from '../repositories';

export class UserOrderInventoryController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/order-inventories', {
    responses: {
      '200': {
        description: 'Array of User has many OrderInventory',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(OrderInventory)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<OrderInventory>,
  ): Promise<OrderInventory[]> {
    return this.userRepository.orderInventories(id).find(filter);
  }

  @post('/users/{id}/order-inventories', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(OrderInventory)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderInventory, {
            title: 'NewOrderInventoryInUser',
            exclude: ['id_order'],
            optional: ['userId']
          }),
        },
      },
    }) orderInventory: Omit<OrderInventory, 'id_order'>,
  ): Promise<OrderInventory> {
    return this.userRepository.orderInventories(id).create(orderInventory);
  }

  @patch('/users/{id}/order-inventories', {
    responses: {
      '200': {
        description: 'User.OrderInventory PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderInventory, {partial: true}),
        },
      },
    })
    orderInventory: Partial<OrderInventory>,
    @param.query.object('where', getWhereSchemaFor(OrderInventory)) where?: Where<OrderInventory>,
  ): Promise<Count> {
    return this.userRepository.orderInventories(id).patch(orderInventory, where);
  }

  @del('/users/{id}/order-inventories', {
    responses: {
      '200': {
        description: 'User.OrderInventory DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(OrderInventory)) where?: Where<OrderInventory>,
  ): Promise<Count> {
    return this.userRepository.orderInventories(id).delete(where);
  }
}
