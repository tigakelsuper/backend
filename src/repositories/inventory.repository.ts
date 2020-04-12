import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Inventory, InventoryRelations, OrderInventory} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {OrderInventoryRepository} from './order-inventory.repository';

export class InventoryRepository extends DefaultCrudRepository<
  Inventory,
  typeof Inventory.prototype.id_inventory,
  InventoryRelations
> {

  public readonly orderInventories: HasManyRepositoryFactory<OrderInventory, typeof Inventory.prototype.id_inventory>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('OrderInventoryRepository') protected orderInventoryRepositoryGetter: Getter<OrderInventoryRepository>,
  ) {
    super(Inventory, dataSource);
    this.orderInventories = this.createHasManyRepositoryFactoryFor('orderInventories', orderInventoryRepositoryGetter,);
    this.registerInclusionResolver('orderInventories', this.orderInventories.inclusionResolver);
  }
}
