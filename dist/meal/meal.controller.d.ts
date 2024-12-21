import { MealService } from './meal.service';
export declare class MealController {
    private readonly mealService;
    constructor(mealService: MealService);
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
}
