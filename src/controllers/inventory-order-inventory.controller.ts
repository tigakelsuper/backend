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
  Inventory,
  OrderInventory,
} from '../models';
import {InventoryRepository} from '../repositories';

export class InventoryOrderInventoryController {
  constructor(
    @repository(InventoryRepository) protected inventoryRepository: InventoryRepository,
  ) { }

  @get('/inventories/{id}/order-inventories', {
    responses: {
      '200': {
        description: 'Array of Inventory has many OrderInventory',
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
    return this.inventoryRepository.orderInventories(id).find(filter);
  }

  @post('/inventories/{id}/order-inventories', {
    responses: {
      '200': {
        description: 'Inventory model instance',
        content: {'application/json': {schema: getModelSchemaRef(OrderInventory)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Inventory.prototype.id_inventory,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderInventory, {
            title: 'NewOrderInventoryInInventory',
            exclude: ['id_order'],
            optional: ['inventoryId']
          }),
        },
      },
    }) orderInventory: Omit<OrderInventory, 'id_order'>,
  ): Promise<OrderInventory> {
    return this.inventoryRepository.orderInventories(id).create(orderInventory);
  }

  @patch('/inventories/{id}/order-inventories', {
    responses: {
      '200': {
        description: 'Inventory.OrderInventory PATCH success count',
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
    return this.inventoryRepository.orderInventories(id).patch(orderInventory, where);
  }

  @del('/inventories/{id}/order-inventories', {
    responses: {
      '200': {
        description: 'Inventory.OrderInventory DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(OrderInventory)) where?: Where<OrderInventory>,
  ): Promise<Count> {
    return this.inventoryRepository.orderInventories(id).delete(where);
  }
}
