import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { SetRoleDto } from './dto/set-role.dto';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleService);
    createRole(dto: CreateRoleDto): Promise<{
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
    setRoleToUSer(dto: SetRoleDto): Promise<void>;
}
