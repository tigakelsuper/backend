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
  Mobil,
  PemesananMobil,
} from '../models';
import {MobilRepository} from '../repositories';

export class MobilPemesananMobilController {
  constructor(
    @repository(MobilRepository) protected mobilRepository: MobilRepository,
  ) { }

  @get('/mobils/{id}/pemesanan-mobils', {
    responses: {
      '200': {
        description: 'Array of Mobil has many PemesananMobil',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PemesananMobil)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<PemesananMobil>,
  ): Promise<PemesananMobil[]> {
    return this.mobilRepository.pemesananMobils(id).find(filter);
  }

  @post('/mobils/{id}/pemesanan-mobils', {
    responses: {
      '200': {
        description: 'Mobil model instance',
        content: {'application/json': {schema: getModelSchemaRef(PemesananMobil)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mobil.prototype.nomor_polisi,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PemesananMobil, {
            title: 'NewPemesananMobilInMobil',
            exclude: ['id'],
            optional: ['mobilId']
          }),
        },
      },
    }) pemesananMobil: Omit<PemesananMobil, 'id'>,
  ): Promise<PemesananMobil> {
    return this.mobilRepository.pemesananMobils(id).create(pemesananMobil);
  }

  @patch('/mobils/{id}/pemesanan-mobils', {
    responses: {
      '200': {
        description: 'Mobil.PemesananMobil PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
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
    return this.mobilRepository.pemesananMobils(id).patch(pemesananMobil, where);
  }

  @del('/mobils/{id}/pemesanan-mobils', {
    responses: {
      '200': {
        description: 'Mobil.PemesananMobil DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PemesananMobil)) where?: Where<PemesananMobil>,
  ): Promise<Count> {
    return this.mobilRepository.pemesananMobils(id).delete(where);
  }
}
