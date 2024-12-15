/* eslint-disable prettier/prettier */
import {  Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { hash } from 'argon2';
import { RoleService } from 'src/role/role.service';
//import { UserService } from 'src/user/user.service';

@Injectable()
export class UserService {

    constructor( 
        private prisma: PrismaService,
        private roleService: RoleService,
        //private userService: UserService
    ) {}

    async getUserById(id: string) {
        return this.prisma.user.findUnique({
            where: {
                id
            },
            include: {
                bodies: {
                    include: {
                        mealSchema: true
                    }
                },
                roles: true,
            }
        })
    }

    async getUserByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: {
                email
            },
            include: {
                bodies: {
                    include: {
                        mealSchema: true
                    }
                },
                roles: true
            }
        })
    }

    async createUser(dto: AuthDto) {

        console.log('Запрос прошел')
        //const user = await this.userService.createUser()

		return this.prisma.user.create({
			data: {
                email: dto.email,
                username: dto.email.split('@')[0].toString().toUpperCase(),
                password: await hash(dto.password),
                roles: {
                    connect: [{ value: 'USER' }]
                },
                bodies: {
                    create: {
                        pal: dto.pal,
                        sex: dto.sex,
                        ccalNorm: dto.ccalNorm,
                        birthDate: '23-20-2024',
                        bodyName: dto.email.split('@')[0].toString().toUpperCase(),
                        mealSchema: {
                            createMany: {
                                data: [
                                    {
                                        time: '8:30',
                                        title: 'Завтрак',
                                        energy: 1000,
                                        protein: 30,
                                        fat: 30,
                                        carb: 100,
                                    },
                                    {
                                        time: '13:00',
                                        title: 'Обед',
                                        energy: 1000,
                                        protein: 30,
                                        fat: 30,
                                        carb: 100,
                                    },
                                    {
                                        time: '18:00',
                                        title: 'Ужин',
                                        energy: 1000,
                                        protein: 30,
                                        fat: 30,
                                        carb: 100,
                                    },
                                ]
                            }
                        },
                    }
                },
                
            }
		})
	}

    async getUserProfile(id: string) {
        const userProfile = await this.getUserById(id)

        if(!userProfile) throw new NotFoundException('Аккаунт не был найден')

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...rest } = userProfile

        return {
            user: rest
        }
    }
}
