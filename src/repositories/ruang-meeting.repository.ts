import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {RuangMeeting, RuangMeetingRelations, MeetingRoomReservation} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {MeetingRoomReservationRepository} from './meeting-room-reservation.repository';

export class RuangMeetingRepository extends DefaultCrudRepository<
  RuangMeeting,
  typeof RuangMeeting.prototype.id_ruangan,
  RuangMeetingRelations
> {

  public readonly meetingRoomReservations: HasManyRepositoryFactory<MeetingRoomReservation, typeof RuangMeeting.prototype.id_ruangan>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('MeetingRoomReservationRepository') protected meetingRoomReservationRepositoryGetter: Getter<MeetingRoomReservationRepository>,
  ) {
    super(RuangMeeting, dataSource);
    this.meetingRoomReservations = this.createHasManyRepositoryFactoryFor('meetingRoomReservations', meetingRoomReservationRepositoryGetter,);
    this.registerInclusionResolver('meetingRoomReservations', this.meetingRoomReservations.inclusionResolver);
  }
}
