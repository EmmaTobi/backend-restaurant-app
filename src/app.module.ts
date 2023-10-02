import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RestaurantModule } from './restaurant/restaurant.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsoleModule } from 'nestjs-console';

@Module({
  imports: [
    ConsoleModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('DATABASE_URL')
      }),
      inject: [ConfigService],
    }),
    RestaurantModule
  ],
})
export class AppModule {
  constructor(private readonly configService: ConfigService) {
    console.log("AppModule");
    console.log(configService.get('DATABASE_URL'));
  };
}
