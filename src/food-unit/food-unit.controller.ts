/* eslint-disable prettier/prettier */

import { Body, Controller, Get, HttpCode, Param, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { FoodUnitService } from './food-unit.service';
import { CreateFoodUnitDto } from './dto/create-food-unit.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AddFoodUnitToMealDto } from './dto/add-food-unit-to-meal.dto';
import { RemoveFoodUnitFromMealDto } from './dto/remove-food-unit-from-meal.dto';
import { ChangeFavoriteFoodUnitDto } from './dto/changeFavoriteFoodUnit.dto';
import { CurrentBody } from 'src/auth/decorators/body.decorator';
import { SearchFoodUnitDto } from './dto/searchFoodUnit.dto';

@Controller('foodUnit')
export class FoodUnitController {
  constructor(private readonly foodUnitService: FoodUnitService) {}

    @Auth()
    @UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('/create')
	async createRole(
		@Body() dto: CreateFoodUnitDto,
	) {
		return this.foodUnitService.createFoodUnit(dto)
	}

	@Auth()
	@UsePipes(new ValidationPipe({ transform: true }))
    @HttpCode(200)
	@Get('/getFoodUnitsByTitle/:title')
    getRoleByValue(
		@Param('title') title: SearchFoodUnitDto['title'],
		@Query('limit') limit: SearchFoodUnitDto['limit'],
		@Query('isFavorite') isFavorite: SearchFoodUnitDto['isFavorite'],
		@CurrentBody('id') bodyId: string,
	) {
       return this.foodUnitService.getFoodUnitsByTitle(title, bodyId, isFavorite, limit)
    }

	@Auth()
    @UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('/addFoodUnitToMeal')
	async addFoodUnitToMeal(
		@Body() dto: AddFoodUnitToMealDto,
	) {
		return this.foodUnitService.addFoodUnitToMeal(dto)
	}

	@Auth()
    @UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('/removeFoodUnitFromMeal')
	async removeFoodUnitFromMeal(
		@Body() dto: RemoveFoodUnitFromMealDto,
	) {
		return this.foodUnitService.removeFoodUnitFromMeal(dto)
	}

	@Auth()
    @HttpCode(200)
	@Get('/getFoodUnitById/:id')
	async getFoodUnitById(@Param('id') id: string) {
		return this.foodUnitService.getFoodUnitById(id)
	}

	@Auth()
    @HttpCode(200)
	@Post('/changeFavorite')
	async changeFavoriteFoodUnit(
		@Body() dto: ChangeFavoriteFoodUnitDto,
		@CurrentBody('id') bodyId: string,
	) {
		return this.foodUnitService.changeFavoriteFoodUnit(dto.foodUnitId, bodyId, dto.likedId)
	}
}
