/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateFoodUnitDto } from './dto/create-food-unit.dto';
import { MealDayService } from 'src/meal-day/meal-day.service';
import { MealService } from 'src/meal/meal.service';
import { AddFoodUnitToMealDto } from './dto/add-food-unit-to-meal.dto';
import { RemoveFoodUnitFromMealDto } from './dto/remove-food-unit-from-meal.dto';

@Injectable()
export class FoodUnitService {
    constructor(
        private prisma: PrismaService,
        private mealDayService: MealDayService,
        private mealService: MealService,
    ){}


    async getFoodUnitById(id: string) {
        try {
            console.log('Срабатывание поиска: ' + Date.now())
            const foodUnit = await this.prisma.foodUnit.findUnique({
                where: {
                    id
                },
                include: {
                    nutrientSchema: true,
                    foodCategories: true,
                    foodPortions: {
                        include: {
                            foodPortionCategory: true
                        }
                    }
                }
            })
    
            if(!foodUnit) throw new NotFoundException('Продукт не был найден')
    
            return {
                foodUnit: foodUnit
            }

        } catch {
            throw new NotFoundException('Ошибка при поиске продукта')
        }
    }
    
    async createFoodUnit(dto: CreateFoodUnitDto) {

        try {
            const checkAuthorBody = await this.prisma.body.findUnique({
                where: {
                    id: dto.userId
                }
            })
    
            if(!checkAuthorBody) throw new NotFoundException('Автор для продукта не найден')
    
            const foodUnit = await this.prisma.foodUnit.create({
                data: {
                    authorId: dto.userId,
                    title: dto.title,
                    barcode: dto.barcode,
                    foodCategories: {
                        connect: {
                            id: dto.foodCategoryId
                        }
                    },
                    foodPortions: {
                        create: {
                            measure: dto.measure,
                            quantity: dto.quantity,
                            foodPortionCategory: {
                                connect: {
                                    id: dto.portionCategoryId
                                }
                            }
                        }
                    },
                    nutrientSchema: {
                        create: {
                            energy: dto.energy,
                            protein: dto.protein,
                            fat: dto.fat,
                            carb: dto.carb,
                        }
                    }
                }
            })
    
            return {
                foodUnit: foodUnit
            }

        } catch (e) {
            console.log(e)
        }
    }

    async getFoodUnitsByTitle(title: string, bodyId: string, isFavorite: string, limit: string) {

        const QueryOptions = () => {
            const isFavoriteOption = isFavorite === 'true' ? {BodyFavoriteFoodUnits: { some: { bodyId: bodyId }}} : {}
            const limitOption = limit ? { take: Number(limit) } : { take: 10 }
            return { isFavoriteOption, limitOption }
        }

        console.log(`Найдены продукты: лимит - ${limit}, любимые?-${isFavorite}`)
        const foodUnits = await this.prisma.foodUnit.findMany({
            where: {
                title: {
                    contains: title,
                    mode: 'default',
                },
                ...QueryOptions().isFavoriteOption
            },
            ...QueryOptions().limitOption,
            include: {
                nutrientSchema: true,
                foodCategories: true,
                foodPortions: {
                    include: {
                        foodPortionCategory: true
                    }
                },
                BodyFavoriteFoodUnits: {
                    where: {
                        bodyId: bodyId
                    },
                    select: {
                        id: true,
                        bodyId: true,
                        foodUnitId: true
                    }
                }
            }
        })

        return {
            foodUnits: foodUnits
        }
    }

