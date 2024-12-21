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
exports.MealFoodUnitService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let MealFoodUnitService = class MealFoodUnitService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findOne(id, userId, ccalNorm) {
        const mealFoodUnit = await this.prisma.mealFoodUnits.findUnique({
            where: {
                id: id,
                meal: {
                    mealUnit: {
                        some: {
                            mealDay: {
                                body: {
                                    user: {
                                        id: userId
                                    }
                                }
                            }
                        }
                    }
                }
            },
            include: {
                meal: {
                    select: {
                        mealUnit: {
                            select: {
                                mealDay: {
                                    select: {
                                        body: {
                                            select: {
                                                ccalNorm: true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                portion: {
                    select: {
                        id: true,
                        foodPortionCategory: {
                            select: {
                                title: true
                            }
                        },
                        measure: true,
                        quantity: true
                    }
                },
                foodUnit: {
                    select: {
                        title: true,
                        nutrientSchema: true,
                        foodCategories: true,
                        foodPortions: {
                            select: {
                                id: true,
                                foodPortionCategory: {
                                    select: {
                                        title: true
                                    }
                                },
                                measure: true,
                                quantity: true
                            }
                        }
                    }
                }
            }
        });
        return {
            mealFoodUnit: mealFoodUnit,
            ccalNorm: ccalNorm
        };
    }
    async updateFoodQuantity(dto, userId, ccalNorm) {
        console.log('Срабатывание запроса');
        if (dto.quantity && !dto.foodPortionId) {
            console.log('Есть количество, но не отправлена порция');
            const mealFoodUnit = await this.prisma.mealFoodUnits.update({
                where: {
                    id: dto.mealFoodUnitId,
                    meal: { mealUnit: { some: { mealDay: { body: { user: { id: userId } } } } } }
                },
                include: {
                    portion: {
                        select: {
                            foodPortionCategory: {
                                select: {
                                    title: true
                                }
                            },
                            measure: true,
                            quantity: true
                        }
                    },
                    foodUnit: {
                        select: {
                            title: true,
                            nutrientSchema: true,
                            foodCategories: true,
                            foodPortions: {
                                select: {
                                    id: true,
                                    foodPortionCategory: {
                                        select: {
                                            title: true
                                        }
                                    },
                                    measure: true,
                                    quantity: true
                                }
                            }
                        }
                    }
                },
                data: {
                    multiplier: dto.quantity,
                    portion: {
                        disconnect: true
                    },
                }
            });
            return {
                mealFoodUnit: mealFoodUnit,
                ccalNorm: ccalNorm
            };
        }
        if (dto.foodPortionId && dto.quantity) {
            console.log('Есть количество и отправлена порция');
            const mealFoodUnit = await this.prisma.mealFoodUnits.update({
                where: {
                    id: dto.mealFoodUnitId,
                    meal: { mealUnit: { some: { mealDay: { body: { user: { id: userId } } } } } }
                },
                include: {
                    portion: {
                        select: {
                            foodPortionCategory: {
                                select: {
                                    title: true
                                }
                            },
                            measure: true,
                            quantity: true
                        }
                    },
                    foodUnit: {
                        select: {
                            title: true,
                            nutrientSchema: true,
                            foodCategories: true,
                            foodPortions: {
                                select: {
                                    id: true,
                                    foodPortionCategory: {
                                        select: {
                                            title: true
                                        }
                                    },
                                    measure: true,
                                    quantity: true
                                }
                            }
                        }
                    }
                },
                data: {
                    multiplier: dto.quantity,
                    portion: {
                        connect: {
                            id: dto.foodPortionId
                        }
                    },
                }
            });
            return {
                mealFoodUnit: mealFoodUnit,
                ccalNorm: ccalNorm
            };
        }
    }
};
exports.MealFoodUnitService = MealFoodUnitService;
exports.MealFoodUnitService = MealFoodUnitService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MealFoodUnitService);
//# sourceMappingURL=meal-food-unit.service.js.map