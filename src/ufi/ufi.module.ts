import { forwardRef, Module } from '@nestjs/common';
import { UfiController } from './ufi.controller';
import { UfiService } from './ufi.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Ufi } from './ufi.model';
import { Meal } from 'src/meals/meals.model';
import { User } from 'src/users/users.model';
import { MealDay } from 'src/meal-days/meal-days.model';
import { MealDaysModule } from 'src/meal-days/meal-days.module';
import { MealsModule } from 'src/meals/meals.module';
import { UsersModule } from 'src/users/users.module';
import { UserUfi } from './user-ufis.model';
import { MealUfi } from 'src/meals/meal-ufis.model';

@Module({
  controllers: [UfiController],
  providers: [UfiService],
  imports: [
    SequelizeModule.forFeature([Ufi, Meal, User, MealDay, UserUfi, MealUfi]),
    MealDaysModule,
    forwardRef(() => UsersModule),
    MealsModule
  ],
  exports: [
    UfiService
  ]
})
export class UfiModule {}
