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
  Catering,
} from '../models';
import {UserRepository} from '../repositories';

export class UserCateringController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/caterings', {
    responses: {
      '200': {
        description: 'Array of User has many Catering',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Catering)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Catering>,
  ): Promise<Catering[]> {
    return this.userRepository.caterings(id).find(filter);
  }

  @post('/users/{id}/caterings', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Catering)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Catering, {
            title: 'NewCateringInUser',
            exclude: ['id_catering'],
            optional: ['userId']
          }),
        },
      },
    }) catering: Omit<Catering, 'id_catering'>,
  ): Promise<Catering> {
    return this.userRepository.caterings(id).create(catering);
  }

  @patch('/users/{id}/caterings', {
    responses: {
      '200': {
        description: 'User.Catering PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Catering, {partial: true}),
        },
      },
    })
    catering: Partial<Catering>,
    @param.query.object('where', getWhereSchemaFor(Catering)) where?: Where<Catering>,
  ): Promise<Count> {
    return this.userRepository.caterings(id).patch(catering, where);
  }

  @del('/users/{id}/caterings', {
    responses: {
      '200': {
        description: 'User.Catering DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Catering)) where?: Where<Catering>,
  ): Promise<Count> {
    return this.userRepository.caterings(id).delete(where);
  }
}
