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
import { PemesananMobil } from '../models';
import { PemesananMobilRepository } from '../repositories';

export class PemesananMobilController {
  constructor(
    @repository(PemesananMobilRepository)
    public pemesananMobilRepository: PemesananMobilRepository,
  ) { }

  @post('/pemesanan-mobils', {
    responses: {
      '200': {
        description: 'PemesananMobil model instance',
        content: { 'application/json': { schema: getModelSchemaRef(PemesananMobil) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PemesananMobil, {
            title: 'NewPemesananMobil',
            exclude: ['id'],
          }),
        },
      },
    })
    pemesananMobil: Omit<PemesananMobil, 'id'>,
  ): Promise<PemesananMobil> {
    return this.pemesananMobilRepository.create(pemesananMobil);
  }

  @get('/pemesanan-mobils/count', {
    responses: {
      '200': {
        description: 'PemesananMobil model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.where(PemesananMobil) where?: Where<PemesananMobil>,
  ): Promise<Count> {
    return this.pemesananMobilRepository.count(where);
  }

  @get('/pemesanan-mobils', {
    responses: {
      '200': {
        description: 'Array of PemesananMobil model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PemesananMobil, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(PemesananMobil) filter?: Filter<PemesananMobil>,
  ): Promise<PemesananMobil[]> {
    return this.pemesananMobilRepository.find(filter);
  }

  @patch('/pemesanan-mobils', {
    responses: {
      '200': {
        description: 'PemesananMobil PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PemesananMobil, { partial: true }),
        },
      },
    })
    pemesananMobil: PemesananMobil,
    @param.where(PemesananMobil) where?: Where<PemesananMobil>,
  ): Promise<Count> {
    return this.pemesananMobilRepository.updateAll(pemesananMobil, where);
  }

  @get('/pemesanan-mobils/{id}', {
    responses: {
      '200': {
        description: 'PemesananMobil model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PemesananMobil, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PemesananMobil, { exclude: 'where' }) filter?: FilterExcludingWhere<PemesananMobil>
  ): Promise<PemesananMobil> {
    return this.pemesananMobilRepository.findById(id, filter);
  }

  @patch('/pemesanan-mobils/{id}', {
    responses: {
      '204': {
        description: 'PemesananMobil PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PemesananMobil, { partial: true }),
        },
      },
    })
    pemesananMobil: PemesananMobil,
  ): Promise<void> {
    await this.pemesananMobilRepository.updateById(id, pemesananMobil);
  }

  @put('/pemesanan-mobils/{id}', {
    responses: {
      '204': {
        description: 'PemesananMobil PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() pemesananMobil: PemesananMobil,
  ): Promise<void> {
    await this.pemesananMobilRepository.replaceById(id, pemesananMobil);
  }

  @del('/pemesanan-mobils/{id}', {
    responses: {
      '204': {
        description: 'PemesananMobil DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.pemesananMobilRepository.deleteById(id);
  }
}
