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
exports.MealService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let MealService = class MealService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getMealUnitById(id, bodyId) {
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
            });
            return {
                mealUnit: mealUnit
            };
        }
        catch (e) {
            throw new common_1.BadRequestException('Ошибка поиска приема пищи');
        }
    }
    async createMeal(mealTitle, userId, foodPortionId, mealTime, mealDayId, mealTarget, foodUnitId, quantity) {
        if (quantity && !foodPortionId) {
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
            });
            return newMeal;
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
            });
            return newMeal;
        }
    }
};
exports.MealService = MealService;
exports.MealService = MealService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MealService);
//# sourceMappingURL=meal.service.js.map