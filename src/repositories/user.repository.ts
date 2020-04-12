// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-access-control-migration
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  HasOneRepositoryFactory,
  repository,
} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Team, User, UserCredentials, UserRelations, PemesananMobil, MeetingRoomReservation, OrderInventory, Catering} from '../models';
import {TeamRepository} from './team.repository';
import {UserCredentialsRepository} from './user-credentials.repository';
import {PemesananMobilRepository} from './pemesanan-mobil.repository';
import {MeetingRoomReservationRepository} from './meeting-room-reservation.repository';
import {OrderInventoryRepository} from './order-inventory.repository';
import {CateringRepository} from './catering.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  public readonly userCredentials: HasOneRepositoryFactory<
    UserCredentials,
    typeof User.prototype.id
  >;

  public readonly teams: HasManyRepositoryFactory<
    Team,
    typeof User.prototype.id
  >;

  public readonly pemesananMobils: HasManyRepositoryFactory<PemesananMobil, typeof User.prototype.id>;

  public readonly meetingRoomReservations: HasManyRepositoryFactory<MeetingRoomReservation, typeof User.prototype.id>;

  public readonly orderInventories: HasManyRepositoryFactory<OrderInventory, typeof User.prototype.id>;

  public readonly caterings: HasManyRepositoryFactory<Catering, typeof User.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('UserCredentialsRepository')
    protected userCredentialsRepositoryGetter: Getter<
      UserCredentialsRepository
    >,
    @repository.getter('TeamRepository')
    protected teamRepositoryGetter: Getter<TeamRepository>, @repository.getter('PemesananMobilRepository') protected pemesananMobilRepositoryGetter: Getter<PemesananMobilRepository>, @repository.getter('MeetingRoomReservationRepository') protected meetingRoomReservationRepositoryGetter: Getter<MeetingRoomReservationRepository>, @repository.getter('OrderInventoryRepository') protected orderInventoryRepositoryGetter: Getter<OrderInventoryRepository>, @repository.getter('CateringRepository') protected cateringRepositoryGetter: Getter<CateringRepository>,
  ) {
    super(User, dataSource);
    this.caterings = this.createHasManyRepositoryFactoryFor('caterings', cateringRepositoryGetter,);
    this.registerInclusionResolver('caterings', this.caterings.inclusionResolver);
    this.orderInventories = this.createHasManyRepositoryFactoryFor('orderInventories', orderInventoryRepositoryGetter,);
    this.registerInclusionResolver('orderInventories', this.orderInventories.inclusionResolver);
    this.meetingRoomReservations = this.createHasManyRepositoryFactoryFor('meetingRoomReservations', meetingRoomReservationRepositoryGetter,);
    this.registerInclusionResolver('meetingRoomReservations', this.meetingRoomReservations.inclusionResolver);
    this.pemesananMobils = this.createHasManyRepositoryFactoryFor('pemesananMobils', pemesananMobilRepositoryGetter,);
    this.registerInclusionResolver('pemesananMobils', this.pemesananMobils.inclusionResolver);
    this.teams = this.createHasManyRepositoryFactoryFor(
      'teams',
      teamRepositoryGetter,
    );
    this.registerInclusionResolver('teams', this.teams.inclusionResolver);
    this.userCredentials = this.createHasOneRepositoryFactoryFor(
      'userCredentials',
      userCredentialsRepositoryGetter,
    );
    this.registerInclusionResolver(
      'userCredentials',
      this.userCredentials.inclusionResolver,
    );
  }

  async findCredentials(
    userId: typeof User.prototype.id,
  ): Promise<UserCredentials | undefined> {
    try {
      return await this.userCredentials(userId).get();
    } catch (err) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }
}
