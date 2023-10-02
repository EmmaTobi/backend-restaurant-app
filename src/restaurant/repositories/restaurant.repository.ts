import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant, RestaurantDocument } from '../schemas/restaurant.schema';
import { Model } from 'mongoose';
import { EntityManager, getRepository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class RestaurantRepository {
  constructor(
    @InjectModel(Restaurant.name)
    private readonly model: Model<RestaurantDocument>
  ) { }
  
  async insertMany(restaurants: Restaurant[]): Promise<void> {
    await this.model.insertMany(restaurants);
  }

  async truncateRestaurantCollection() {
    await this.model.collection.drop();
  }

  async findAllPaginated(page: number, limit: number, search?: string): Promise<{ results: Restaurant[], total: number }>{
    const filter = search ? this.getFilters(search) : {};
    const results = await this.model.find(filter).skip((page - 1) * limit).limit(limit);
    const total = await this.model.countDocuments(filter);
    return { results, total };
  }

  private getFilters(search: string) {
    const compiledRegex = new RegExp(search, 'i');
    return {
      $or: [
        { name: { $regex: compiledRegex } },
        { restaurant_id: { $regex: compiledRegex } },
        { grades: { $elemMatch: { grade: { $eq: search } } } },
        { cuisine: { $regex: compiledRegex } },
        { address: { $elemMatch: { $or: [{ building: { $regex: compiledRegex } }, { street: { $regex: compiledRegex } }] } } },
      ],
    };
  }
}