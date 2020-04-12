import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MeetingRoomReservation, MeetingRoomReservationRelations, RuangMeeting, User} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {RuangMeetingRepository} from './ruang-meeting.repository';
import {UserRepository} from './user.repository';

export class MeetingRoomReservationRepository extends DefaultCrudRepository<
  MeetingRoomReservation,
  typeof MeetingRoomReservation.prototype.id_meeting_room_res,
  MeetingRoomReservationRelations
> {

  public readonly ruangMeeting: BelongsToAccessor<RuangMeeting, typeof MeetingRoomReservation.prototype.id_meeting_room_res>;

  public readonly user: BelongsToAccessor<User, typeof MeetingRoomReservation.prototype.id_meeting_room_res>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('RuangMeetingRepository') protected ruangMeetingRepositoryGetter: Getter<RuangMeetingRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(MeetingRoomReservation, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.ruangMeeting = this.createBelongsToAccessorFor('ruangMeeting', ruangMeetingRepositoryGetter,);
    this.registerInclusionResolver('ruangMeeting', this.ruangMeeting.inclusionResolver);
  }
}
