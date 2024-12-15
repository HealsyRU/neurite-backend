/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import { UserService } from 'src/account/account.service';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';
import { Response } from 'express';

@Injectable()
export class AuthService {

    EXPIRE_DAY_REFRESH_TOKEN = 7
	REFRESH_TOKEN_NAME = 'refreshToken'

	constructor(
		private jwt: JwtService,
		private userService: UserService
	) {}

	async login(dto: AuthDto) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...user } = await this.validateUser(dto)
		const tokens = this.issueTokens(user.id)

		return {
			user,
			...tokens
		}
	}

	async register(dto: AuthDto) {
		const oldUser = await this.userService.getUserByEmail(dto.email)

		if (oldUser) throw new BadRequestException('Аккаунт уже зарегистрирован!')

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...user } = await this.userService.createUser(dto)

		const tokens = this.issueTokens(user.id)

		return {
			user,
			...tokens
		}
	}

	async getNewTokens(refreshToken: string) {
		const result = await this.jwt.verifyAsync(refreshToken)
		if (!result) throw new UnauthorizedException('Invalid refresh token')

		console.log(result.id)
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const user = await this.userService.getUserById(result.id)

		console.log(user)

		const tokens = this.issueTokens(user.id)

		return {
			user,
			...tokens
		}
	}

	private issueTokens(userId: string) {
        //ИЗБЕГАТЬ ПОПАДАНИЯ SENSITIVE DATA
		const data = { id: userId }

		const accessToken = this.jwt.sign(data, {
			expiresIn: '1h'
		})

		const refreshToken = this.jwt.sign(data, {
			expiresIn: '7d'
		})

		return { accessToken, refreshToken }
	}

	private async validateUser(dto: AuthDto) {
		const user = await this.userService.getUserByEmail(dto.email)

		if (!user) throw new UnauthorizedException('Неправильный e-mail или пароль')

		const isValid = await verify(user.password, dto.password)

		if (!isValid) throw new UnauthorizedException('Неправильный e-mail или пароль')

		return user
	}

	addRefreshTokenToResponse(res: Response, refreshToken: string) {
		const expiresIn = new Date()
		expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN)

		res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
			httpOnly: true,
			domain: '.vercel.app',
			secure: true,
			expires: expiresIn,
			// lax if production
			sameSite: 'none',
		})
	}

	removeRefreshTokenFromResponse(res: Response) {
		console.log('Вызов удаления рефреш')
		res.cookie(this.REFRESH_TOKEN_NAME, '', {
			httpOnly: true,
			secure: true,
			//'localhost'
			domain: '.vercel.app',
			expires: new Date(0),
			sameSite: 'none',
		})
	}

    
}
