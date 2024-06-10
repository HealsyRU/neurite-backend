import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMealDayDTO } from './dto/create-meal-day.dto';
import { MealDaysService } from './meal-days.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MealDay } from './meal-days.model';
import { GetMealDayByDateDTO } from './dto/get-meal-by-date.dto';

@Controller('meal-days')
export class MealDaysController {

    constructor(private mealDayService: MealDaysService) {}

    //@ApiResponse({ status: 200, type: AuthDTO})
    @ApiOperation({ summary: 'Создание нового MealDay.'})
    @Post('/createMealDay')
    async createUfi(
        @Body() mealDayDTO: CreateMealDayDTO
    ) {
        const ufiData = await this.mealDayService.createMealDay(mealDayDTO)
        return ufiData;
    }

    @ApiOperation({ summary: 'Получение MealDay по ID.'})
    @ApiResponse({ status: 200, type: [MealDay]})
    @Get('/id/:id')
    getMealDayById(@Param('id') id: string) {
        return this.mealDayService.getMealDayById(id)
    }

    @ApiOperation({ summary: 'Получение дня приема пищи по дате.'})
    @ApiResponse({ status: 200, type: [MealDay]})
    @Post('/getMealDayByDate')
    getMealDayByDate(@Body() getMealDayDTO: GetMealDayByDateDTO) {
        //console.log('Дата: ' + date)
        return this.mealDayService.getMealDayByDate(getMealDayDTO)
    }
}
