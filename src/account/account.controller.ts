/* eslint-disable prettier/prettier */

import { Controller, Get } from '@nestjs/common';
import { UserService } from './account.service';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@ApiTags('Пользователи')
@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Get()
	@Auth()
	async getUserProfile(@CurrentUser('id') id: string) {
		return this.userService.getUserProfile(id)
	}

}
