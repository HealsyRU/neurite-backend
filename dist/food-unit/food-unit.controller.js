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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodUnitController = void 0;
const common_1 = require("@nestjs/common");
const food_unit_service_1 = require("./food-unit.service");
const create_food_unit_dto_1 = require("./dto/create-food-unit.dto");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const add_food_unit_to_meal_dto_1 = require("./dto/add-food-unit-to-meal.dto");
const remove_food_unit_from_meal_dto_1 = require("./dto/remove-food-unit-from-meal.dto");
const changeFavoriteFoodUnit_dto_1 = require("./dto/changeFavoriteFoodUnit.dto");
const body_decorator_1 = require("../auth/decorators/body.decorator");
let FoodUnitController = class FoodUnitController {
    constructor(foodUnitService) {
        this.foodUnitService = foodUnitService;
    }
    async createRole(dto) {
        return this.foodUnitService.createFoodUnit(dto);
    }
    getRoleByValue(title, limit, isFavorite, bodyId) {
        return this.foodUnitService.getFoodUnitsByTitle(title, bodyId, isFavorite, limit);
    }
    async addFoodUnitToMeal(dto) {
        return this.foodUnitService.addFoodUnitToMeal(dto);
    }
    async removeFoodUnitFromMeal(dto) {
        return this.foodUnitService.removeFoodUnitFromMeal(dto);
    }
    async getFoodUnitById(id) {
        return this.foodUnitService.getFoodUnitById(id);
    }
    async changeFavoriteFoodUnit(dto, bodyId) {
        return this.foodUnitService.changeFavoriteFoodUnit(dto.foodUnitId, bodyId, dto.likedId);
    }
};
exports.FoodUnitController = FoodUnitController;
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_food_unit_dto_1.CreateFoodUnitDto]),
    __metadata("design:returntype", Promise)
], FoodUnitController.prototype, "createRole", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)('/getFoodUnitsByTitle/:title'),
    __param(0, (0, common_1.Param)('title')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('isFavorite')),
    __param(3, (0, body_decorator_1.CurrentBody)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, String]),
    __metadata("design:returntype", void 0)
], FoodUnitController.prototype, "getRoleByValue", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/addFoodUnitToMeal'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_food_unit_to_meal_dto_1.AddFoodUnitToMealDto]),
    __metadata("design:returntype", Promise)
], FoodUnitController.prototype, "addFoodUnitToMeal", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/removeFoodUnitFromMeal'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [remove_food_unit_from_meal_dto_1.RemoveFoodUnitFromMealDto]),
    __metadata("design:returntype", Promise)
], FoodUnitController.prototype, "removeFoodUnitFromMeal", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)('/getFoodUnitById/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FoodUnitController.prototype, "getFoodUnitById", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/changeFavorite'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, body_decorator_1.CurrentBody)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [changeFavoriteFoodUnit_dto_1.ChangeFavoriteFoodUnitDto, String]),
    __metadata("design:returntype", Promise)
], FoodUnitController.prototype, "changeFavoriteFoodUnit", null);
exports.FoodUnitController = FoodUnitController = __decorate([
    (0, common_1.Controller)('foodUnit'),
    __metadata("design:paramtypes", [food_unit_service_1.FoodUnitService])
], FoodUnitController);
//# sourceMappingURL=food-unit.controller.js.map