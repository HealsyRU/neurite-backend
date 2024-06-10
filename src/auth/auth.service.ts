import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { TokensService } from 'src/tokens/tokens.service';
import { AuthDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {

    constructor( 
        private userService: UsersService,
        private tokenService: TokensService
    ) {}

    async login(userDto: CreateUserDTO) {
        const user = await this.validateUser(userDto)
        const tokens = await this.tokenService.generateTokens(user)
        await this.tokenService.saveToken(user.id, tokens.refreshToken)

        const loginData: AuthDTO = {
            user: user,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken
        }

        return loginData

    }

    async registration(userDto: CreateUserDTO) {
        
        const candidate = await this.userService.getUserByEmail(userDto.email)
        console.log(candidate)
        if(candidate){
            throw new HttpException('Пользователь с таким email уже существует.', HttpStatus.BAD_REQUEST)
        }

        const hashPassword = await bcrypt.hash(userDto.password, 3)

        const user = await this.userService.createUser({
            email: userDto.email,
            password: hashPassword
        })

        const tokens = await this.tokenService.generateTokens(user)
        await this.tokenService.saveToken(user.id, tokens.refreshToken)

        const registerData: AuthDTO = {
            user: user,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken
        }

        return registerData

    }

    async logout(refreshToken: string) {
        try {
            const token = await this.tokenService.removeToken(refreshToken)

            return token

        } catch (e) {
            console.log(e)
            throw new UnauthorizedException({message: 'Ошибка логаута.'})

        }
    }

    async refresh(refreshToken: string) {
        console.log('[REFRESH/SERVICE. Вход в функцию]')
        if (!refreshToken) {
            throw new UnauthorizedException({message: 'Refresh token is required.'})
        }

        console.log('[REFRESH/SERVICE. Начало валидации]')
        const userData = await this.tokenService.validateRefreshToken(refreshToken)
        console.log('[REFRESH/SERVICE. Конец валидации]')
        console.log(userData.id)

        console.log('[REFRESH/SERVICE. Начало поиска в Базе токенов]')
        const tokenFromDb = await this.tokenService.findToken(refreshToken)

        console.log(tokenFromDb)
        if (!userData || !tokenFromDb) {
            console.log('[REFRESH/SERVICE. Ошибка, нет userData или tokenFromDb]')
            throw new UnauthorizedException({message: 'Error at validateRefreshToken or findToken.'})
        }

        console.log(Object(userData))
        console.log('Проверка 1')
        const user = await this.userService.getUserById(userData.id)

        console.log('Проверка 2')
        const tokens = await this.tokenService.generateTokens(user)

        console.log('Проверка 3')
        await this.tokenService.saveToken(user.id, tokens.refreshToken)

        const refreshData: AuthDTO = {
            refreshToken: tokens.refreshToken,
            accessToken: tokens.accessToken,
            user: user
        }

        return refreshData
    }

    private async validateUser(userDto: CreateUserDTO) {
        const user = await this.userService.getUserByEmail(userDto.email);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({message: 'Некорректный емайл или пароль.'})
    }
}
