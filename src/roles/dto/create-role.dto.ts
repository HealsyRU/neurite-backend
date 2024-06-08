import { MaxLength, MinLength } from "class-validator"

export class CreateRoleDto {
    @MaxLength(20, { message: 'Слишком большое название роли. Максимум — 20 символов.'})
    @MinLength(3, { message: 'Слишком маленькое название роли. Минимум — 3 символа'})
    readonly value: string

    @MaxLength(100, { message: 'Слишком большое описание роли. Максимум — 100 символов.'})
    readonly description: string
}