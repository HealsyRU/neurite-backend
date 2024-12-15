/* eslint-disable prettier/prettier */
import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { Body } from "@prisma/client"

export const CurrentBody = createParamDecorator(
	(data: keyof Body, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest()

		console.log('___REQUEST BODY_________')
		console.log(request.user.bodies[0])
		const body = request.user.bodies[0]

		return data ? body[data] : body
	}
)