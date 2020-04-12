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
  RuangMeeting,
  MeetingRoomReservation,
} from '../models';
import {RuangMeetingRepository} from '../repositories';

export class RuangMeetingMeetingRoomReservationController {
  constructor(
    @repository(RuangMeetingRepository) protected ruangMeetingRepository: RuangMeetingRepository,
  ) { }

  @get('/ruang-meetings/{id}/meeting-room-reservations', {
    responses: {
      '200': {
        description: 'Array of RuangMeeting has many MeetingRoomReservation',
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
    return this.ruangMeetingRepository.meetingRoomReservations(id).find(filter);
  }

  @post('/ruang-meetings/{id}/meeting-room-reservations', {
    responses: {
      '200': {
        description: 'RuangMeeting model instance',
        content: {'application/json': {schema: getModelSchemaRef(MeetingRoomReservation)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof RuangMeeting.prototype.id_ruangan,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MeetingRoomReservation, {
            title: 'NewMeetingRoomReservationInRuangMeeting',
            exclude: ['id_meeting_room_res'],
            optional: ['ruangMeetingId']
          }),
        },
      },
    }) meetingRoomReservation: Omit<MeetingRoomReservation, 'id_meeting_room_res'>,
  ): Promise<MeetingRoomReservation> {
    return this.ruangMeetingRepository.meetingRoomReservations(id).create(meetingRoomReservation);
  }

  @patch('/ruang-meetings/{id}/meeting-room-reservations', {
    responses: {
      '200': {
        description: 'RuangMeeting.MeetingRoomReservation PATCH success count',
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
    return this.ruangMeetingRepository.meetingRoomReservations(id).patch(meetingRoomReservation, where);
  }

  @del('/ruang-meetings/{id}/meeting-room-reservations', {
    responses: {
      '200': {
        description: 'RuangMeeting.MeetingRoomReservation DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(MeetingRoomReservation)) where?: Where<MeetingRoomReservation>,
  ): Promise<Count> {
    return this.ruangMeetingRepository.meetingRoomReservations(id).delete(where);
  }
}
