/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RoleService {
    constructor( 
        private prisma: PrismaService
    ) {}

    async createRole(dto: CreateRoleDto) {

        const candidateRole = await this.prisma.role.findUnique({
            where: {
                value: dto.value
            }
        })

        if(candidateRole) throw new BadRequestException('Данная роль уже существует')

        const role = await this.prisma.role.create({
            data: dto
        })

        return role
    }

    async getRoleById(roleId: string) {
        const role = await this.prisma.role.findUnique({
            where: {
                id: roleId
            }
        })

        if(!role) throw new NotFoundException('Данная роль не найдена')

        return role
    }

    async getRoleByValue(value: string) {
        const role = await this.prisma.role.findUnique({
            where: {
                value: value
            }
        })

        if(!role) throw new NotFoundException('Данная роль не найдена')

        return role
    }

    async getAllRoles() {
        const roles = await this.prisma.role.findMany({})

        if(!roles) throw new NotFoundException('Роли не найдены')

        return {
            roles: roles
        }
    }

    async setRoleToUser(value: string, email: string) {
        
        const candidate = await this.prisma.user.findUnique({
            where: {
                email
            }
        })

        if(!candidate) throw new NotFoundException('Пользователь не найден')

        const role = await this.prisma.role.findUnique({
            where: {
                value
            }
        })

        if(!role) throw new NotFoundException('Роль не найдена')

        await this.prisma.user.update({
            where: {
                email
            },
            data: {
                roles: {
                    connect: {
                        value: value
                    }
                }
            }
        })
    }

    
}
