/* eslint-disable prettier/prettier */
export class CreateFoodUnitDto {

    //В FoodUnit
    readonly userId: string
    readonly title: string
    readonly isPublic: boolean
    readonly foodCategoryId: string

    readonly measure: 'g' | 'ml'
    readonly quantity: number
    readonly portionCategoryId: string
    
    //В NutrientSchema
    readonly barcode?: string
    readonly energy: number
    readonly protein: number
    readonly fat: number
    readonly carb: number
    
}