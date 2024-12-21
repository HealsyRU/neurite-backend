import { PrismaService } from 'src/prisma.service';
export declare class MealService {
    private prisma;
    constructor(prisma: PrismaService);
    getMealUnitById(id: string, bodyId: string): Promise<{
        mealUnit: {
            mealDay: {
                id: string;
                date: string;
            };
            meal: {
                mealFoodUnits: {
                    foodUnit: {
                        nutrientSchema: {
                            energy: number;
                            protein: number;
                            fat: number;
                            carb: number;
                        };
                        id: string;
                        title: string;
                    };
                    id: string;
                    foodUnitId: string;
                    multiplier: number;
                    portion: {
                        quantity: number;
                    };
                }[];
            };
            id: string;
            title: string;
            time: string;
            target: number;
        };
    }>;
    createMeal(mealTitle: string, userId: string, foodPortionId: string, mealTime: string, mealDayId: string, mealTarget: number, foodUnitId: string, quantity: number): Promise<{
        mealFoodUnits: {
            id: string;
            mealId: string;
            foodUnitId: string;
            portionId: string;
            multiplier: number;
            cost: number;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        authorId: string;
        isPublic: boolean;
    }>;
}
