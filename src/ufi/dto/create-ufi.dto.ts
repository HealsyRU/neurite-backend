import { MaxLength } from "class-validator"
import { MealDay } from "src/meal-days/meal-days.model"
import { Meal } from "src/meals/meals.model"

export class CreateUfiDTO {

    readonly authorId: number
 
    readonly type: number

    readonly isFree: boolean

    //creator: 1-пользователь, 2-система
    readonly creator: number

    readonly title: string

    readonly code: number

    readonly category: number

    readonly weight: number

    readonly ccal: number

    readonly protein: number

    readonly fat: number

    readonly carb: number

    readonly provider: string

    readonly cost: number

    readonly description: string

    //Каждая позиция - определенный микронутриент
    //Каждое значение массива - кол-во вещества в определенной единице измерения для этой позиции

    readonly favorite: boolean

    readonly time: string

    readonly mealId: string

    //readonly meal: Meal

    readonly mealDay: MealDay

    readonly date: string

    readonly mealType: string
}