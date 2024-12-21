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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const account_service_1 = require("../account/account.service");
const jwt_1 = require("@nestjs/jwt");
const argon2_1 = require("argon2");
let AuthService = class AuthService {
    constructor(jwt, userService) {
        this.jwt = jwt;
        this.userService = userService;
        this.EXPIRE_DAY_REFRESH_TOKEN = 7;
        this.REFRESH_TOKEN_NAME = 'refreshToken';
    }
    async login(dto) {
        const { password, ...user } = await this.validateUser(dto);
        const tokens = this.issueTokens(user.id);
        return {
            user,
            ...tokens
        };
    }
    async register(dto) {
        const oldUser = await this.userService.getUserByEmail(dto.email);
        if (oldUser)
            throw new common_1.BadRequestException('Аккаунт уже зарегистрирован!');
        const { password, ...user } = await this.userService.createUser(dto);
        const tokens = this.issueTokens(user.id);
        return {
            user,
            ...tokens
        };
    }
    async getNewTokens(refreshToken) {
        const result = await this.jwt.verifyAsync(refreshToken);
        if (!result)
            throw new common_1.UnauthorizedException('Invalid refresh token');
        console.log(result.id);
        const user = await this.userService.getUserById(result.id);
        console.log(user);
        const tokens = this.issueTokens(user.id);
        return {
            user,
            ...tokens
        };
    }
    issueTokens(userId) {
        const data = { id: userId };
        const accessToken = this.jwt.sign(data, {
            expiresIn: '1h'
        });
        const refreshToken = this.jwt.sign(data, {
            expiresIn: '7d'
        });
        return { accessToken, refreshToken };
    }
    async validateUser(dto) {
        const user = await this.userService.getUserByEmail(dto.email);
        if (!user)
            throw new common_1.UnauthorizedException('Неправильный e-mail или пароль');
        const isValid = await (0, argon2_1.verify)(user.password, dto.password);
        if (!isValid)
            throw new common_1.UnauthorizedException('Неправильный e-mail или пароль');
        return user;
    }
    addRefreshTokenToResponse(res, refreshToken) {
        const expiresIn = new Date();
        expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);
        res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
            httpOnly: true,
            domain: 'healsy.ru',
            secure: true,
            expires: expiresIn,
            sameSite: 'lax',
        });
    }
    removeRefreshTokenFromResponse(res) {
        console.log('Вызов удаления рефреш');
        res.cookie(this.REFRESH_TOKEN_NAME, '', {
            httpOnly: true,
            secure: true,
            domain: 'healsy.ru',
            expires: new Date(0),
            sameSite: 'lax',
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        account_service_1.UserService])
], AuthService);
//# sourceMappingURL=auth.service.js.map