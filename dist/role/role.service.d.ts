import { PrismaService } from 'src/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
export declare class RoleService {
    private prisma;
    constructor(prisma: PrismaService);
    createRole(dto: CreateRoleDto): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: string;
        value: string;
        description: string;
    }>;
    getRoleById(roleId: string): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: string;
        value: string;
        description: string;
    }>;
    getRoleByValue(value: string): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: string;
        value: string;
        description: string;
    }>;
    getAllRoles(): Promise<{
        roles: {
            createdAt: Date;
            updatedAt: Date;
            id: string;
            value: string;
            description: string;
        }[];
    }>;
    setRoleToUser(value: string, email: string): Promise<void>;
}
