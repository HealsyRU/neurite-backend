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
exports.MealFoodUnitController = void 0;
const common_1 = require("@nestjs/common");
const meal_food_unit_service_1 = require("./meal-food-unit.service");
const user_decorator_1 = require("../auth/decorators/user.decorator");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const body_decorator_1 = require("../auth/decorators/body.decorator");
const updateFoodQuantity_dto_1 = require("./dto/updateFoodQuantity.dto");
let MealFoodUnitController = class MealFoodUnitController {
    constructor(mealFoodUnitService) {
        this.mealFoodUnitService = mealFoodUnitService;
    }
    findOne(userId, ccalNorm, id) {
        return this.mealFoodUnitService.findOne(id, userId, ccalNorm);
    }
    async updateFoodQuantity(dto, userId, ccalNorm) {
        return this.mealFoodUnitService.updateFoodQuantity(dto, userId, ccalNorm);
    }
};
exports.MealFoodUnitController = MealFoodUnitController;
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)('/:id'),
    __param(0, (0, user_decorator_1.CurrentUser)('id')),
    __param(1, (0, body_decorator_1.CurrentBody)('ccalNorm')),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", void 0)
], MealFoodUnitController.prototype, "findOne", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/updateFoodQuantity'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.CurrentUser)('id')),
    __param(2, (0, body_decorator_1.CurrentBody)('ccalNorm')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateFoodQuantity_dto_1.UpdateFoodQuantityDto, String, Number]),
    __metadata("design:returntype", Promise)
], MealFoodUnitController.prototype, "updateFoodQuantity", null);
exports.MealFoodUnitController = MealFoodUnitController = __decorate([
    (0, common_1.Controller)('mealFoodUnit'),
    __metadata("design:paramtypes", [meal_food_unit_service_1.MealFoodUnitService])
], MealFoodUnitController);
//# sourceMappingURL=meal-food-unit.controller.js.map