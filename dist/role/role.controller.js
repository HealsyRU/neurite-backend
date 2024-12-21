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
exports.RoleController = void 0;
const common_1 = require("@nestjs/common");
const role_service_1 = require("./role.service");
const create_role_dto_1 = require("./dto/create-role.dto");
const set_role_dto_1 = require("./dto/set-role.dto");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
let RoleController = class RoleController {
    constructor(roleService) {
        this.roleService = roleService;
    }
    async createRole(dto) {
        return this.roleService.createRole(dto);
    }
    getRoleByValue(value) {
        return this.roleService.getRoleByValue(value);
    }
    getAllRoles() {
        return this.roleService.getAllRoles();
    }
    async setRoleToUSer(dto) {
        return this.roleService.setRoleToUser(dto.value, dto.email);
    }
};
exports.RoleController = RoleController;
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/create_role'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_role_dto_1.CreateRoleDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "createRole", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)('/:value'),
    __param(0, (0, common_1.Param)('value')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "getRoleByValue", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)('/admin/allRoles'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "getAllRoles", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/admin/setRole'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [set_role_dto_1.SetRoleDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "setRoleToUSer", null);
exports.RoleController = RoleController = __decorate([
    (0, common_1.Controller)('role'),
    __metadata("design:paramtypes", [role_service_1.RoleService])
], RoleController);
//# sourceMappingURL=role.controller.js.map