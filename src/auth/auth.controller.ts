import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { AuthDTO } from './dto/auth.dto';
import { Request, Response } from 'express';
import { Token } from 'src/tokens/tokens.model';



@ApiTags('Система авторизации')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @ApiOperation({ summary: 'Регистрация нового аккаунта.'})
    @ApiResponse({ status: 200, type: AuthDTO})
    @Post('/registration')
    async registration(
        @Body() userDTO: CreateUserDTO,
        @Res({ passthrough: true }) response: Response
    ) {
        const userData = await this.authService.registration(userDTO)

        response.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

        return userData;
    }

    @ApiOperation({ summary: 'Авторизация (логин) созданного аккаунта.'})
    @ApiResponse({ status: 200, type: AuthDTO})
    @Post('/login')
    async login(
        @Body() userDTO: CreateUserDTO,
        @Res({ passthrough: true }) response: Response
    ) {
        const userData = await this.authService.login(userDTO)

        response.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

        return userData;
    }

    @ApiOperation({ summary: 'Logout (выход) из созданного аккаунта.'})
    @ApiResponse({ status: 200, type: Token})
    @Post('/logout')
    async logout(
        @Res({ passthrough: true }) response: Response,
        @Req() request: Request
    ) {
        const { refreshToken } = request.cookies
        console.log('Проверка 1 ' + refreshToken)

        const token = await this.authService.logout(refreshToken)
        console.log('Проверка 2 ')

        response.clearCookie('refreshToken')

        return token;
    }

    @ApiOperation({ summary: 'Refresh token process.'})
    @ApiResponse({ status: 200, type: Token})
    @Get('/refresh')
    async refresh(
        @Res({ passthrough: true }) response: Response,
        @Req() request: Request
    ) {
        console.log('[/refresh. Начата работа]: controller /refresh')
        const { refreshToken } = request.cookies

        console.log('[/refresh. Cookie успешно подцеплена]: ' + refreshToken)

        console.log('[/refresh. Начат процесс refresh с токеном refreshToken]')
        const userData = await this.authService.refresh(refreshToken)
        console.log('[/refresh. Закончен процесс refresh, получена userData]')

        response.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        
        return userData;
    }


}
