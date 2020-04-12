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
import {RuangMeeting} from '../models';
import {RuangMeetingRepository} from '../repositories';

export class RuangmeetingsController {
  constructor(
    @repository(RuangMeetingRepository)
    public ruangMeetingRepository : RuangMeetingRepository,
  ) {}

  @post('/ruang-meetings', {
    responses: {
      '200': {
        description: 'RuangMeeting model instance',
        content: {'application/json': {schema: getModelSchemaRef(RuangMeeting)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RuangMeeting, {
            title: 'NewRuangMeeting',
            exclude: ['id_ruangan'],
          }),
        },
      },
    })
    ruangMeeting: Omit<RuangMeeting, 'id_ruangan'>,
  ): Promise<RuangMeeting> {
    return this.ruangMeetingRepository.create(ruangMeeting);
  }

  @get('/ruang-meetings/count', {
    responses: {
      '200': {
        description: 'RuangMeeting model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(RuangMeeting) where?: Where<RuangMeeting>,
  ): Promise<Count> {
    return this.ruangMeetingRepository.count(where);
  }

  @get('/ruang-meetings', {
    responses: {
      '200': {
        description: 'Array of RuangMeeting model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(RuangMeeting, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(RuangMeeting) filter?: Filter<RuangMeeting>,
  ): Promise<RuangMeeting[]> {
    return this.ruangMeetingRepository.find(filter);
  }

  @patch('/ruang-meetings', {
    responses: {
      '200': {
        description: 'RuangMeeting PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RuangMeeting, {partial: true}),
        },
      },
    })
    ruangMeeting: RuangMeeting,
    @param.where(RuangMeeting) where?: Where<RuangMeeting>,
  ): Promise<Count> {
    return this.ruangMeetingRepository.updateAll(ruangMeeting, where);
  }

  @get('/ruang-meetings/{id}', {
    responses: {
      '200': {
        description: 'RuangMeeting model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(RuangMeeting, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(RuangMeeting, {exclude: 'where'}) filter?: FilterExcludingWhere<RuangMeeting>
  ): Promise<RuangMeeting> {
    return this.ruangMeetingRepository.findById(id, filter);
  }

  @patch('/ruang-meetings/{id}', {
    responses: {
      '204': {
        description: 'RuangMeeting PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RuangMeeting, {partial: true}),
        },
      },
    })
    ruangMeeting: RuangMeeting,
  ): Promise<void> {
    await this.ruangMeetingRepository.updateById(id, ruangMeeting);
  }

  @put('/ruang-meetings/{id}', {
    responses: {
      '204': {
        description: 'RuangMeeting PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() ruangMeeting: RuangMeeting,
  ): Promise<void> {
    await this.ruangMeetingRepository.replaceById(id, ruangMeeting);
  }

  @del('/ruang-meetings/{id}', {
    responses: {
      '204': {
        description: 'RuangMeeting DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.ruangMeetingRepository.deleteById(id);
  }
}
