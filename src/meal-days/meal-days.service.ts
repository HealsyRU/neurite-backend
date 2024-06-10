import { Injectable } from '@nestjs/common';
import { MealDay } from './meal-days.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMealDayDTO } from './dto/create-meal-day.dto';
import { Op, where } from 'sequelize';
import { User } from 'src/users/users.model';
import { GetMealDayByDateDTO } from './dto/get-meal-by-date.dto';

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

    async getMealDayByDate(dto: GetMealDayByDateDTO) {
        //console.log('Дата: ' + date)
        const idUser = 0
        try {
            const mealDay = await this.mealDayRepository.findOne({ where: { [Op.and]: [{ date: dto.date }, { authorId: dto.userId }]}, include: {all: true, nested: true}})
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
