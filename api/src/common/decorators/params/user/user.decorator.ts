import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { Request } from 'express';

export const User = createParamDecorator(
	(data: string, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest<Request>();
		const user = request.user;

		if (data && user) {
			return user[data as keyof UserModel];
		}
		return user;
	},
);
