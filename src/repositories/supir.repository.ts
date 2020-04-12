import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Supir, SupirRelations, PemesananMobil} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PemesananMobilRepository} from './pemesanan-mobil.repository';

export class SupirRepository extends DefaultCrudRepository<
  Supir,
  typeof Supir.prototype.id,
  SupirRelations
> {

  public readonly pemesananMobils: HasManyRepositoryFactory<PemesananMobil, typeof Supir.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('PemesananMobilRepository') protected pemesananMobilRepositoryGetter: Getter<PemesananMobilRepository>,
  ) {
    super(Supir, dataSource);
    this.pemesananMobils = this.createHasManyRepositoryFactoryFor('pemesananMobils', pemesananMobilRepositoryGetter,);
    this.registerInclusionResolver('pemesananMobils', this.pemesananMobils.inclusionResolver);
  }
}
