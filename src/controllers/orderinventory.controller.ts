import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {OrderInventory} from '../models';
import {OrderInventoryRepository} from '../repositories';

export class OrderinventoryController {
  constructor(
    @repository(OrderInventoryRepository)
    public orderInventoryRepository : OrderInventoryRepository,
  ) {}

  @post('/order-inventories', {
    responses: {
      '200': {
        description: 'OrderInventory model instance',
        content: {'application/json': {schema: getModelSchemaRef(OrderInventory)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderInventory, {
            title: 'NewOrderInventory',
            exclude: ['id_order'],
          }),
        },
      },
    })
    orderInventory: Omit<OrderInventory, 'id_order'>,
  ): Promise<OrderInventory> {
    return this.orderInventoryRepository.create(orderInventory);
  }

  @get('/order-inventories/count', {
    responses: {
      '200': {
        description: 'OrderInventory model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(OrderInventory) where?: Where<OrderInventory>,
  ): Promise<Count> {
    return this.orderInventoryRepository.count(where);
  }

  @get('/order-inventories', {
    responses: {
      '200': {
        description: 'Array of OrderInventory model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(OrderInventory, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(OrderInventory) filter?: Filter<OrderInventory>,
  ): Promise<OrderInventory[]> {
    return this.orderInventoryRepository.find(filter);
  }

  @patch('/order-inventories', {
    responses: {
      '200': {
        description: 'OrderInventory PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderInventory, {partial: true}),
        },
      },
    })
    orderInventory: OrderInventory,
    @param.where(OrderInventory) where?: Where<OrderInventory>,
  ): Promise<Count> {
    return this.orderInventoryRepository.updateAll(orderInventory, where);
  }

  @get('/order-inventories/{id}', {
    responses: {
      '200': {
        description: 'OrderInventory model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(OrderInventory, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(OrderInventory, {exclude: 'where'}) filter?: FilterExcludingWhere<OrderInventory>
  ): Promise<OrderInventory> {
    return this.orderInventoryRepository.findById(id, filter);
  }

  @patch('/order-inventories/{id}', {
    responses: {
      '204': {
        description: 'OrderInventory PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderInventory, {partial: true}),
        },
      },
    })
    orderInventory: OrderInventory,
  ): Promise<void> {
    await this.orderInventoryRepository.updateById(id, orderInventory);
  }

  @put('/order-inventories/{id}', {
    responses: {
      '204': {
        description: 'OrderInventory PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() orderInventory: OrderInventory,
  ): Promise<void> {
    await this.orderInventoryRepository.replaceById(id, orderInventory);
  }

  @del('/order-inventories/{id}', {
    responses: {
      '204': {
        description: 'OrderInventory DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.orderInventoryRepository.deleteById(id);
  }
}
