import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDTO {
    
    @ApiProperty({ example: 'example@email.ru', description: 'Основной почтовый ящик при регистрации'})
    @IsString({ message: 'Email должен быть строкой (STRING)'})
    @IsEmail({}, { message: 'Вы ввели некорректный e-mail. Попробуйте снова'})
    readonly email: string;

    //@Contains()
    @ApiProperty({ example: '123456', description: 'Пароль аккаунта'})
    @IsString({ message: 'Пароль должен быть строкой (STRING)'})
    @MaxLength(32, { message: 'Слишком длинный пароль. Максимум — 32 символа'})
    @MinLength(8, { message: 'Слишком малкнький пароль. Минимум — 8 символов'})
    readonly password: string;
}