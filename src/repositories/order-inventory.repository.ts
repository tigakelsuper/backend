import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {OrderInventory, OrderInventoryRelations, Inventory, User} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {InventoryRepository} from './inventory.repository';
import {UserRepository} from './user.repository';

export class OrderInventoryRepository extends DefaultCrudRepository<
  OrderInventory,
  typeof OrderInventory.prototype.id_order,
  OrderInventoryRelations
> {

  public readonly inventory: BelongsToAccessor<Inventory, typeof OrderInventory.prototype.id_order>;

  public readonly user: BelongsToAccessor<User, typeof OrderInventory.prototype.id_order>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('InventoryRepository') protected inventoryRepositoryGetter: Getter<InventoryRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(OrderInventory, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.inventory = this.createBelongsToAccessorFor('inventory', inventoryRepositoryGetter,);
    this.registerInclusionResolver('inventory', this.inventory.inclusionResolver);
  }
}
