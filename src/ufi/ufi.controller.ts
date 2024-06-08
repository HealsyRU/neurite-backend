import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UfiService } from './ufi.service';
import { AuthDTO } from 'src/auth/dto/auth.dto';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { CreateUfiDTO } from './dto/create-ufi.dto';
import { Ufi } from './ufi.model';
import { RemoveUfiDTO } from 'src/meals/dto/remove-ufi.dto';

@ApiTags('UFI (Единица приема пищи)')
@Controller('ufi')
export class UfiController {
    constructor(private ufiService: UfiService) {}

    //@ApiResponse({ status: 200, type: AuthDTO})
    @ApiOperation({ summary: 'Создание нового UFI.'})
    @Post('/createUfi')
    async createUfi(
        @Body() ufiDTO: CreateUfiDTO
    ) {
        const ufiData = await this.ufiService.createUfi(ufiDTO)
        return ufiData;
    }

    @ApiOperation({ summary: 'Получение UFI по ID'})
    @ApiResponse({ status: 200, type: [Ufi]})
    @Get('/:id')
    getAllUsers(@Param('id') id: string) {
        return this.ufiService.getUfiById(Number(id))
    }

    @ApiOperation({ summary: 'Удаление Ufi из Meal'})
    @Post('/removeUfiFromMeal')
    async removeUfiFromMeal(
        @Body() removeUfiDTO: RemoveUfiDTO
    ) {
        const ufiData = await this.ufiService.removeUfiFromMeal(removeUfiDTO.ufiId, removeUfiDTO.mealId)
        
        return ufiData;
    }

    //@ApiOperation({ summary: 'Получение UFI по ID'})
    //@ApiResponse({ status: 200, type: [Ufi]})
    //@Get('/getAllUfiByMealDayId/:mealDayId')
    //getAllUfiByMealDayId(@Param('mealDayId') mealDayId: string) {
        //return this.ufiService.getAllUfiByMealDayId(Number(mealDayId))
    //}
}
