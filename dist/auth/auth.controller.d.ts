/// <reference types="cookie-parser" />
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Request, Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(dto: AuthDto, res: Response): Promise<{
        accessToken: string;
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
    register(dto: AuthDto, res: Response): Promise<{
        accessToken: string;
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
    getNewTokens(req: Request, res: Response): Promise<{
        accessToken: string;
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
    logout(res: Response): Promise<boolean>;
}
