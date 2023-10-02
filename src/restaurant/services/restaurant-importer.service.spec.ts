import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantImporterService } from './restaurant-importer.interface';
import { RestaurantService } from './restaurant.interface';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { dummyRestaurants } from '../dummy-restaurant';
import { Restaurant } from '../schemas/restaurant.schema';
import { AxiosResponse } from 'axios';
import { RestaurantImporterServiceImpl } from './restaurant-importer.service';

describe('RestaurantImporterService', () => {
  let service: RestaurantImporterService;
  let restaurantService: RestaurantService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        providers: [
            {
                provide: 'RestaurantImporterService',
                useClass: RestaurantImporterServiceImpl
            },
            {
                provide: 'RestaurantService',
                useValue: {
                    insertManyRestaurants: jest.fn(),
                },
            },
            {
                provide: HttpService,
                useValue: {
                    get: jest.fn(),
                },
            },
        ],
    }).compile();

    service = module.get<RestaurantImporterService>('RestaurantImporterService');
    restaurantService = module.get<RestaurantService>('RestaurantService');
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('importRestaurants', () => {
        it('should import restaurants successfully', async () => {
            const url = 'http://example.com/restaurants';
            const sampleData: Restaurant[] = dummyRestaurants;
            
            const axiosResponse: AxiosResponse<Restaurant[]> = {
                data: sampleData,
                status: 200,
                statusText: 'OK',
                headers: {},
                config: {
                    headers: undefined
                }
            };

            // Mock the HTTP service's get method to return a successful response
            const spiedHttpServiceGet = jest.spyOn(httpService, 'get').mockReturnValueOnce(of(axiosResponse));

            // Mock the restaurantService's insertManyRestaurants method
            const spiedRestaurantServiceInsertManyRestaurants = jest.spyOn(restaurantService, 'insertManyRestaurants').mockResolvedValueOnce();

            await service.importRestaurants(url);

            // Expect the insertManyRestaurants method to be called
            expect(spiedRestaurantServiceInsertManyRestaurants).toHaveBeenCalledWith(sampleData);
        
            spiedHttpServiceGet.mockReset();
            spiedHttpServiceGet.mockRestore();
            spiedRestaurantServiceInsertManyRestaurants.mockReset();
            spiedRestaurantServiceInsertManyRestaurants.mockRestore();
        });

        it('should handle an error response', async () => {
            const url = 'http://example.com/restaurants';

            const axiosError = {
                response: {
                status: 404,
                data: 'Not Found',
                },
            };

            // Mock the HTTP service's get method to return an error response
            const spiedHttpServiceGet =  jest.spyOn(httpService, 'get').mockImplementation(
                    (s) =>  throwError(() => axiosError)
            );

            // spyOn to mock the logger's error method
            const spiedLoggerError = jest.spyOn(service['logger'], 'error');

            // Expect an error message to be logged
            await service.importRestaurants(url);
            expect(spiedLoggerError).toHaveBeenCalledWith(axiosError.response.data);
        
            spiedHttpServiceGet.mockReset();
            spiedHttpServiceGet.mockRestore();
        });
      
    });
});
