import { UserService } from './account.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUserProfile(id: string): Promise<{
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
}
