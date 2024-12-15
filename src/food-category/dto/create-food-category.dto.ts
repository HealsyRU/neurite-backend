/* eslint-disable prettier/prettier */
import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateFoodCategoryDto {

    @IsString({ message: 'Название категории не является строкой'})
    @MinLength(2, { message: 'Название категории слишком маленькое'})
    @MaxLength(32, { message: 'Название категории слишком большое'})
    readonly title: string
}