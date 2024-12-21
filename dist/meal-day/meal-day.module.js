"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealDayModule = void 0;
const common_1 = require("@nestjs/common");
const meal_day_service_1 = require("./meal-day.service");
const meal_day_controller_1 = require("./meal-day.controller");
const prisma_service_1 = require("../prisma.service");
let MealDayModule = class MealDayModule {
};
exports.MealDayModule = MealDayModule;
exports.MealDayModule = MealDayModule = __decorate([
    (0, common_1.Module)({
        providers: [meal_day_service_1.MealDayService, prisma_service_1.PrismaService],
        controllers: [meal_day_controller_1.MealDayController],
        exports: [
            meal_day_service_1.MealDayService
        ]
    })
], MealDayModule);
//# sourceMappingURL=meal-day.module.js.map