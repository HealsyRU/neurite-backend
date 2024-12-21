"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodUnitModule = void 0;
const common_1 = require("@nestjs/common");
const food_unit_service_1 = require("./food-unit.service");
const food_unit_controller_1 = require("./food-unit.controller");
const prisma_service_1 = require("../prisma.service");
const meal_day_module_1 = require("../meal-day/meal-day.module");
const meal_module_1 = require("../meal/meal.module");
const meal_service_1 = require("../meal/meal.service");
const meal_day_service_1 = require("../meal-day/meal-day.service");
let FoodUnitModule = class FoodUnitModule {
};
exports.FoodUnitModule = FoodUnitModule;
exports.FoodUnitModule = FoodUnitModule = __decorate([
    (0, common_1.Module)({
        providers: [food_unit_service_1.FoodUnitService, prisma_service_1.PrismaService, meal_service_1.MealService, meal_day_service_1.MealDayService],
        controllers: [food_unit_controller_1.FoodUnitController],
        imports: [
            (0, common_1.forwardRef)(() => meal_day_module_1.MealDayModule),
            (0, common_1.forwardRef)(() => meal_module_1.MealModule)
        ]
    })
], FoodUnitModule);
//# sourceMappingURL=food-unit.module.js.map