/* eslint-disable prettier/prettier */

import { forwardRef, Module } from '@nestjs/common';
import { FoodUnitService } from './food-unit.service';
import { FoodUnitController } from './food-unit.controller';
import { PrismaService } from 'src/prisma.service';
import { MealDayModule } from 'src/meal-day/meal-day.module';
import { MealModule } from 'src/meal/meal.module';
import { MealService } from 'src/meal/meal.service';
import { MealDayService } from 'src/meal-day/meal-day.service';

@Module({
  providers: [FoodUnitService, PrismaService, MealService, MealDayService],
  controllers: [FoodUnitController],
  imports: [
    forwardRef(() => MealDayModule),
    forwardRef(() => MealModule)
  ]
})
export class FoodUnitModule {}
