import { Module } from '@nestjs/common';
import { FoodCategoryService } from './food-category.service';
import { FoodCategoryController } from './food-category.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [FoodCategoryService, PrismaService],
  controllers: [FoodCategoryController],
})
export class FoodCategoryModule {}
