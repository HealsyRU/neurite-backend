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
exports.FoodCategoryController = void 0;
const common_1 = require("@nestjs/common");
const food_category_service_1 = require("./food-category.service");
const create_food_category_dto_1 = require("./dto/create-food-category.dto");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
let FoodCategoryController = class FoodCategoryController {
    constructor(foodCategoryService) {
        this.foodCategoryService = foodCategoryService;
    }
    async createFoodCategory(dto) {
        return this.foodCategoryService.createFoodCategory(dto);
    }
    async getAllFoodCategories() {
        return this.foodCategoryService.getAllFoodCategories();
    }
};
exports.FoodCategoryController = FoodCategoryController;
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_food_category_dto_1.CreateFoodCategoryDto]),
    __metadata("design:returntype", Promise)
], FoodCategoryController.prototype, "createFoodCategory", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)('/getAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FoodCategoryController.prototype, "getAllFoodCategories", null);
exports.FoodCategoryController = FoodCategoryController = __decorate([
    (0, common_1.Controller)('foodCategory'),
    __metadata("design:paramtypes", [food_category_service_1.FoodCategoryService])
], FoodCategoryController);
//# sourceMappingURL=food-category.controller.js.map