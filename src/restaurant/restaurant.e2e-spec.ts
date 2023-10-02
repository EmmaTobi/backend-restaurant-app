import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../app.module';

describe('RestaurantController (Integration Tests)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/restaurants (GET) should return a paginated list of restaurants', async () => {
    // Prepare a request to the endpoint
    const response = await request(app.getHttpServer())
      .get('/restaurants')
      .query({ page: 1, limit: 10 });

    // Assert the response status code
    await expect(response.status).toBe(HttpStatus.OK);

    // Assert the response body structure
    await expect(response.body).toHaveProperty('results');
    await expect(response.body).toHaveProperty('total');
  });
});