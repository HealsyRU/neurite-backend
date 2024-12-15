/* eslint-disable prettier/prettier */

import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class AuthDto {
    
    @IsString({ message: 'Email должен являться строкой'})
    @IsEmail({}, { message: 'Вы ввели некорректный e-mail. Попробуйте снова'})
    readonly email: string

    @IsString({ message: 'Пароль должен являться строкой'})
    @MaxLength(32, { message: 'Максимальная длина пароля — 32 символа'})
    @MinLength(8, { message: 'Минимальная длина пароля — 8 символов'})
    readonly password: string

    readonly energy: number

    readonly sex: number

    readonly pal: string

    readonly birthDate: string

    readonly ccalNorm: number
}