    //
    async addFoodUnitToMeal(
        dto: AddFoodUnitToMealDto
    ) {
        //Проверяем, есть ли вообще пища, которую собираемся добавлять
        const foodUnit = await this.prisma.foodUnit.findUnique({
            where: {
                id: dto.foodUnitId
            }
        })

        if(!foodUnit) throw new NotFoundException('Не найден продукт, который необходимо добавить')

        console.log('[ADD-FOODUNIT]: Найден Food Unit')
        //Поиск, есть ли текущий MealDay
        const userMealDay = await this.prisma.mealDay.findFirst({
            where: {
                bodyId: dto.userId,
                date: dto.mealDayDate
            },
            include: {
                mealUnits: true
            }
        })

        console.log('[ADD-FOODUNIT]: Произошел поиск MealDay')

        if(userMealDay){
            console.log('[ADD-FOODUNIT]: MealDay найден')
            //MealDay присутствует
            //Проверяем, есть ли приём пищи
            console.log('[ADD-FOODUNIT]: Начат поиск mealDayUnit c ID: ' + dto.mealDayUnitId)

            //СДЕЛАТЬ ЗАЩИТУ, ПОИСК ПО ЮЗЕР АЙДИ
            const mealDayUnit = await this.prisma.mealUnit.findUnique({
                where: {
                    id: dto.mealDayUnitId,
                }
            })

            console.log('[ADD-FOODUNIT]: Произошел поиск приема пищи')

            if(mealDayUnit){
                //UserMeal присутствует (ПП есть)
                console.log('[ADD-FOODUNIT]: Прием пищи найден')

                //НАША ЗАДАЧА - ПРИВЯЗАТЬ ПОРЦИЮ К НАШЕМУ MEAL И ВСЕ!!!
                if(dto.quantity && !dto.foodPortionId) {

                    const mealUnit = await this.prisma.mealUnit.update({
                        where: {
                            id: mealDayUnit.id
                        },
                        data: {
                            meal: {
                                update: {
                                    mealFoodUnits: {
                                        create: {
                                            multiplier: dto.quantity,
                                            foodUnit: {
                                                connect: {
                                                    id: dto.foodUnitId
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    })

                    console.log('[ADD-FOODUNIT]: Связан MealUnit через Meal в режиме MULTIPLIER без указания FOOD PORTION, ' + mealDayUnit.mealId)

                    if(!mealUnit) throw new NotFoundException('Не найден MealUnit')

                } else if (dto.foodPortionId) {
                    const mealUnit = await this.prisma.mealUnit.update({
                        where: {
                            id: mealDayUnit.id
                        },
                        data: {
                            meal: {
                                update: {
                                    mealFoodUnits: {
                                        create: {
                                            multiplier: dto.quantity,
                                            portion: {
                                                connect: {
                                                    id: dto.foodPortionId
                                                }
                                            },
                                            foodUnit: {
                                                connect: {
                                                    id: dto.foodUnitId
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    })

                    console.log('[ADD-FOODUNIT]: Связан MealUnit через Meal с найденной FoodPortion' + mealDayUnit.mealId)

                    if(!mealUnit) throw new NotFoundException('Не найден MealUnit')
                }

                

                
            }

            if(!mealDayUnit) {
                console.log('[ADD-FOODUNIT]: Прием пищи не найден')
                //ПРИЕМ ПИЩИ НЕ НАЙДЕН, СОЗДАЕМ НОВЫЙ
                const newMeal = await this.mealService.createMeal(dto.mealTitle, dto.userId, dto.foodPortionId, dto.mealTime, userMealDay.id, dto.mealTarget, dto.foodUnitId, dto.quantity)

                console.log('[ADD-FOODUNIT]: Прием пищи создан')
                if(!newMeal) throw new BadRequestException('Ошибка создания нового приема пищи')
            }
        }

        if(!userMealDay){
            console.log('[ADD-FOODUNIT]: MealDay отсутствует')
            //Meal Day отсутствует
            const newUserMealDay = await this.mealDayService.createMealDay(dto.mealDayDate, dto.userId)

            console.log('[ADD-FOODUNIT]: MealDay создан')
            if(!newUserMealDay) throw new BadRequestException('Ошибка создания нового дня приема пищи')

            //Отдельно создаем приём пищи, чтобы его потом привязать
            const newMeal = await this.mealService.createMeal(dto.mealTitle, dto.userId, dto.foodPortionId, dto.mealTime, newUserMealDay.id, dto.mealTarget, dto.foodUnitId, dto.quantity)

            console.log('[ADD-FOODUNIT]: Meal создан для нового MealDay')
            if(!newMeal) throw new BadRequestException('Ошибка создания нового приема пищи')
        }

        const resultMealDay = await this.prisma.mealDay.findFirst({
            where: {
                bodyId: dto.userId,
                date: dto.mealDayDate
            },
            include: {
                body: true,
                mealUnits: {
                    include: {
                        meal: {
                            include: {
                                mealFoodUnits: {
                                    include: {
                                        portion: true,
                                        foodUnit: {
                                            include: {
                                                nutrientSchema: true,
                                                foodCategories: true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })

        return {
            mealDay: resultMealDay
        }
    }

    async removeFoodUnitFromMeal(dto: RemoveFoodUnitFromMealDto) {
        const foodUnit = await this.prisma.foodUnit.findUnique({
            where: {
                id: dto.foodUnitId
            }
        })

        if(!foodUnit) throw new NotFoundException('Не найден продукт, который необходимо удалить')

        await this.prisma.mealFoodUnits.delete({
            where: {
                id: dto.mealFoodUnitsId,
                meal: {
                    mealUnit: {
                        some: {
                            mealDay: {
                                bodyId: dto.bodyId
                            }
                        }
                    }
                }
            }
        })

        const mealDay = await this.prisma.mealDay.findUnique({
            where: {
                id: dto.mealDayId
            },
            include: {
                body: true,
                mealUnits: {
                    include: {
                        meal: {
                            include: {
                                mealFoodUnits: {
                                    include: {
                                        portion: true,
                                        foodUnit: {
                                            include: {
                                                nutrientSchema: true,
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })

        //мя

        return {
            mealDay: mealDay
        }
    }

    async changeFavoriteFoodUnit(id: string, bodyId: string, likeId: string) {
        try {
            
            if(!likeId) {

                const candidate = await this.prisma.bodyFavoriteFoodUnits.findFirst({
                    where: {
                        bodyId: bodyId,
                        foodUnitId: id
                    }
                })

                if(candidate) throw new BadRequestException('Продукт уже добавлен в избранное');

                console.log('Подключить лайк')
                
                const newFavorite = await this.prisma.bodyFavoriteFoodUnits.create({
                    data: {
                        body: {
                            connect: {
                                id: bodyId
                            }
                        },
                        foodUnit: {
                            connect: {
                                id: id
                            }
                        },
                    }
                })

                return {
                    id: newFavorite.id
                }
            }
            if(likeId) {
                console.log('Отключить лайк')
                console.log(id)

                await this.prisma.bodyFavoriteFoodUnits.delete({
                    where: {
                        id: likeId,
                        bodyId: bodyId,
                        foodUnitId: id
                    }
                })

                return {
                    id: null
                }
            }
        } catch (e) {
            console.log(e)
            throw new BadRequestException('Ошибка изменения избранного продукта')
        }
    }
}
