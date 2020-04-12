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
import {Mobil} from '../models';
import {MobilRepository} from '../repositories';

export class MobilController {
  constructor(
    @repository(MobilRepository)
    public mobilRepository : MobilRepository,
  ) {}

  @post('/mobils', {
    responses: {
      '200': {
        description: 'Mobil model instance',
        content: {'application/json': {schema: getModelSchemaRef(Mobil)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mobil, {
            title: 'NewMobil',
            exclude: ['nomor_polisi'],
          }),
        },
      },
    })
    mobil: Omit<Mobil, 'nomor_polisi'>,
  ): Promise<Mobil> {
    return this.mobilRepository.create(mobil);
  }

  @get('/mobils/count', {
    responses: {
      '200': {
        description: 'Mobil model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Mobil) where?: Where<Mobil>,
  ): Promise<Count> {
    return this.mobilRepository.count(where);
  }

  @get('/mobils', {
    responses: {
      '200': {
        description: 'Array of Mobil model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Mobil, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Mobil) filter?: Filter<Mobil>,
  ): Promise<Mobil[]> {
    return this.mobilRepository.find(filter);
  }

  @patch('/mobils', {
    responses: {
      '200': {
        description: 'Mobil PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mobil, {partial: true}),
        },
      },
    })
    mobil: Mobil,
    @param.where(Mobil) where?: Where<Mobil>,
  ): Promise<Count> {
    return this.mobilRepository.updateAll(mobil, where);
  }

  @get('/mobils/{id}', {
    responses: {
      '200': {
        description: 'Mobil model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Mobil, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Mobil, {exclude: 'where'}) filter?: FilterExcludingWhere<Mobil>
  ): Promise<Mobil> {
    return this.mobilRepository.findById(id, filter);
  }

  @patch('/mobils/{id}', {
    responses: {
      '204': {
        description: 'Mobil PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mobil, {partial: true}),
        },
      },
    })
    mobil: Mobil,
  ): Promise<void> {
    await this.mobilRepository.updateById(id, mobil);
  }

  @put('/mobils/{id}', {
    responses: {
      '204': {
        description: 'Mobil PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() mobil: Mobil,
  ): Promise<void> {
    await this.mobilRepository.replaceById(id, mobil);
  }

  @del('/mobils/{id}', {
    responses: {
      '204': {
        description: 'Mobil DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.mobilRepository.deleteById(id);
  }
}
