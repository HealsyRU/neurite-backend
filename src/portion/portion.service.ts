/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { CreatePortionCategoryDto } from './dto/create-portion.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PortionService {
  constructor(
    private prisma: PrismaService,
  ){}

  async createPortionCategory(createPortionCategoryDto: CreatePortionCategoryDto) {
    const portionCategory = await this.prisma.foodPortionCategory.create({
      data: {
        title: createPortionCategoryDto.title,
        isSystem: true,
        authorId: createPortionCategoryDto.authorId,
      }
    })
    
    return {
      portionCategory
    }
  }

  async getAllPortionCategories(){
    const portionCategories = await this.prisma.foodPortionCategory.findMany()

    return {
        portionCategories
    }
  }
}
