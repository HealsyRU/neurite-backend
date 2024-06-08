import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { User } from "src/users/users.model";

export class AuthDTO {
    
    @ApiProperty({ description: 'Пользователь'})
    readonly user: User

    @ApiProperty({ example: 'aijsdiojuUI.GYUDuajskd.oi829Kjdkajs', description: 'Access-token'})
    @IsString({ message: 'Access-token должен быть строкой (STRING)'})
    readonly accessToken: string;

    @ApiProperty({ example: 'aijsdiojuUI.GYUDuajskd.oi829Kjdkajs', description: 'Refresh-token'})
    @IsString({ message: 'Refresh-token должен быть строкой (STRING)'})
    readonly refreshToken: string;
}