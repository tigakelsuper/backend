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
  PemesananMobil,
} from '../models';
import {UserRepository} from '../repositories';

export class UserPemesananMobilController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/pemesanan-mobils', {
    responses: {
      '200': {
        description: 'Array of User has many PemesananMobil',
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
    return this.userRepository.pemesananMobils(id).find(filter);
  }

  @post('/users/{id}/pemesanan-mobils', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(PemesananMobil)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PemesananMobil, {
            title: 'NewPemesananMobilInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) pemesananMobil: Omit<PemesananMobil, 'id'>,
  ): Promise<PemesananMobil> {
    return this.userRepository.pemesananMobils(id).create(pemesananMobil);
  }

  @patch('/users/{id}/pemesanan-mobils', {
    responses: {
      '200': {
        description: 'User.PemesananMobil PATCH success count',
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
    return this.userRepository.pemesananMobils(id).patch(pemesananMobil, where);
  }

  @del('/users/{id}/pemesanan-mobils', {
    responses: {
      '200': {
        description: 'User.PemesananMobil DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(PemesananMobil)) where?: Where<PemesananMobil>,
  ): Promise<Count> {
    return this.userRepository.pemesananMobils(id).delete(where);
  }
}
