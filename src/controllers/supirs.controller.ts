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
import {Supir} from '../models';
import {SupirRepository} from '../repositories';

export class SupirsController {
  constructor(
    @repository(SupirRepository)
    public supirRepository : SupirRepository,
  ) {}

  @post('/supirs', {
    responses: {
      '200': {
        description: 'Supir model instance',
        content: {'application/json': {schema: getModelSchemaRef(Supir)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Supir, {
            title: 'NewSupir',
            exclude: ['id'],
          }),
        },
      },
    })
    supir: Omit<Supir, 'id'>,
  ): Promise<Supir> {
    return this.supirRepository.create(supir);
  }

  @get('/supirs/count', {
    responses: {
      '200': {
        description: 'Supir model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Supir) where?: Where<Supir>,
  ): Promise<Count> {
    return this.supirRepository.count(where);
  }

  @get('/supirs', {
    responses: {
      '200': {
        description: 'Array of Supir model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Supir, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Supir) filter?: Filter<Supir>,
  ): Promise<Supir[]> {
    return this.supirRepository.find(filter);
  }

  @patch('/supirs', {
    responses: {
      '200': {
        description: 'Supir PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Supir, {partial: true}),
        },
      },
    })
    supir: Supir,
    @param.where(Supir) where?: Where<Supir>,
  ): Promise<Count> {
    return this.supirRepository.updateAll(supir, where);
  }

  @get('/supirs/{id}', {
    responses: {
      '200': {
        description: 'Supir model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Supir, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Supir, {exclude: 'where'}) filter?: FilterExcludingWhere<Supir>
  ): Promise<Supir> {
    return this.supirRepository.findById(id, filter);
  }

  @patch('/supirs/{id}', {
    responses: {
      '204': {
        description: 'Supir PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Supir, {partial: true}),
        },
      },
    })
    supir: Supir,
  ): Promise<void> {
    await this.supirRepository.updateById(id, supir);
  }

  @put('/supirs/{id}', {
    responses: {
      '204': {
        description: 'Supir PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() supir: Supir,
  ): Promise<void> {
    await this.supirRepository.replaceById(id, supir);
  }

  @del('/supirs/{id}', {
    responses: {
      '204': {
        description: 'Supir DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.supirRepository.deleteById(id);
  }
}
