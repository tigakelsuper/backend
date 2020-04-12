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
  RuangMeeting,
} from '../models';
import {MeetingRoomReservationRepository} from '../repositories';

export class MeetingRoomReservationRuangMeetingController {
  constructor(
    @repository(MeetingRoomReservationRepository)
    public meetingRoomReservationRepository: MeetingRoomReservationRepository,
  ) { }

  @get('/meeting-room-reservations/{id}/ruang-meeting', {
    responses: {
      '200': {
        description: 'RuangMeeting belonging to MeetingRoomReservation',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(RuangMeeting)},
          },
        },
      },
    },
  })
  async getRuangMeeting(
    @param.path.number('id') id: typeof MeetingRoomReservation.prototype.id_meeting_room_res,
  ): Promise<RuangMeeting> {
    return this.meetingRoomReservationRepository.ruangMeeting(id);
  }
}
