export declare class AddFoodUnitToMealDto {
    readonly userId: string;
    readonly mealDayDate: string;
    readonly mealDayUnitId: string;
    readonly foodPortionId: string | undefined;
    readonly foodUnitId: string;
    readonly mealTitle: string;
    readonly mealTime: string;
    readonly mealTarget: number;
    readonly quantity: number;
}
