/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateFoodQuantityDto } from './dto/updateFoodQuantity.dto';

@Injectable()
export class MealFoodUnitService {

  constructor(
    private prisma: PrismaService,
  ){}
  async findOne(id: string, userId: string, ccalNorm: number) {

    const mealFoodUnit = await this.prisma.mealFoodUnits.findUnique({
      where: {
        id: id,
        meal: {
          mealUnit: {
            some: {
              mealDay: {
                body: {
                  user: {
                    id: userId
                  }
                }
              }
            }
          }
        }
      },
      include: {
        meal: {
          select: {
            mealUnit: {
              select: {
                mealDay: {
                  select: {
                    body: {
                      select: {
                        ccalNorm: true
                      }
                    }
                  }
                }
              }
            }
          }
        },
        portion: {
          select: {
            id: true,
            foodPortionCategory: {
              select: {
                title: true
              }
            },
            measure: true,
            quantity: true
          }
        },
        foodUnit: {
          select: {
            title: true,
            nutrientSchema: true,
            foodCategories: true,
            foodPortions: {
              select: {
                id: true,
                foodPortionCategory: {
                  select: {
                    title: true
                  }
                },
                measure: true,
                quantity: true
              }
            }
          }
        }
      }
    })

    return {
      mealFoodUnit: mealFoodUnit,
      ccalNorm: ccalNorm
    }
  }

  async updateFoodQuantity(dto: UpdateFoodQuantityDto, userId: string, ccalNorm: number) {

    //Прописать условия ошибок
    console.log('Срабатывание запроса')

    if(dto.quantity && !dto.foodPortionId) {
      console.log('Есть количество, но не отправлена порция')

      const mealFoodUnit = await this.prisma.mealFoodUnits.update({
        where: {
          id: dto.mealFoodUnitId,
          meal: { mealUnit: { some: { mealDay: { body: { user: { id: userId } } } } } }
        },
        include: {
          portion: {
            select: {
              foodPortionCategory: {
                select: {
                  title: true
                }
              },
              measure: true,
              quantity: true
            }
          },
          foodUnit: {
            select: {
              title: true,
              nutrientSchema: true,
              foodCategories: true,
              foodPortions: {
                select: {
                  id: true,
                  foodPortionCategory: {
                    select: {
                      title: true
                    }
                  },
                  measure: true,
                  quantity: true
                }
              }
            }
          }
        },
        data: {
          multiplier: dto.quantity,
          portion: {
            disconnect: true
          },
        }
      })

      return {
        mealFoodUnit: mealFoodUnit,
        ccalNorm: ccalNorm
      }
    }

    if(dto.foodPortionId && dto.quantity) {
      console.log('Есть количество и отправлена порция')
      const mealFoodUnit = await this.prisma.mealFoodUnits.update({
        where: {
          id: dto.mealFoodUnitId,
          meal: { mealUnit: { some: { mealDay: { body: { user: { id: userId } } } } } }
        },
        include: {
          portion: {
            select: {
              foodPortionCategory: {
                select: {
                  title: true
                }
              },
              measure: true,
              quantity: true
            }
          },
          foodUnit: {
            select: {
              title: true,
              nutrientSchema: true,
              foodCategories: true,
              foodPortions: {
                select: {
                  id: true,
                  foodPortionCategory: {
                    select: {
                      title: true
                    }
                  },
                  measure: true,
                  quantity: true
                }
              }
            }
          }
        },
        data: {
          multiplier: dto.quantity,
          portion: {
            connect: {
              id: dto.foodPortionId
            }
          },
        }
      })

      return {
        mealFoodUnit: mealFoodUnit,
        ccalNorm: ccalNorm
      }
    }
  }
}
