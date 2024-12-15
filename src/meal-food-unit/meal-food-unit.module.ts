import { Module } from '@nestjs/common';
import { MealFoodUnitService } from './meal-food-unit.service';
import { MealFoodUnitController } from './meal-food-unit.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MealFoodUnitController],
  providers: [MealFoodUnitService, PrismaService],
})
export class MealFoodUnitModule {}
