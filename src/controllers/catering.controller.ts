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
import {Catering} from '../models';
import {CateringRepository} from '../repositories';

export class CateringController {
  constructor(
    @repository(CateringRepository)
    public cateringRepository : CateringRepository,
  ) {}

  @post('/caterings', {
    responses: {
      '200': {
        description: 'Catering model instance',
        content: {'application/json': {schema: getModelSchemaRef(Catering)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Catering, {
            title: 'NewCatering',
            exclude: ['id_catering'],
          }),
        },
      },
    })
    catering: Omit<Catering, 'id_catering'>,
  ): Promise<Catering> {
    return this.cateringRepository.create(catering);
  }

  @get('/caterings/count', {
    responses: {
      '200': {
        description: 'Catering model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Catering) where?: Where<Catering>,
  ): Promise<Count> {
    return this.cateringRepository.count(where);
  }

  @get('/caterings', {
    responses: {
      '200': {
        description: 'Array of Catering model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Catering, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Catering) filter?: Filter<Catering>,
  ): Promise<Catering[]> {
    return this.cateringRepository.find(filter);
  }

  @patch('/caterings', {
    responses: {
      '200': {
        description: 'Catering PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Catering, {partial: true}),
        },
      },
    })
    catering: Catering,
    @param.where(Catering) where?: Where<Catering>,
  ): Promise<Count> {
    return this.cateringRepository.updateAll(catering, where);
  }

  @get('/caterings/{id}', {
    responses: {
      '200': {
        description: 'Catering model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Catering, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Catering, {exclude: 'where'}) filter?: FilterExcludingWhere<Catering>
  ): Promise<Catering> {
    return this.cateringRepository.findById(id, filter);
  }

  @patch('/caterings/{id}', {
    responses: {
      '204': {
        description: 'Catering PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Catering, {partial: true}),
        },
      },
    })
    catering: Catering,
  ): Promise<void> {
    await this.cateringRepository.updateById(id, catering);
  }

  @put('/caterings/{id}', {
    responses: {
      '204': {
        description: 'Catering PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() catering: Catering,
  ): Promise<void> {
    await this.cateringRepository.replaceById(id, catering);
  }

  @del('/caterings/{id}', {
    responses: {
      '204': {
        description: 'Catering DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.cateringRepository.deleteById(id);
  }
}
