/* eslint-disable prettier/prettier */

import { Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { FoodUnitModule } from './food-unit/food-unit.module';
import { FoodCategoryModule } from './food-category/food-category.module';
import { MealDayModule } from './meal-day/meal-day.module';
import { MealModule } from './meal/meal.module';
import { PortionModule } from './portion/portion.module';
import { MealFoodUnitModule } from './meal-food-unit/meal-food-unit.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        AccountModule,
        AuthModule,
        RoleModule,
        FoodUnitModule,
        FoodCategoryModule,
        MealDayModule,
        MealModule,
        PortionModule,
        MealFoodUnitModule,
    ],
})
export class AppModule {}