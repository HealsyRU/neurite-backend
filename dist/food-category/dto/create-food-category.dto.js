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
exports.CreateFoodCategoryDto = void 0;
const class_validator_1 = require("class-validator");
class CreateFoodCategoryDto {
}
exports.CreateFoodCategoryDto = CreateFoodCategoryDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Название категории не является строкой' }),
    (0, class_validator_1.MinLength)(2, { message: 'Название категории слишком маленькое' }),
    (0, class_validator_1.MaxLength)(32, { message: 'Название категории слишком большое' }),
    __metadata("design:type", String)
], CreateFoodCategoryDto.prototype, "title", void 0);
//# sourceMappingURL=create-food-category.dto.js.map