/* eslint-disable prettier/prettier */
import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { MealService } from './meal.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentBody } from 'src/auth/decorators/body.decorator';

@Controller('meal')
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @Auth()
  @HttpCode(200)
	@Get('/getMealUnitById/:id')
	async getMealUnitById(
    @Param('id') id: string,
    @CurrentBody('id') bodyId: string,
  ) {
		return this.mealService.getMealUnitById(id, bodyId)
	}
}
