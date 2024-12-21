"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodUnitService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const meal_day_service_1 = require("../meal-day/meal-day.service");
const meal_service_1 = require("../meal/meal.service");
let FoodUnitService = class FoodUnitService {
    constructor(prisma, mealDayService, mealService) {
        this.prisma = prisma;
        this.mealDayService = mealDayService;
        this.mealService = mealService;
    }
    async getFoodUnitById(id) {
        try {
            console.log('Срабатывание поиска: ' + Date.now());
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
            });
            if (!foodUnit)
                throw new common_1.NotFoundException('Продукт не был найден');
            return {
                foodUnit: foodUnit
            };
        }
        catch {
            throw new common_1.NotFoundException('Ошибка при поиске продукта');
        }
    }
    async createFoodUnit(dto) {
        try {
            const checkAuthorBody = await this.prisma.body.findUnique({
                where: {
                    id: dto.userId
                }
            });
            if (!checkAuthorBody)
                throw new common_1.NotFoundException('Автор для продукта не найден');
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
            });
            return {
                foodUnit: foodUnit
            };
        }
        catch (e) {
            console.log(e);
        }
    }
    async getFoodUnitsByTitle(title, bodyId, isFavorite, limit) {
        const QueryOptions = () => {
            const isFavoriteOption = isFavorite === 'true' ? { BodyFavoriteFoodUnits: { some: { bodyId: bodyId } } } : {};
            const limitOption = limit ? { take: Number(limit) } : { take: 10 };
            return { isFavoriteOption, limitOption };
        };
        console.log(`Найдены продукты: лимит - ${limit}, любимые?-${isFavorite}`);
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
        });
        return {
            foodUnits: foodUnits
        };
    }
    async addFoodUnitToMeal(dto) {
        const foodUnit = await this.prisma.foodUnit.findUnique({
            where: {
                id: dto.foodUnitId
            }
        });
        if (!foodUnit)
            throw new common_1.NotFoundException('Не найден продукт, который необходимо добавить');
        console.log('[ADD-FOODUNIT]: Найден Food Unit');
        const userMealDay = await this.prisma.mealDay.findFirst({
            where: {
                bodyId: dto.userId,
                date: dto.mealDayDate
            },
            include: {
                mealUnits: true
            }
        });
        console.log('[ADD-FOODUNIT]: Произошел поиск MealDay');
        if (userMealDay) {
            console.log('[ADD-FOODUNIT]: MealDay найден');
            console.log('[ADD-FOODUNIT]: Начат поиск mealDayUnit c ID: ' + dto.mealDayUnitId);
            const mealDayUnit = await this.prisma.mealUnit.findUnique({
                where: {
                    id: dto.mealDayUnitId,
                }
            });
            console.log('[ADD-FOODUNIT]: Произошел поиск приема пищи');
            if (mealDayUnit) {
                console.log('[ADD-FOODUNIT]: Прием пищи найден');
                if (dto.quantity && !dto.foodPortionId) {
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
                    });
                    console.log('[ADD-FOODUNIT]: Связан MealUnit через Meal в режиме MULTIPLIER без указания FOOD PORTION, ' + mealDayUnit.mealId);
                    if (!mealUnit)
                        throw new common_1.NotFoundException('Не найден MealUnit');
                }
                else if (dto.foodPortionId) {
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
                    });
                    console.log('[ADD-FOODUNIT]: Связан MealUnit через Meal с найденной FoodPortion' + mealDayUnit.mealId);
                    if (!mealUnit)
                        throw new common_1.NotFoundException('Не найден MealUnit');
                }
            }
            if (!mealDayUnit) {
                console.log('[ADD-FOODUNIT]: Прием пищи не найден');
                const newMeal = await this.mealService.createMeal(dto.mealTitle, dto.userId, dto.foodPortionId, dto.mealTime, userMealDay.id, dto.mealTarget, dto.foodUnitId, dto.quantity);
                console.log('[ADD-FOODUNIT]: Прием пищи создан');
                if (!newMeal)
                    throw new common_1.BadRequestException('Ошибка создания нового приема пищи');
            }
        }
        if (!userMealDay) {
            console.log('[ADD-FOODUNIT]: MealDay отсутствует');
            const newUserMealDay = await this.mealDayService.createMealDay(dto.mealDayDate, dto.userId);
            console.log('[ADD-FOODUNIT]: MealDay создан');
            if (!newUserMealDay)
                throw new common_1.BadRequestException('Ошибка создания нового дня приема пищи');
            const newMeal = await this.mealService.createMeal(dto.mealTitle, dto.userId, dto.foodPortionId, dto.mealTime, newUserMealDay.id, dto.mealTarget, dto.foodUnitId, dto.quantity);
            console.log('[ADD-FOODUNIT]: Meal создан для нового MealDay');
            if (!newMeal)
                throw new common_1.BadRequestException('Ошибка создания нового приема пищи');
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
        });
        return {
            mealDay: resultMealDay
        };
    }
    async removeFoodUnitFromMeal(dto) {
        const foodUnit = await this.prisma.foodUnit.findUnique({
            where: {
                id: dto.foodUnitId
            }
        });
        if (!foodUnit)
            throw new common_1.NotFoundException('Не найден продукт, который необходимо удалить');
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
        });
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
        });
        return {
            mealDay: mealDay
        };
    }
    async changeFavoriteFoodUnit(id, bodyId, likeId) {
        try {
            if (!likeId) {
                const candidate = await this.prisma.bodyFavoriteFoodUnits.findFirst({
                    where: {
                        bodyId: bodyId,
                        foodUnitId: id
                    }
                });
                if (candidate)
                    throw new common_1.BadRequestException('Продукт уже добавлен в избранное');
                console.log('Подключить лайк');
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
                });
                return {
                    id: newFavorite.id
                };
            }
            if (likeId) {
                console.log('Отключить лайк');
                console.log(id);
                await this.prisma.bodyFavoriteFoodUnits.delete({
                    where: {
                        id: likeId,
                        bodyId: bodyId,
                        foodUnitId: id
                    }
                });
                return {
                    id: null
                };
            }
        }
        catch (e) {
            console.log(e);
            throw new common_1.BadRequestException('Ошибка изменения избранного продукта');
        }
    }
};
exports.FoodUnitService = FoodUnitService;
exports.FoodUnitService = FoodUnitService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        meal_day_service_1.MealDayService,
        meal_service_1.MealService])
], FoodUnitService);
//# sourceMappingURL=food-unit.service.js.map