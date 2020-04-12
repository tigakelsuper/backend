import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Mobil, MobilRelations, PemesananMobil} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PemesananMobilRepository} from './pemesanan-mobil.repository';

export class MobilRepository extends DefaultCrudRepository<
  Mobil,
  typeof Mobil.prototype.nomor_polisi,
  MobilRelations
> {

  public readonly pemesananMobils: HasManyRepositoryFactory<PemesananMobil, typeof Mobil.prototype.nomor_polisi>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('PemesananMobilRepository') protected pemesananMobilRepositoryGetter: Getter<PemesananMobilRepository>,
  ) {
    super(Mobil, dataSource);
    this.pemesananMobils = this.createHasManyRepositoryFactoryFor('pemesananMobils', pemesananMobilRepositoryGetter,);
    this.registerInclusionResolver('pemesananMobils', this.pemesananMobils.inclusionResolver);
  }
}
