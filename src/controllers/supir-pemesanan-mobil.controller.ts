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
  Supir,
  PemesananMobil,
} from '../models';
import {SupirRepository} from '../repositories';

export class SupirPemesananMobilController {
  constructor(
    @repository(SupirRepository) protected supirRepository: SupirRepository,
  ) { }

  @get('/supirs/{id}/pemesanan-mobils', {
    responses: {
      '200': {
        description: 'Array of Supir has many PemesananMobil',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PemesananMobil)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<PemesananMobil>,
  ): Promise<PemesananMobil[]> {
    return this.supirRepository.pemesananMobils(id).find(filter);
  }

  @post('/supirs/{id}/pemesanan-mobils', {
    responses: {
      '200': {
        description: 'Supir model instance',
        content: {'application/json': {schema: getModelSchemaRef(PemesananMobil)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Supir.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PemesananMobil, {
            title: 'NewPemesananMobilInSupir',
            exclude: ['id'],
            optional: ['supirId']
          }),
        },
      },
    }) pemesananMobil: Omit<PemesananMobil, 'id'>,
  ): Promise<PemesananMobil> {
    return this.supirRepository.pemesananMobils(id).create(pemesananMobil);
  }

  @patch('/supirs/{id}/pemesanan-mobils', {
    responses: {
      '200': {
        description: 'Supir.PemesananMobil PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PemesananMobil, {partial: true}),
        },
      },
    })
    pemesananMobil: Partial<PemesananMobil>,
    @param.query.object('where', getWhereSchemaFor(PemesananMobil)) where?: Where<PemesananMobil>,
  ): Promise<Count> {
    return this.supirRepository.pemesananMobils(id).patch(pemesananMobil, where);
  }

  @del('/supirs/{id}/pemesanan-mobils', {
    responses: {
      '200': {
        description: 'Supir.PemesananMobil DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(PemesananMobil)) where?: Where<PemesananMobil>,
  ): Promise<Count> {
    return this.supirRepository.pemesananMobils(id).delete(where);
  }
}
