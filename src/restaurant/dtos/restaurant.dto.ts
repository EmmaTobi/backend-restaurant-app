import { ApiProperty } from '@nestjs/swagger';

export class RestaurantDto {
  @ApiProperty({ type: String })
  _id: string;

  @ApiProperty({
    type: Object,
    description: 'The address of the restaurant',
    example: { building: '123', street: 'Main Street' },
  })
  address: {
    building: string;
    street: string;
  };

  @ApiProperty({ type: String })
  cuisine: string;

  @ApiProperty({
    type: [
      Object,
      {
        date: { type: Date, description: 'The date of the grade' },
        grade: { type: String, description: 'The grade received' },
        score: { type: Number, description: 'The score received' },
      },
    ],
    description: 'A list of grades received by the restaurant',
    example: [
      { date: '2023-09-30', grade: 'A', score: 90 },
      { date: '2023-09-25', grade: 'B', score: 85 },
    ],
  })
  grades: {
    date: Date;
    grade: string;
    score: number;
  }[];

  @ApiProperty({ type: String, required: false })
  name?: string;

  @ApiProperty({ type: String })
  restaurant_id: string;
}