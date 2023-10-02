import { Injectable } from '@nestjs/common';
import { RestaurantRepository } from '../repositories/restaurant.repository';
import { Restaurant } from '../schemas/restaurant.schema';
import { RestaurantService } from './restaurant.interface';

@Injectable()
export class RestaurantServiceImpl implements RestaurantService {

  constructor(
    private readonly restaurantRepository: RestaurantRepository,
  ) { }

  public searchPaginated(page: number, limit: number, search?: string): Promise<{ results: Restaurant[], total: number }>{
    return this.restaurantRepository.findAllPaginated(page, limit, search);
  }

  async insertManyRestaurants(restaurants: Restaurant[]): Promise<void> {
    await this.restaurantRepository.insertMany(restaurants);
  }

  async truncateRestaurantCollection() {
    await this.restaurantRepository.truncateRestaurantCollection();
  }
}