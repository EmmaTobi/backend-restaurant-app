import { Inject, Injectable } from '@nestjs/common';
import { RestaurantService } from './restaurant.interface';
import { Restaurant } from '../schemas/restaurant.schema';
import { AxiosError } from 'axios';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { LoggerFactory } from '../../common/utils/LoggerFactory';
import { RestaurantImporterService } from './restaurant-importer.interface';

@Injectable()
export class RestaurantImporterServiceImpl implements RestaurantImporterService {
  private readonly logger = LoggerFactory(RestaurantImporterServiceImpl.name);
  
  constructor(
    @Inject('RestaurantService')
    private readonly restaurantService: RestaurantService,
    private readonly httpService: HttpService
  ) { }
  
  async importRestaurants(url: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get<Restaurant[]>(url).pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened while fetching restaurants!';
          }),
        ),
      );

      await this.batchProcess(response.data);
    } catch (error) {
      if (error.response?.status === 404) {
        this.logger.error('The restaurant import URL is not valid.');
      } else {
        this.logger.error('Failed to import restaurants:', error.message);
      }
    }
  }

  async batchProcess(restaurants: Restaurant[]) {
    this.logger.log(`starting batch processing of ${restaurants.length} restaurants...`);
    const batchSize = 1000;
    let restaurantsToInsert = [];

    for (const restaurant of restaurants) {
      restaurant._id = restaurant._id['$oid'];
      restaurantsToInsert.push(restaurant);

      if (restaurantsToInsert.length === batchSize) {
        await this.restaurantService.insertManyRestaurants(restaurantsToInsert);
        restaurantsToInsert = [];
      }
    }

    // If there are any remaining restaurants, insert them now.
    if (restaurantsToInsert.length > 0) {
      await this.restaurantService.insertManyRestaurants(restaurantsToInsert);
    }

    this.logger.log(`batch processed ${restaurants.length} restaurants`);
  }
}