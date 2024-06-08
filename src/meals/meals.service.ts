import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Meal } from './meals.model';
import { CreateMealDTO } from './dto/create-meal.dto';
import { UfiService } from 'src/ufi/ufi.service';


@Injectable()
export class MealsService {
    constructor(@InjectModel(Meal) 
        private mealRepository: typeof Meal
    ) {}

    async createMeal(dto: CreateMealDTO) {

        const meal = await this.mealRepository.create({
            type: dto.type,
            authorId: dto.authorId,
            time: dto.time
        })

        const mealData = {
            meal: meal
        }

        return mealData

    }

    async getMealById(StringId: string) {
        const id = Number(StringId)
        const ufi = await this.mealRepository.findOne({where: {id}, include: {all: true}})

        return ufi
    }

    
}
