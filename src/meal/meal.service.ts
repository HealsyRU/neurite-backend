/* eslint-disable prettier/prettier */

import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MealService {
    constructor(
        private prisma: PrismaService
    ){}


    async getMealUnitById(id: string, bodyId: string){
        try {
            const mealUnit = await this.prisma.mealUnit.findUnique({
                where: {
                    id: id,
                    mealDay: {
                        bodyId: bodyId
                    }
                },
                select: {
                    id: true,
                    time: true,
                    title: true,
                    target: true,
                    meal: {
                        select: {
                            mealFoodUnits: {
                                select: {
                                    foodUnitId: true,
                                    id: true,
                                    multiplier: true,
                                    portion: {
                                        select: {
                                            quantity: true,
                                        }
                                    },
                                    foodUnit: {
                                        select: {
                                            id: true,
                                            title: true,
                                            nutrientSchema: {
                                                select: {
                                                    energy: true,
                                                    protein: true,
                                                    fat: true,
                                                    carb: true,
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    mealDay: {
                        select: {
                            id: true,
                            date: true
                        }
                    }
                },
            })

            return {
                mealUnit: mealUnit
            }

        } catch (e) {
            throw new BadRequestException('Ошибка поиска приема пищи')
        }
    }

    async createMeal(
        mealTitle: string,
        userId: string,
        foodPortionId: string,
        mealTime: string,
        mealDayId: string,
        mealTarget: number,
        foodUnitId: string,
        quantity: number,
    ) {

        if(quantity && !foodPortionId) {
            const newMeal = await this.prisma.meal.create({
                data: {
                    authorId: userId,
                    mealFoodUnits: {
                        create: {
                            multiplier: quantity,
                            foodUnit: {
                                connect: {
                                    id: foodUnitId
                                }
                            }
                        }
                    },
                    mealUnit: {
                        create: {
                            time: mealTime,
                            title: mealTitle,
                            target: mealTarget,
                            mealDay: {
                                connect: {
                                    id: mealDayId
                                }
                            }
                        }
                    },
                },
                include: {
                    mealFoodUnits: true
                }
            })
    
            return newMeal

        } 
        if (foodPortionId && quantity) {
            const newMeal = await this.prisma.meal.create({
                data: {
                    authorId: userId,
                    mealFoodUnits: {
                        create: {
                            multiplier: quantity,
                            portion: {
                                connect: {
                                    id: foodPortionId
                                }
                            },
                            foodUnit: {
                                connect: {
                                    id: foodUnitId
                                }
                            }
                        }
                    },
                    mealUnit: {
                        create: {
                            time: mealTime,
                            title: mealTitle,
                            target: mealTarget,
                            mealDay: {
                                connect: {
                                    id: mealDayId
                                }
                            }
                        }
                    },
                },
                include: {
                    mealFoodUnits: true
                }
            })
    
            return newMeal
        }
    }
}
