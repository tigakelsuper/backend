import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  MeetingRoomReservation,
  User,
} from '../models';
import {MeetingRoomReservationRepository} from '../repositories';

export class MeetingRoomReservationUserController {
  constructor(
    @repository(MeetingRoomReservationRepository)
    public meetingRoomReservationRepository: MeetingRoomReservationRepository,
  ) { }

  @get('/meeting-room-reservations/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to MeetingRoomReservation',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof MeetingRoomReservation.prototype.id_meeting_room_res,
  ): Promise<User> {
    return this.meetingRoomReservationRepository.user(id);
  }
}
