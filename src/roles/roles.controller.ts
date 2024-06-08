import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './roles.model';

@ApiTags('Роли аккаунтов')
@Controller('roles')
export class RolesController {

    constructor(private rolesService: RolesService) {}

    @ApiOperation({ summary: 'Создание новой роли'})
    @ApiResponse({ status: 200, type: Role})
    @Post('/createRole')
    createRole(@Body() dto: CreateRoleDto) {
        return this.rolesService.createRole(dto)
    }

    @ApiOperation({ summary: 'Получение роли по параметру VALUE'})
    @ApiResponse({ status: 200, type: Role})
    @Get('/:value')
    getRoleByValue(@Param('value') value: string) {
        return this.rolesService.getRoleByValue(value)

    }
}
