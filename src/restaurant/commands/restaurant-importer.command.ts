import { RestaurantImporterService } from '../services/restaurant-importer.interface';
import { Console, Command } from 'nestjs-console';
import { RestaurantService } from '../services/restaurant.interface';
import { LoggerFactory } from '../../common/utils/LoggerFactory';
import { Inject } from '@nestjs/common';

@Console()
export class RestaurantImportCommand {
  private readonly logger = LoggerFactory(RestaurantImportCommand.name);
  
  constructor(
    @Inject('RestaurantImporterService')
    private readonly restaurantImporterService: RestaurantImporterService,
    @Inject('RestaurantService')
    private readonly restaurantService: RestaurantService,
  ) {}
  
  @Command({
        command: 'import-restaurants [arg1]',
  })
  async commandHandler(arg1?: string): Promise<void> {
    if (arg1) {
      await this.importRestaurants(arg1);
    } else {
      const url = process.env.RESTAURANTS_URL;
      this.logger.log('No url specified, using default repositories url', url)
      await this.importRestaurants(url);
    }
  }

  private async importRestaurants(url: string): Promise<void> {
    await this.restaurantService.truncateRestaurantCollection();
    await this.restaurantImporterService.importRestaurants(url);
  }
}