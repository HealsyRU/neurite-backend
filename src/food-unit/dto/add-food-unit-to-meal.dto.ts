/* eslint-disable prettier/prettier */

export class AddFoodUnitToMealDto {
    readonly userId: string
    readonly mealDayDate: string
    readonly mealDayUnitId: string
    readonly foodPortionId: string | undefined
    readonly foodUnitId: string
    readonly mealTitle: string
    readonly mealTime: string
    readonly mealTarget: number
    readonly quantity: number // МНОЖИТЕЛЬ ПОДКЛЮЧАЕМ В РАБОТУ, если мы не указали ID порции

    //Добавить функционал для создания порции если требуется новая
    //measure & quantity & portionCategory
    //readonly foodPortionCategoryTitle: string
}