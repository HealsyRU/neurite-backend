/* eslint-disable prettier/prettier */
import { IsBooleanString, IsIn, IsNumberString, IsString } from "class-validator"

export class SearchFoodUnitDto {
    @IsString({ message: 'Название категории не является строкой'})
    title: string = ''

    @IsNumberString({ no_symbols: true } , { message: 'Значение лимита не является числом'})
    @IsIn(['10', '20', '30'], { message: 'Значение лимита неверное'})
    limit: string = '10'

    @IsBooleanString({ message: 'Название категории не является булевой строкой'})
    isFavorite: string = 'false'
}