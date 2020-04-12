import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PemesananMobil,
  User,
} from '../models';
import {PemesananMobilRepository} from '../repositories';

export class PemesananMobilUserController {
  constructor(
    @repository(PemesananMobilRepository)
    public pemesananMobilRepository: PemesananMobilRepository,
  ) { }

  @get('/pemesanan-mobils/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to PemesananMobil',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof PemesananMobil.prototype.id,
  ): Promise<User> {
    return this.pemesananMobilRepository.user(id);
  }
}
