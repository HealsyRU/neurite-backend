/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { SetRoleDto } from './dto/set-role.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  //Добаить IsAdmin & IsDeveloper
  //@Auth()
    @UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('/create_role')
	async createRole(
		@Body() dto: CreateRoleDto,
	) {
		return this.roleService.createRole(dto)
	}

	@HttpCode(200)
	@Get('/:value')
    getRoleByValue(@Param('value') value: string) {
       return this.roleService.getRoleByValue(value)
    }

	@Auth()
	@HttpCode(200)
	@Get('/admin/allRoles')
	getAllRoles(){
		return this.roleService.getAllRoles()
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('/admin/setRole')
	async setRoleToUSer(
		@Body() dto: SetRoleDto,
	) {
		return this.roleService.setRoleToUser(dto.value, dto.email)
	}
}
