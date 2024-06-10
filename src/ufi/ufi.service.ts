import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Ufi } from './ufi.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUfiDTO } from './dto/create-ufi.dto';
import { MealDaysService } from 'src/meal-days/meal-days.service';
import { MealsService } from 'src/meals/meals.service';
import { UsersService } from 'src/users/users.service';
import { Op } from 'sequelize';
import { AddUfiToMealDTO } from './dto/add-ufi-to-meal.dto';

@Injectable()
export class UfiService {
    
    constructor(@InjectModel(Ufi) 
        private ufiRepository: typeof Ufi,
        private mealDayRepository: MealDaysService,
        private mealRepository: MealsService,
        private userRepository: UsersService

    ) {}


    //СЕГОДНЯШНЯЯ ДАТА ДЛЯ СОЗДАНИЯ
    async createUfi(dto: CreateUfiDTO) {
        try {
            console.log(dto)
            const userData = await this.userRepository.getUserById(dto.authorId)

            console.log('Создана UserData')
            const ufi = await this.ufiRepository.create(
                {
                    authorId: dto.authorId,
                    type: dto.type,
                    isFree: dto.isFree,
                    title: dto.title,
                    weight: dto.weight,
                    ccal: dto.ccal,
                    protein: dto.protein,
                    fat: dto.fat,
                    carb: dto.carb
                }
            )
            console.log('Проверка 2')
            console.log(dto.authorId)

            try {
                console.log('ID UFI: ' + userData.id)
                await ufi.$add('users', [userData.id])
            } catch (e) {
                console.log(e)
            }
            

            const ufiData = {
                ufi: ufi
            }

            return ufiData

        } catch (e) {
            console.log(e)
            throw new HttpException('Неуточненная ошибка создания ЕПП', HttpStatus.BAD_REQUEST)
        }
    }

    async addUfiToMeal(dto: AddUfiToMealDTO) {
        try {
            //находим пользователя, приславшего запрос
            const userData = await this.userRepository.getUserById(dto.userId)
            if(!userData.id){
                throw new HttpException('[ADDUFITOMEAL]: UserData не найдена. ', HttpStatus.BAD_REQUEST)
            }
            console.log('[ADDUFITOMEAL]: userData получена. userId ' + userData.id)
            //ищем UFI
            const ufiData = await this.ufiRepository.findOne({where: {id: dto.ufiId}, include: {all: true}})
            if(!ufiData.id){
                throw new HttpException('[ADDUFITOMEAL]: UfiData не найдена. ', HttpStatus.BAD_REQUEST)
            }
            console.log('[ADDUFITOMEAL]: ufiData получена. ufiId ' + ufiData.id)
            //ищем MealDay
            const dtoMealDay = await this.mealDayRepository.getMealDayByDate({ date: dto.date, userId: dto.userId })
            if(!dtoMealDay) {
                const mealDayData = await this.mealDayRepository.createMealDay({
                    date: dto.date,
                    IsCompleted: false,
                    authorId: dto.userId
                })
                const mealData = await this.mealRepository.createMeal({
                    authorId: dto.userId,
                    time: dto.time,
                    type: dto.type
                })
                //Добавляем в прием пищи UFI
                await mealData.meal.$add('ufis', [ufiData.id])
                //Установка связей
                await userData.$add('mealDays', [mealDayData.mealDay.id])
                await mealDayData.mealDay.$add('meals', [mealData.meal.id])
            }
            if(dtoMealDay) {
                if(dto.mealId){
                    try {
                        const meal = await this.mealRepository.getMealById(String(dto.mealId))
                        await meal.$add('ufis', [ufiData.id])
                        //Установка связей
                        await userData.$add('mealDays', [dtoMealDay.mealDay.id])
                        await dtoMealDay.mealDay.$add('meals', [meal.id])
                    } catch (e) {
                        throw new HttpException('Возможно, приём пищи с таким ID не существует', HttpStatus.BAD_REQUEST)
                    }
                }
                if(!dto.mealId){
                    try {
                        const mealData = await this.mealRepository.createMeal({
                            authorId: dto.userId,
                            time: dto.time,
                            type: dto.type
                        })
                        await mealData.meal.$add('ufis', [ufiData.id])
                        await userData.$add('mealDays', [dtoMealDay.mealDay.id])
                        await dtoMealDay.mealDay.$add('meals', [mealData.meal.id])
                    } catch (e) {
                        throw new HttpException('Ошибка создания приема пищи и/или присвоения ему ЕПП.', HttpStatus.BAD_REQUEST)
                    }

                }
            }

            const ufiNewData = {
                ufi: ufiData
            }

            return ufiNewData

        } catch (e) {
            throw new HttpException('Неуточненная ошибка добавления ЕПП', HttpStatus.BAD_REQUEST)
        }
    }

    async getAllUfiByTitle(title: string) {
        try {
            const ufis = await this.ufiRepository.findAll({ where: { title: { [Op.iLike]: `%${title}%`}}})
            return ufis
        } catch (e) {
            console.log('Ошибка нахождения всех UFI по Title')
        }
    }

    async getUfiById(idFromClient: number) {
        const id = Number(idFromClient)
        const ufi = await this.ufiRepository.findOne({where: {id}, include: {all: true}})

        return ufi
    }

    async removeUfiFromMeal(ufiIdFromClient: number, mealIdFromClient: number) {
        try {
            const ufiData = await this.ufiRepository.findOne({where: {id: ufiIdFromClient}})
            const mealData = await this.mealRepository.getMealById(String(mealIdFromClient))

            //ЕСЛИ МЫ НАШЛИ НУЖНЫЙ UFI
            if(ufiData){
                await mealData.$remove('ufis', [ufiData.id])
                await console.log('[SUCCESS]: Ufi removed. ID: ' + ufiData.id)
                //ЕСЛИ ПРИЕМ ПИЩИ ПУСТОЙ, УДАЛИМ ЕГО НАХЕР
                await console.log('[MEALDATA IS]:')
                const newMealData = await this.mealRepository.getMealById(String(mealIdFromClient))
                await console.log(newMealData.ufis)
                if(!newMealData.ufis.length){
                    console.log('[DESTROY]: Meal is removing with ID ' + newMealData.id)
                    await newMealData.destroy()
                    console.log('[DESTROY]: Meal is removed.')
                }
            }

            const ufi = {
                ufi: ufiData
            }

            return ufi
            

        } catch (e) {
            console.log(e)
        }
    }

    //async getAllUfiByMealDayId(mealDayId: number) {
        //console.log('[ID]: ' + mealDayId)
        //const ufis = await this.ufiRepository.findAll({where: {mealDayId}, include: { all: true }});

        //const ufisData = {
            //ufis: ufis
        //}

        //return ufisData;
    //}

}
