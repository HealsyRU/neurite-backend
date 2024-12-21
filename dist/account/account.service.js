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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const argon2_1 = require("argon2");
const role_service_1 = require("../role/role.service");
let UserService = class UserService {
    constructor(prisma, roleService) {
        this.prisma = prisma;
        this.roleService = roleService;
    }
    async getUserById(id) {
        return this.prisma.user.findUnique({
            where: {
                id
            },
            include: {
                bodies: {
                    include: {
                        mealSchema: true
                    }
                },
                roles: true,
            }
        });
    }
    async getUserByEmail(email) {
        return this.prisma.user.findUnique({
            where: {
                email
            },
            include: {
                bodies: {
                    include: {
                        mealSchema: true
                    }
                },
                roles: true
            }
        });
    }
    async createUser(dto) {
        console.log('Запрос прошел');
        return this.prisma.user.create({
            data: {
                email: dto.email,
                username: dto.email.split('@')[0].toString().toUpperCase(),
                password: await (0, argon2_1.hash)(dto.password),
                roles: {
                    connect: [{ value: 'USER' }]
                },
                bodies: {
                    create: {
                        pal: dto.pal,
                        sex: dto.sex,
                        ccalNorm: dto.ccalNorm,
                        birthDate: '23-20-2024',
                        bodyName: dto.email.split('@')[0].toString().toUpperCase(),
                        mealSchema: {
                            createMany: {
                                data: [
                                    {
                                        time: '8:30',
                                        title: 'Завтрак',
                                        energy: 1000,
                                        protein: 30,
                                        fat: 30,
                                        carb: 100,
                                    },
                                    {
                                        time: '13:00',
                                        title: 'Обед',
                                        energy: 1000,
                                        protein: 30,
                                        fat: 30,
                                        carb: 100,
                                    },
                                    {
                                        time: '18:00',
                                        title: 'Ужин',
                                        energy: 1000,
                                        protein: 30,
                                        fat: 30,
                                        carb: 100,
                                    },
                                ]
                            }
                        },
                    }
                },
            }
        });
    }
    async getUserProfile(id) {
        const userProfile = await this.getUserById(id);
        if (!userProfile)
            throw new common_1.NotFoundException('Аккаунт не был найден');
        const { password, ...rest } = userProfile;
        return {
            user: rest
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        role_service_1.RoleService])
], UserService);
//# sourceMappingURL=account.service.js.map