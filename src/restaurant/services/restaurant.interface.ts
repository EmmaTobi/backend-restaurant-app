import { Restaurant } from '../schemas/restaurant.schema';

export interface RestaurantService {
  searchPaginated(page: number, limit: number, search?: string): Promise<{ results: Restaurant[], total: number }>;

  insertManyRestaurants(restaurants: Restaurant[]): Promise<void>;

  truncateRestaurantCollection();
}