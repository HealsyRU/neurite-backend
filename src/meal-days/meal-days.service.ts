import { Injectable } from '@nestjs/common';
import { MealDay } from './meal-days.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMealDayDTO } from './dto/create-meal-day.dto';

@Injectable()
export class MealDaysService {
    constructor(@InjectModel(MealDay) 
        private mealDayRepository: typeof MealDay
    ) {}

    async createMealDay(dto: CreateMealDayDTO) {
        const mealDay = await this.mealDayRepository.create(
            {
                authorId: dto.authorId, 
                date: dto.date
            }
        )

        const mealDayData = {
            mealDay: mealDay
        }

        return mealDayData

    }

    async getMealDayById(idFromClient: string) {
        const id = Number(idFromClient)
        const mealDay = await this.mealDayRepository.findOne({where: {id}, include: {all: true, nested: true}})

        return mealDay
    }

    async getMealDayByDate(date: string) {
        //console.log('Дата: ' + date)
        try {
            const mealDay = await this.mealDayRepository.findOne({where: {date}, include: {all: true, nested: true}})
            //console.log('БЛЯТЬ')
            //console.log(mealDay)
            if(mealDay){
                const mealDayData = {
                    mealDay: mealDay
                }
                //console.log('data is:')
                //console.log(mealDayData)
    
                return mealDayData
            }

        } catch (e) {
            //console.log('Ошибка!:')
            console.log(e)

        }
    }
}
