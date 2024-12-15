/* eslint-disable prettier/prettier */

import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { MealDayService } from './meal-day.service';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('meal_day')
export class MealDayController {
    constructor(private readonly mealDayService: MealDayService) {}

    @Auth()
    @HttpCode(200)
    @Get('/getMealDayByDate/:bodyId/:date')
    getMealDayDataByDate(@Param('bodyId') bodyId: string, @Param('date') date: string) {
        console.log('Срабатывание поиска дня')
        return this.mealDayService.getMealDayDataByDate(date, bodyId)
    }
}
