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
exports.SearchFoodUnitDto = void 0;
const class_validator_1 = require("class-validator");
class SearchFoodUnitDto {
    constructor() {
        this.title = '';
        this.limit = '10';
        this.isFavorite = 'false';
    }
}
exports.SearchFoodUnitDto = SearchFoodUnitDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Название категории не является строкой' }),
    __metadata("design:type", String)
], SearchFoodUnitDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsNumberString)({ no_symbols: true }, { message: 'Значение лимита не является числом' }),
    (0, class_validator_1.IsIn)(['10', '20', '30'], { message: 'Значение лимита неверное' }),
    __metadata("design:type", String)
], SearchFoodUnitDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsBooleanString)({ message: 'Название категории не является булевой строкой' }),
    __metadata("design:type", String)
], SearchFoodUnitDto.prototype, "isFavorite", void 0);
//# sourceMappingURL=searchFoodUnit.dto.js.map