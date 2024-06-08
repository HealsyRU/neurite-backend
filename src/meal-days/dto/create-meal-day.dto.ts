import { MaxLength } from "class-validator"

export class CreateMealDayDTO {

    //Дата дня приема пищи
    @MaxLength(256, { message: 'Слишком большая дата.'})
    readonly date: string

    readonly authorId: number

    readonly IsCompleted: boolean
}