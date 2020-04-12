import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Catering,
  User,
} from '../models';
import {CateringRepository} from '../repositories';

export class CateringUserController {
  constructor(
    @repository(CateringRepository)
    public cateringRepository: CateringRepository,
  ) { }

  @get('/caterings/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Catering',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof Catering.prototype.id_catering,
  ): Promise<User> {
    return this.cateringRepository.user(id);
  }
}
