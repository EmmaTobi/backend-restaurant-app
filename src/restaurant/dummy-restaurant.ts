import { Restaurant } from "src/restaurant/schemas/restaurant.schema";

export const dummyRestaurants = <Restaurant[]>[
  {
    _id: Object('1'),
    address: {
      building: '123',
      street: 'Main Street',
    },
    cuisine: 'Italian',
    grades: [
      { date: new Date('2023-09-30'), grade: 'A', score: 90 },
      { date: new Date('2023-09-25'), grade: 'B', score: 85 },
    ],
    name: 'Italian Delight',
    restaurant_id: '1001',
  },
  {
    _id: Object('2'),
    address: {
      building: '456',
      street: 'Oak Avenue',
    },
    cuisine: 'Mexican',
    grades: [
      { date: new Date('2023-09-28'), grade: 'A', score: 88 },
      { date: new Date('2023-09-23'), grade: 'B', score: 84 },
    ],
    name: 'MexiGrill',
    restaurant_id: '1002',
  }
];