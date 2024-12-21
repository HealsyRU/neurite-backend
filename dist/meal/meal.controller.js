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
exports.MealController = void 0;
const common_1 = require("@nestjs/common");
const meal_service_1 = require("./meal.service");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const body_decorator_1 = require("../auth/decorators/body.decorator");
let MealController = class MealController {
    constructor(mealService) {
        this.mealService = mealService;
    }
    async getMealUnitById(id, bodyId) {
        return this.mealService.getMealUnitById(id, bodyId);
    }
};
exports.MealController = MealController;
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)('/getMealUnitById/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, body_decorator_1.CurrentBody)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MealController.prototype, "getMealUnitById", null);
exports.MealController = MealController = __decorate([
    (0, common_1.Controller)('meal'),
    __metadata("design:paramtypes", [meal_service_1.MealService])
], MealController);
//# sourceMappingURL=meal.controller.js.map