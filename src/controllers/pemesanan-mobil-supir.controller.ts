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
  Supir,
} from '../models';
import {PemesananMobilRepository} from '../repositories';

export class PemesananMobilSupirController {
  constructor(
    @repository(PemesananMobilRepository)
    public pemesananMobilRepository: PemesananMobilRepository,
  ) { }

  @get('/pemesanan-mobils/{id}/supir', {
    responses: {
      '200': {
        description: 'Supir belonging to PemesananMobil',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Supir)},
          },
        },
      },
    },
  })
  async getSupir(
    @param.path.number('id') id: typeof PemesananMobil.prototype.id,
  ): Promise<Supir> {
    return this.pemesananMobilRepository.supir(id);
  }
}
