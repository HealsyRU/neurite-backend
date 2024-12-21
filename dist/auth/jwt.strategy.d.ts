import { ConfigService } from "@nestjs/config";
import { Strategy } from 'passport-jwt';
import { UserService } from "src/account/account.service";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private accountService;
    constructor(configService: ConfigService, accountService: UserService);
    validate({ id }: {
        id: string;
    }): Promise<{
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
    }>;
}
export {};
