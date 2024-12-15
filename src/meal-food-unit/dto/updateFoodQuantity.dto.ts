/* eslint-disable prettier/prettier */
export class UpdateFoodQuantityDto {
    readonly mealFoodUnitId: string
    readonly foodPortionId: string | null
    readonly quantity: number
}