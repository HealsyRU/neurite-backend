/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { MealFoodUnitService } from './meal-food-unit.service';
import { GetMealFoodUnitByIdDto } from './dto/getMealFoodUnitById.dto';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentBody } from 'src/auth/decorators/body.decorator';
import { UpdateFoodQuantityDto } from './dto/updateFoodQuantity.dto';

@Controller('mealFoodUnit')
export class MealFoodUnitController {
  constructor(private readonly mealFoodUnitService: MealFoodUnitService) {}

  @Auth()
	@HttpCode(200)
  @Get('/:id')
  findOne(
    @CurrentUser('id') userId: string,
    @CurrentBody('ccalNorm') ccalNorm: number, //Защита от несанкционированного вмешательства
    @Param('id') id: GetMealFoodUnitByIdDto['mealFoodUnitId'],
    //@Query('name') name: string,
  ) {
    return this.mealFoodUnitService.findOne(id, userId, ccalNorm);
  }

  //Функция для замены порции/множителя
  @Auth()
	@HttpCode(200)
	@Post('/updateFoodQuantity')
  async updateFoodQuantity(
    @Body() dto: UpdateFoodQuantityDto,
    @CurrentUser('id') userId: string,
    @CurrentBody('ccalNorm') ccalNorm: number,
  ) {
    return this.mealFoodUnitService.updateFoodQuantity(dto, userId, ccalNorm)
  }

  //@Delete(':id')
  //remove(@Param('id') id: string) {
    //return this.mealFoodUnitService.remove(id);
  //}
}
