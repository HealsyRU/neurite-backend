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
exports.MealDayService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let MealDayService = class MealDayService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createMealDay(mealDayDate, bodyId) {
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
        });
        return newMealDay;
    }
    async getMealDayDataByDate(date, bodyId) {
        console.log('ПОИСК ДНЯ');
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
        });
        return {
            mealDay: mealDay
        };
    }
};
exports.MealDayService = MealDayService;
exports.MealDayService = MealDayService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MealDayService);
//# sourceMappingURL=meal-day.service.js.map