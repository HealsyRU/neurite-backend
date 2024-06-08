import { ConfigurableModuleBuilder, Module } from "@nestjs/common";
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from "./users/users.model";
import { UfiModule } from './ufi/ufi.module';
import { Ufi } from "./ufi/ufi.model";
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/roles.model";
import { UserRole } from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { TokensModule } from './tokens/tokens.module';
import { Token } from "./tokens/tokens.model";
import { MealDaysModule } from './meal-days/meal-days.module';
import { MealDay } from "./meal-days/meal-days.model";
import { MealsModule } from './meals/meals.module';
import { Meal } from "./meals/meals.model";
import { UserUfi } from "./ufi/user-ufis.model";
import { MealDayMeals } from "./meal-days/mealDay-meals.model";
import { UserMealDays } from "./meal-days/user-mealDays.model";
import { MealUfi } from "./meals/meal-ufis.model";
import { UserMeals } from "./meals/user-meals.model";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        SequelizeModule.forRoot({
          dialect: 'postgres',
          host: process.env.POSTGRES_HOST,
          port: Number(process.env.POSTGRES_PORT),
          username: process.env.POSTGRES_USERNAME,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB,
          models: [User, Ufi, Role, UserRole, Token, MealDay, UserUfi, Meal, MealDayMeals, UserMealDays, MealUfi, UserMeals],
          autoLoadModels: true,
          dialectOptions: {
            ssl: {
              require: true,
              rejectUnauthorized: false 
            }
          },
        }),
        UsersModule,
        UfiModule,
        RolesModule,
        AuthModule,
        TokensModule,
        MealDaysModule,
        MealsModule
      ],
})
export class AppModule {}