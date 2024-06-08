import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Token } from './tokens.model';



@Injectable()
export class TokensService {

    constructor(@InjectModel(Token)
        private tokenRepository: typeof Token,
        private jwtService: JwtService) {

    }

    async generateTokens(user: User){

        const payload = { id: user.id, email: user.email, password: user.password, roles: user.roles }

        const accessToken = this.jwtService.sign(
            payload, 
            { secret: process.env.JWT_ACCESS_SECRET, expiresIn: '30m' }
        )

        const refreshToken = this.jwtService.sign(
            payload, 
            { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '30d' }
        )

        return {
            accessToken,
            refreshToken,
            user
        }
    }

    async removeToken(refreshToken: string) {
        console.log('removeToken: '+ refreshToken)
        const tokenData = await this.tokenRepository.findOne({where: {refreshToken}})
    
        console.log(Object(tokenData))
        tokenData.refreshToken = 'none'
        return tokenData.save()

    }

    async validateRefreshToken(refreshToken: string): Promise<User> {
        try{
            const userData = await this.jwtService.verify(refreshToken, { secret: process.env.JWT_REFRESH_SECRET, })
            return userData
        } catch(e) {
            throw new UnauthorizedException({message: 'Вероятно, JWT expired'})
        }
    }

    async findToken(refreshToken: string) {
        const tokenData = await this.tokenRepository.findOne({where: {refreshToken}, include: {all: true}})
        return tokenData
    }

    async saveToken(userId: number, refreshToken: string) {
        const tokenData = await this.tokenRepository.findOne({where: {userId}, include: {all: true}})

        if(tokenData){
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }

        const token = await this.tokenRepository.create({ userId: userId, refreshToken: refreshToken })

        return token
    }
}
