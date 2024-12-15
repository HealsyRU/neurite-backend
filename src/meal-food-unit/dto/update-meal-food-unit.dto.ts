import { PartialType } from '@nestjs/swagger';
import { CreateMealFoodUnitDto } from './create-meal-food-unit.dto';

export class UpdateMealFoodUnitDto extends PartialType(CreateMealFoodUnitDto) {}
