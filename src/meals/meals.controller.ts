import { Body, Controller, Post } from '@nestjs/common';
import { MealsService } from './meals.service';
import { ApiOperation } from '@nestjs/swagger';
import { RemoveUfiDTO } from './dto/remove-ufi.dto';

@Controller('meals')
export class MealsController {
    constructor(private mealService: MealsService) {}

    //@ApiResponse({ status: 200, type: AuthDTO})
    

}
