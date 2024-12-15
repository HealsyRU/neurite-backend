/* eslint-disable prettier/prettier */

import { Body, Controller, Get, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { FoodCategoryService } from './food-category.service';
import { CreateFoodCategoryDto } from './dto/create-food-category.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('foodCategory')
export class FoodCategoryController {
  constructor(private readonly foodCategoryService: FoodCategoryService) {}

  @Auth()
  @UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('/create')
	async createFoodCategory(
		@Body() dto: CreateFoodCategoryDto,
	) {
		return this.foodCategoryService.createFoodCategory(dto)
	}

  @Auth()
  @HttpCode(200)
  @Get('/getAll')
  async getAllFoodCategories() {
    return this.foodCategoryService.getAllFoodCategories()
  }
}
