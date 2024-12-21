import { PrismaService } from 'src/prisma.service';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { RoleService } from 'src/role/role.service';
export declare class UserService {
    private prisma;
    private roleService;
    constructor(prisma: PrismaService, roleService: RoleService);
    getUserById(id: string): Promise<{
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
    getUserByEmail(email: string): Promise<{
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
    createUser(dto: AuthDto): Promise<{
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
