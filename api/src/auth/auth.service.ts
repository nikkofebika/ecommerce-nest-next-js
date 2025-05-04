import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { TokenDto } from './dto/token.dto';

type TTokenReturn = {
	access_token: string;
	refresh_token: string;
};

type JwtPayload = {
	id: number;
	name: string;
	email: string;
	type: string;
};

@Injectable()
export class AuthService {
	constructor(
		private readonly configService: ConfigService,
		private readonly prismaService: PrismaService,
		private readonly jwtService: JwtService,
	) {}

	async token(tokenDto: TokenDto): Promise<TTokenReturn> {
		const user = await this.prismaService.user.findFirst({
			where: {
				email: tokenDto.email,
			},
		});

		if (user && (await bcrypt.compare(tokenDto.password, user.password))) {
			const { password: _unused, ...payload } = user;

			const [access_token, refresh_token] = await Promise.all([
				this.createJwtToken(payload),
				this.createJwtToken(payload, true),
			]);

			return {
				access_token,
				refresh_token,
			};
		}

		throw new UnauthorizedException();
	}

	async createJwtToken(
		payload: JwtPayload,
		isRefreshToken: boolean = false,
	): Promise<string> {
		if (isRefreshToken) {
			return this.jwtService.signAsync(payload, {
				secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
			});
		}

		return this.jwtService.signAsync(payload);
	}
}
