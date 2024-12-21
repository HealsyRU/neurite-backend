"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortionModule = void 0;
const common_1 = require("@nestjs/common");
const portion_service_1 = require("./portion.service");
const portion_controller_1 = require("./portion.controller");
const prisma_service_1 = require("../prisma.service");
let PortionModule = class PortionModule {
};
exports.PortionModule = PortionModule;
exports.PortionModule = PortionModule = __decorate([
    (0, common_1.Module)({
        providers: [portion_service_1.PortionService, prisma_service_1.PrismaService],
        controllers: [portion_controller_1.PortionController],
        exports: [
            portion_service_1.PortionService
        ]
    })
], PortionModule);
//# sourceMappingURL=portion.module.js.map