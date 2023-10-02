import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type RestaurantDocument = Restaurant & Document;

@Schema({ timestamps: true})
export class Restaurant {
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true, _id: true })
  _id: object;

  @Prop({ type: MongooseSchema.Types.Map, required: true })
  address: {
    building: string;
    street: string;
  };

  @Prop({ type: MongooseSchema.Types.String, required: true })
  cuisine: string;

  @Prop({ type: [MongooseSchema.Types.Mixed], required: true })
  grades: {
    date: Date;
    grade: string;
    score: number;
  }[];

  @Prop({ type: MongooseSchema.Types.String, required: false })
  name: string;

  @Prop({ type: MongooseSchema.Types.String, required: true })
  restaurant_id: string;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);

RestaurantSchema.index({ name: 1 }),
RestaurantSchema.index({ restaurant_id: 1 }),
RestaurantSchema.index({ cuisine: 1 }),
RestaurantSchema.index({ grades: 1 }),
RestaurantSchema.index({ address : 1});