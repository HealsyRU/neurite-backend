/* eslint-disable prettier/prettier */
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator"

export class SetRoleDto {

    @IsString()
    @MinLength(3, { message: "Слишком маленькое название роли. Минимум — 3 символа."})
    @MaxLength(24, { message: "Слишком большое название роли. Максимум — 24 символа"})
    readonly value: string

    @IsString()
    @IsEmail({}, { message: 'Не является E-mail' })
    readonly email: string
}