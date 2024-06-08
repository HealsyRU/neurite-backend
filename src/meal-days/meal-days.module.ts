import { forwardRef, Module } from '@nestjs/common';
import { MealDaysService } from './meal-days.service';
import { MealDaysController } from './meal-days.controller';
import { MealDay } from './meal-days.model';
import { User } from 'src/users/users.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Meal } from 'src/meals/meals.model';
import { Ufi } from 'src/ufi/ufi.model';
import { UfiModule } from 'src/ufi/ufi.module';

@Module({
  providers: [MealDaysService],
  controllers: [MealDaysController],
  imports: [
    SequelizeModule.forFeature([User, MealDay, Meal, Ufi]),
    forwardRef(() => UfiModule),
  ],
  exports: [
    MealDaysService
  ]

})
export class MealDaysModule {}
