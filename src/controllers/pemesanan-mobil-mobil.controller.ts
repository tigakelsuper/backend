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
  Mobil,
} from '../models';
import {PemesananMobilRepository} from '../repositories';

export class PemesananMobilMobilController {
  constructor(
    @repository(PemesananMobilRepository)
    public pemesananMobilRepository: PemesananMobilRepository,
  ) { }

  @get('/pemesanan-mobils/{id}/mobil', {
    responses: {
      '200': {
        description: 'Mobil belonging to PemesananMobil',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mobil)},
          },
        },
      },
    },
  })
  async getMobil(
    @param.path.number('id') id: typeof PemesananMobil.prototype.id,
  ): Promise<Mobil> {
    return this.pemesananMobilRepository.mobil(id);
  }
}
