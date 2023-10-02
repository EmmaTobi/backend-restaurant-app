import { Controller, Get, Inject, Query } from '@nestjs/common';
import { Restaurant } from '../schemas/restaurant.schema';
import { RestaurantService } from '../services/restaurant.interface';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RestaurantDto } from '../dtos/restaurant.dto';

@ApiTags('restaurants')
@Controller('restaurants')
export class RestaurantController {
    constructor(@Inject('RestaurantService')private readonly restaurantService: RestaurantService) {}

    @ApiOperation({
        summary: 'Returns a paginated list of restaurants.',
    })
    @ApiResponse({ status: 200, type: RestaurantDto })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    @Get()
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number', example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page', example: 10 })
    @ApiQuery({ name: 'search', required: false, type: String, description: 'Search keyword', example: 'burger' })
    async paginate(@Query('page') page = 1, @Query('limit') limit = 10, @Query('search') search?: string):
        Promise<{ results: Restaurant[], total: number }>
    {
        return await this.restaurantService.searchPaginated(page, limit, search);
    }
}