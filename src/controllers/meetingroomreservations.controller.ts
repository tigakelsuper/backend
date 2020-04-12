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
import {MeetingRoomReservation} from '../models';
import {MeetingRoomReservationRepository} from '../repositories';

export class MeetingroomreservationsController {
  constructor(
    @repository(MeetingRoomReservationRepository)
    public meetingRoomReservationRepository : MeetingRoomReservationRepository,
  ) {}

  @post('/meeting-room-reservations', {
    responses: {
      '200': {
        description: 'MeetingRoomReservation model instance',
        content: {'application/json': {schema: getModelSchemaRef(MeetingRoomReservation)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MeetingRoomReservation, {
            title: 'NewMeetingRoomReservation',
            exclude: ['id_meeting_room_res'],
          }),
        },
      },
    })
    meetingRoomReservation: Omit<MeetingRoomReservation, 'id_meeting_room_res'>,
  ): Promise<MeetingRoomReservation> {
    return this.meetingRoomReservationRepository.create(meetingRoomReservation);
  }

  @get('/meeting-room-reservations/count', {
    responses: {
      '200': {
        description: 'MeetingRoomReservation model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(MeetingRoomReservation) where?: Where<MeetingRoomReservation>,
  ): Promise<Count> {
    return this.meetingRoomReservationRepository.count(where);
  }

  @get('/meeting-room-reservations', {
    responses: {
      '200': {
        description: 'Array of MeetingRoomReservation model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(MeetingRoomReservation, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(MeetingRoomReservation) filter?: Filter<MeetingRoomReservation>,
  ): Promise<MeetingRoomReservation[]> {
    return this.meetingRoomReservationRepository.find(filter);
  }

  @patch('/meeting-room-reservations', {
    responses: {
      '200': {
        description: 'MeetingRoomReservation PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MeetingRoomReservation, {partial: true}),
        },
      },
    })
    meetingRoomReservation: MeetingRoomReservation,
    @param.where(MeetingRoomReservation) where?: Where<MeetingRoomReservation>,
  ): Promise<Count> {
    return this.meetingRoomReservationRepository.updateAll(meetingRoomReservation, where);
  }

  @get('/meeting-room-reservations/{id}', {
    responses: {
      '200': {
        description: 'MeetingRoomReservation model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(MeetingRoomReservation, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(MeetingRoomReservation, {exclude: 'where'}) filter?: FilterExcludingWhere<MeetingRoomReservation>
  ): Promise<MeetingRoomReservation> {
    return this.meetingRoomReservationRepository.findById(id, filter);
  }

  @patch('/meeting-room-reservations/{id}', {
    responses: {
      '204': {
        description: 'MeetingRoomReservation PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MeetingRoomReservation, {partial: true}),
        },
      },
    })
    meetingRoomReservation: MeetingRoomReservation,
  ): Promise<void> {
    await this.meetingRoomReservationRepository.updateById(id, meetingRoomReservation);
  }

  @put('/meeting-room-reservations/{id}', {
    responses: {
      '204': {
        description: 'MeetingRoomReservation PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() meetingRoomReservation: MeetingRoomReservation,
  ): Promise<void> {
    await this.meetingRoomReservationRepository.replaceById(id, meetingRoomReservation);
  }

  @del('/meeting-room-reservations/{id}', {
    responses: {
      '204': {
        description: 'MeetingRoomReservation DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.meetingRoomReservationRepository.deleteById(id);
  }
}
