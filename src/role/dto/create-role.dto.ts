import { IsString, MaxLength, MinLength } from "class-validator"

export class CreateRoleDto {

    @IsString()
    @MinLength(3, { message: "Слшиком маленькое название роли. Минимум — 3 символа."})
    @MaxLength(24, { message: "Слишком большое название роли. Максимум — 24 символа"})
    readonly value: string

    @IsString()
    @MinLength(4, { message: "Слшиком маленькое описание роли. Минимум — 4 символа."})
    @MaxLength(256, { message: "Слишком большое описание роли. Максимум — 256 символов"})
    readonly description: string
}