/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { MealDayService } from './meal-day.service';
import { MealDayController } from './meal-day.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [MealDayService, PrismaService],
  controllers: [MealDayController],
  exports: [
    MealDayService
  ]
})
export class MealDayModule {}
