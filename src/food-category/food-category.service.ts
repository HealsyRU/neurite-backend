/* eslint-disable prettier/prettier */

import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateFoodCategoryDto } from './dto/create-food-category.dto';

@Injectable()
export class FoodCategoryService {
    constructor(
        private prisma: PrismaService
    ){}

    async createFoodCategory(dto: CreateFoodCategoryDto) {

        const checkCategory = await this.prisma.foodCategory.findUnique({
            where: {
                title: dto.title
            }
        })

        if(checkCategory) throw new BadRequestException('Данная категория еды уже существует')

        const foodCategory  = await this.prisma.foodCategory.create({
            data: {
                title: dto.title
            }
        })

        return {
            foodCategory: foodCategory
        }

    }

    async getAllFoodCategories(){
        const categories = await this.prisma.foodCategory.findMany()

        return {
            foodCategories: categories
        }
    }
}
