import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TokenDto } from './dto/token.dto';
import { Public } from 'src/common/guards/auth/auth.guard';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('token')
	@Public()
	token(@Body() tokenDto: TokenDto) {
		return this.authService.token(tokenDto);
	}
}
