/* eslint-disable prettier/prettier */

import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import { PortionService } from './portion.service';
import { CreatePortionCategoryDto } from './dto/create-portion.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('portion')
export class PortionController {
  constructor(private readonly portionService: PortionService) {}

  @Auth()
  @HttpCode(200)
  @Post('/category/create')
  create(@Body() createPortionDto: CreatePortionCategoryDto) {
    return this.portionService.createPortionCategory(createPortionDto);
  }

  @Auth()
  @HttpCode(200)
  @Get('/category/getAll')
  getAllPortionCategories() {
    return this.portionService.getAllPortionCategories();
  }
}
