import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDTO } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { ValidationException } from 'src/exceptions/validation.exception';
import * as uuid from 'uuid';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) 
        private userRepository: typeof User,
        private roleService: RolesService
    ) {}

    async createUser(dto: CreateUserDTO) {
        //Проверка на наличие пользователя с таким email.
        const candidate = await this.getUserByEmail(dto.email);
        if(candidate) {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)
        }

        const activationLink = uuid.v4()

        const user = await this.userRepository.create(
            { 
                email: dto.email, 
                password: dto.password,
                activationLink: activationLink,
                isActivated: false
            }
        );

        const role = await this.roleService.getRoleByValue('USER')
        //console.log(role.id)
        await user.$add('roles', [role.id])
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({ include: { all: true }});
        return users;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}});
        return user;
    }

    async getUserById(id: number) {
        const user = await this.userRepository.findOne({where: {id}, include: {all: true}});
        return user;
    }
}
