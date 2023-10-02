import { Module } from '@nestjs/common';
import { RestaurantImporterServiceImpl } from './services/restaurant-importer.service';
import { RestaurantImportCommand } from './commands/restaurant-importer.command';
import { RestaurantRepository } from './repositories/restaurant.repository';
import { Restaurant, RestaurantSchema } from './schemas/restaurant.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { RestaurantController } from './controllers/restaurant.controller';
import { RestaurantServiceImpl } from './services/restaurant.service';

@Module({
  imports: [
      HttpModule,
      MongooseModule.forFeature([
      {
        name: Restaurant.name,
        schema: RestaurantSchema,
      },
    ])
  ],
  controllers: [
    RestaurantController
  ],
  providers: [
    {
      provide: 'RestaurantService',
      useClass: RestaurantServiceImpl
    },
    {
      provide: 'RestaurantImporterService',
      useClass: RestaurantImporterServiceImpl
    },
    RestaurantImportCommand,
    RestaurantRepository
  ],
  exports: ['RestaurantService', 'RestaurantImporterService' ],
})
export class RestaurantModule {}
