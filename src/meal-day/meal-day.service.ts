/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MealDayService {
    constructor(
        private prisma: PrismaService
    ){}

    async createMealDay(
        mealDayDate: string,
        bodyId: string,
    ) {
        const newMealDay = await this.prisma.mealDay.create({
            data: {
                date: mealDayDate,
                body: {
                    connect: {
                        id: bodyId
                    }
                },
            },
            include: {
                mealUnits: true
            }
        })

        return newMealDay
    }
    async getMealDayDataByDate(date: string, bodyId: string) {
        console.log('ПОИСК ДНЯ')
        const mealDay = await this.prisma.mealDay.findFirst({
            where: {
                date: date,
                body: {
                    id: bodyId
                }
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
            mealDay: mealDay
        }
    }
}
