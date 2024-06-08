import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { Role } from 'src/roles/roles.model';
import { UserRole } from 'src/roles/user-roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { Token } from 'src/tokens/tokens.model';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { MealDay } from 'src/meal-days/meal-days.model';
import { Meal } from 'src/meals/meals.model';
import { UfiModule } from 'src/ufi/ufi.module';
import { UserMeals } from 'src/meals/user-meals.model';
import { UserUfi } from 'src/ufi/user-ufis.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRole, Token, MealDay, Meal, UserMeals, UserUfi]),
    RolesModule,
    UfiModule,
    forwardRef(() => JwtModule),
    forwardRef(() => AuthModule)
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule {}
