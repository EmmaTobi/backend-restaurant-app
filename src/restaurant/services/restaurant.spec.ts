import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantService } from './restaurant.interface';
import { RestaurantRepository } from '../repositories/restaurant.repository';
import { Restaurant } from '../schemas/restaurant.schema';
import { dummyRestaurants } from '../dummy-restaurant';
import { RestaurantServiceImpl } from './restaurant.service';

describe('RestaurantService', () => {
  let service: RestaurantService;
  let restaurantRepository: RestaurantRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'RestaurantService',
          useClass: RestaurantServiceImpl
        },
        {
          provide: RestaurantRepository,
          useValue: {
            findAllPaginated: jest.fn(),
            insertMany: jest.fn(),
            truncateRestaurantCollection: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RestaurantService>('RestaurantService');
    restaurantRepository = module.get<RestaurantRepository>(RestaurantRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('searchPaginated', () => {
    it('should call findAllPaginated with the correct arguments', async () => {
        const page = 1;
        const limit = 10;
        const search = dummyRestaurants[0].cuisine;
        const expectedResult = {
            results: [dummyRestaurants[0]],
            total: 1, 
        };

        const spiedRestaurantRepository = jest.spyOn(restaurantRepository, 'findAllPaginated').mockResolvedValue(expectedResult);

        const result = await service.searchPaginated(page, limit, search);

        expect(result).toEqual(expectedResult);
        expect(spiedRestaurantRepository).toHaveBeenCalledWith(page, limit, search);
    });
  });

  describe('insertManyRestaurants', () => {
    it('should call insertMany with the correct arguments', async () => {
      const restaurants: Restaurant[] = dummyRestaurants;

      await service.insertManyRestaurants(restaurants);

      expect(restaurantRepository.insertMany).toHaveBeenCalledWith(restaurants);
    });
  });
});