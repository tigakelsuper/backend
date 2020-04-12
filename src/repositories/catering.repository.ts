import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Catering, CateringRelations, User} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';

export class CateringRepository extends DefaultCrudRepository<
  Catering,
  typeof Catering.prototype.id_catering,
  CateringRelations
> {

  public readonly user: BelongsToAccessor<User, typeof Catering.prototype.id_catering>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Catering, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
