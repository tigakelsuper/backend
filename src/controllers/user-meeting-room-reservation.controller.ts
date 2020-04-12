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
  MeetingRoomReservation,
} from '../models';
import {UserRepository} from '../repositories';

export class UserMeetingRoomReservationController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/meeting-room-reservations', {
    responses: {
      '200': {
        description: 'Array of User has many MeetingRoomReservation',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MeetingRoomReservation)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<MeetingRoomReservation>,
  ): Promise<MeetingRoomReservation[]> {
    return this.userRepository.meetingRoomReservations(id).find(filter);
  }

  @post('/users/{id}/meeting-room-reservations', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(MeetingRoomReservation)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MeetingRoomReservation, {
            title: 'NewMeetingRoomReservationInUser',
            exclude: ['id_meeting_room_res'],
            optional: ['userId']
          }),
        },
      },
    }) meetingRoomReservation: Omit<MeetingRoomReservation, 'id_meeting_room_res'>,
  ): Promise<MeetingRoomReservation> {
    return this.userRepository.meetingRoomReservations(id).create(meetingRoomReservation);
  }

  @patch('/users/{id}/meeting-room-reservations', {
    responses: {
      '200': {
        description: 'User.MeetingRoomReservation PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MeetingRoomReservation, {partial: true}),
        },
      },
    })
    meetingRoomReservation: Partial<MeetingRoomReservation>,
    @param.query.object('where', getWhereSchemaFor(MeetingRoomReservation)) where?: Where<MeetingRoomReservation>,
  ): Promise<Count> {
    return this.userRepository.meetingRoomReservations(id).patch(meetingRoomReservation, where);
  }

  @del('/users/{id}/meeting-room-reservations', {
    responses: {
      '200': {
        description: 'User.MeetingRoomReservation DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(MeetingRoomReservation)) where?: Where<MeetingRoomReservation>,
  ): Promise<Count> {
    return this.userRepository.meetingRoomReservations(id).delete(where);
  }
}
