import { forwardRef, Module } from '@nestjs/common';
import { MealsService } from './meals.service';
import { MealsController } from './meals.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Ufi } from 'src/ufi/ufi.model';
import { Meal } from './meals.model';
import { User } from 'src/users/users.model';
import { MealDay } from 'src/meal-days/meal-days.model';
import { UserMeals } from './user-meals.model';
import { MealUfi } from './meal-ufis.model';
import { UfiModule } from 'src/ufi/ufi.module';

@Module({
  providers: [MealsService],
  controllers: [MealsController],
  imports: [
    SequelizeModule.forFeature([Ufi, Meal, User, MealDay, UserMeals, MealUfi]),
    forwardRef(() => UfiModule)
  ],
  exports: [
    MealsService
  ]
})
export class MealsModule {}
