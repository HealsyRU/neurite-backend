import { UserService } from 'src/account/account.service';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
export declare class AuthService {
    private jwt;
    private userService;
    EXPIRE_DAY_REFRESH_TOKEN: number;
    REFRESH_TOKEN_NAME: string;
    constructor(jwt: JwtService, userService: UserService);
    login(dto: AuthDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            bodies: ({
                mealSchema: {
                    id: string;
                    createdAt: Date;
                    title: string;
                    time: string;
                    energy: number;
                    protein: number;
                    fat: number;
                    carb: number;
                    bodyId: string;
                }[];
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                bodyName: string;
                sex: number;
                birthDate: string;
                pal: string;
                ccalNorm: number;
                mainGoal: number;
                userId: string;
            })[];
            roles: {
                createdAt: Date;
                updatedAt: Date;
                id: string;
                value: string;
                description: string;
            }[];
            id: string;
            createdAt: Date;
            updatedAt: Date;
            username: string;
            email: string;
            level: number;
            isVerified: boolean;
            isOnboarded: boolean;
            isMainFilled: boolean;
            isConfirmed: boolean;
            activationLink: string;
        };
    }>;
    register(dto: AuthDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            username: string;
            email: string;
            level: number;
            isVerified: boolean;
            isOnboarded: boolean;
            isMainFilled: boolean;
            isConfirmed: boolean;
            activationLink: string;
        };
    }>;
    getNewTokens(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            bodies: ({
                mealSchema: {
                    id: string;
                    createdAt: Date;
                    title: string;
                    time: string;
                    energy: number;
                    protein: number;
                    fat: number;
                    carb: number;
                    bodyId: string;
                }[];
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                bodyName: string;
                sex: number;
                birthDate: string;
                pal: string;
                ccalNorm: number;
                mainGoal: number;
                userId: string;
            })[];
            roles: {
                createdAt: Date;
                updatedAt: Date;
                id: string;
                value: string;
                description: string;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            username: string;
            email: string;
            password: string;
            level: number;
            isVerified: boolean;
            isOnboarded: boolean;
            isMainFilled: boolean;
            isConfirmed: boolean;
            activationLink: string;
        };
    }>;
    private issueTokens;
    private validateUser;
    addRefreshTokenToResponse(res: Response, refreshToken: string): void;
    removeRefreshTokenFromResponse(res: Response): void;
}
