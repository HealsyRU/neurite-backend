import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Ufi } from './ufi.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUfiDTO } from './dto/create-ufi.dto';
import { MealDaysService } from 'src/meal-days/meal-days.service';
import { MealsService } from 'src/meals/meals.service';
import { UsersService } from 'src/users/users.service';

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
            console.log('Проверка 1')
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
            console.log('Проверка 3')

            const dtoMealDay = await this.mealDayRepository.getMealDayByDate(dto.date)
            console.log(dtoMealDay)
            console.log('Проверка после dtoMealDay')
        
            if(!dtoMealDay){
                //ЕСЛИ НЕТ ДНЯ ПРИЕМА ПИЩИ
                //СОЗДАЕМ ДЕНЬ И ПРИЁМ ПИЩИ
                try {

                    console.log('Проверка 4')
                    const mealDayData = await this.mealDayRepository.createMealDay({
                        date: dto.date,
                        IsCompleted: false,
                        authorId: dto.authorId
                    })
    
                    console.log('Проверка 5')
                    const mealData = await this.mealRepository.createMeal({
                        authorId: dto.authorId,
                        time: dto.time,
                        type: dto.mealType
                    })
    
                    console.log('Проверка 6')
                    await mealData.meal.$add('ufis', [ufi.id])
    
                    console.log('Проверка 7')
                    //Установка связей
                    await userData.$add('mealDays', [mealDayData.mealDay.id])
                    await mealDayData.mealDay.$add('meals', [mealData.meal.id])
                    console.log('Проверка 8')
                } catch (e) {

                    console.log(e)

                }
                
            }

            if(dtoMealDay){
                //ЕСЛИ ЕСТЬ ДЕНь ПРИЕМА ПИЩИ
                console.log('Проверка 9')
                if(dto.mealId){
                    //ЕСЛИ ЕСТЬ ПРИЕМ ПИЩИ
                    try {
                        console.log('Проверка 10')
                        const meal = await this.mealRepository.getMealById(dto.mealId)

                        console.log('Проверка 11')
                        await meal.$add('ufis', [ufi.id])

                        //await mealData.meal.$add('ufis', [ufi.id])
    
                        //console.log('Проверка 7')
                        //Установка связей
                        await userData.$add('mealDays', [dtoMealDay.mealDay.id])
                        await dtoMealDay.mealDay.$add('meals', [meal.id])

                        console.log('Проверка 12')
                    } catch (e) {
                        throw new HttpException('Возможно, приём пищи с таким ID не существует', HttpStatus.BAD_REQUEST)
                    }
                    
                }

                if(!dto.mealId){
                    //ЕСЛИ НЕТ ПРИЕМА ПИЩИ
                    console.log('Проверка 13')
                    try {
                        const mealData = await this.mealRepository.createMeal({
                            authorId: dto.authorId,
                            time: dto.time,
                            type: dto.mealType
                        })
                        console.log('Проверка 14')
            
                        await mealData.meal.$add('ufis', [ufi.id])

                        await userData.$add('mealDays', [dtoMealDay.mealDay.id])
                        await dtoMealDay.mealDay.$add('meals', [mealData.meal.id])

                    } catch (e) {
                        throw new HttpException('Ошибка создания приема пищи и/или присвоения ему ЕПП.', HttpStatus.BAD_REQUEST)
                    }
                }
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
