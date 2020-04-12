// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-access-control-migration
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { Entity, hasMany, hasOne, model, property } from '@loopback/repository';
import { Team } from './team.model';
import { UserCredentials } from './user-credentials.model';
import { PemesananMobil, PemesananMobilWithRelations } from './pemesanan-mobil.model';
import { MeetingRoomReservation, MeetingRoomReservationWithRelations } from './meeting-room-reservation.model';
import { OrderInventory, OrderInventoryWithRelations } from './order-inventory.model';
import { Catering, CateringWithRelations } from './catering.model';

@model({
  settings: {
    strict: false,
  },
})
export class User extends Entity {
  // must keep it
  @property({
    type: 'number',
    id: 1,
    generated: false,
    updateOnly: true,
  })
  id: number;

  @property({
    type: 'string',
  })
  realm?: string;

  // must keep it
  @property({
    type: 'string',
  })
  username?: string;

  // must keep it
  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'boolean',
  })
  emailVerified?: boolean;

  @hasMany(() => PemesananMobil)
  pemesananMobils: PemesananMobil[];

  @hasMany(() => MeetingRoomReservation)
  meetingRoomReservations: MeetingRoomReservation[];

  @hasMany(() => OrderInventory)
  orderInventories: OrderInventory[];

  @hasMany(() => Catering)
  caterings: Catering[];
  @property({
    type: 'string',
  })
  verificationToken?: string;

  @hasOne(() => UserCredentials)
  userCredentials: UserCredentials;

  @hasMany(() => Team, { keyTo: 'ownerId' })
  teams: Team[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
  pemesananMobils?: PemesananMobilWithRelations,
  meetingRoomReservations?: MeetingRoomReservationWithRelations,
  orderInventories?: OrderInventoryWithRelations,
  caterings?: CateringWithRelations

}

export type UserWithRelations = User & UserRelations;
