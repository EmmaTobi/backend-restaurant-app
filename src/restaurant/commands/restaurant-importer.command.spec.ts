import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantImportCommand } from './restaurant-importer.command';
import { RestaurantImporterService } from '../services/restaurant-importer.interface';
import { RestaurantService } from '../services/restaurant.interface';

describe('RestaurantImportCommand', () => {
  let command: RestaurantImportCommand;
  let restaurantImporterService: RestaurantImporterService;
  let restaurantService: RestaurantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantImportCommand,
        {
          provide: 'RestaurantImporterService',
          useValue: {
            importRestaurants: jest.fn(),
          },
        },
        {
          provide: 'RestaurantService',
          useValue: {
            truncateRestaurantCollection: jest.fn(),
          },
        },
      ],
    }).compile();

    command = module.get<RestaurantImportCommand>(RestaurantImportCommand);
    restaurantImporterService = module.get<RestaurantImporterService>('RestaurantImporterService');
    restaurantService = module.get<RestaurantService>('RestaurantService');
  });

  it('should be defined', () => {
    expect(command).toBeDefined();
  });

  describe('commandHandler', () => {
    it('should import restaurants with specified URL', async () => {
      const url = 'http://example.com/restaurants.json';

      await command.commandHandler(url);

      // Expect the truncateRestaurantCollection method to be called
      expect(restaurantService.truncateRestaurantCollection).toHaveBeenCalled();

      // Expect the importRestaurants method to be called with the specified URL
      expect(restaurantImporterService.importRestaurants).toHaveBeenCalledWith(url);
    });

    it('should import restaurants with default URL when no argument is provided', async () => {
      process.env.RESTAURANTS_URL =  'http://example.com/dummy-restaurants.json';

      await command.commandHandler();

      // Expect the truncateRestaurantCollection method to be called
      expect(restaurantService.truncateRestaurantCollection).toHaveBeenCalled();

      // Expect the importRestaurants method to be called with the default URL
      expect(restaurantImporterService.importRestaurants).toHaveBeenCalledWith(process.env.RESTAURANTS_URL);
    });
  });
});
