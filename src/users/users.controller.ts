import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags('Аккаунты пользователей')
@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) { }

    @ApiOperation({ summary: 'Создание нового аккаунта.'})
    @ApiResponse({ status: 200, type: User})
    @UsePipes(ValidationPipe)
    @Post('/createUser')
    createUser(@Body() userDTO: CreateUserDTO) {
        return this.userService.createUser(userDTO)
    }

    @ApiOperation({ summary: 'Получение всех аккаунтов.'})
    @ApiResponse({ status: 200, type: [User]})
    @UseGuards(AuthGuard)
    @Get('/getAllUsers')
    getAllUsers() {
        return this.userService.getAllUsers()
    }
}
