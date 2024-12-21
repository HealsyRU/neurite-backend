"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const account_module_1 = require("./account/account.module");
const auth_module_1 = require("./auth/auth.module");
const role_module_1 = require("./role/role.module");
const food_unit_module_1 = require("./food-unit/food-unit.module");
const food_category_module_1 = require("./food-category/food-category.module");
const meal_day_module_1 = require("./meal-day/meal-day.module");
const meal_module_1 = require("./meal/meal.module");
const portion_module_1 = require("./portion/portion.module");
const meal_food_unit_module_1 = require("./meal-food-unit/meal-food-unit.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.env'
            }),
            account_module_1.AccountModule,
            auth_module_1.AuthModule,
            role_module_1.RoleModule,
            food_unit_module_1.FoodUnitModule,
            food_category_module_1.FoodCategoryModule,
            meal_day_module_1.MealDayModule,
            meal_module_1.MealModule,
            portion_module_1.PortionModule,
            meal_food_unit_module_1.MealFoodUnitModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map